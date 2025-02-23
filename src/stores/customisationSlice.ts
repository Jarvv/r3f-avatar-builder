import { StateCreator } from "zustand";
import PocketBase from "pocketbase";
import {
  AssetsRecord,
  CameraPlacementsRecord,
  CategoriesRecord,
  ColorPalettesRecord,
  TypedPocketBase,
} from "@/pocketbase-types";
import { AvatarSlice } from "./avatarSlice";

const pb = new PocketBase(
  import.meta.env.VITE_POCKETBASE_URL
) as TypedPocketBase;

export type CategoryWithAssets = CategoriesRecord & {
  assets: AssetWithColor[];
} & {
  expand?: {
    colorPalette?: ColorPalettesRecord;
    cameraPlacement?: CameraPlacementsRecord;
  };
};

export type AssetWithColor = AssetsRecord & { color?: string };

export interface CustomisationSlice {
  categories: CategoryWithAssets[];
  currentCategory: CategoryWithAssets | null;
  assets: AssetWithColor[];
  customisations: Record<string, AssetWithColor>;
  loading: boolean;
  screenshot: () => void;
  setScreenshot: (screenshot: () => void) => void;
  download: () => Promise<void>;
  setDownload: (download: () => Promise<void>) => void;
  fetchCategories: () => void;
  setCurrentCategory: (category: CategoryWithAssets) => void;
  setAsset: (
    category: CategoryWithAssets,
    asset: AssetWithColor | null
  ) => void;
  updateColor: (color: string) => void;
}

export const createCustomisationSlice: StateCreator<
  CustomisationSlice & AvatarSlice,
  [],
  [],
  CustomisationSlice
> = (set, get) => ({
  categories: [],
  currentCategory: null,
  assets: [],
  customisations: {},
  loading: true,
  screenshot: () => {},
  setScreenshot: (screenshot) => set({ screenshot }),
  download: async () => {},
  setDownload: (download) => set({ download }),
  fetchCategories: async () => {
    const categories = await pb.collection("Categories").getFullList({
      sort: "+position",
      expand: "colorPalette,cameraPlacement",
    });
    const assets = await pb.collection("Assets").getFullList({
      sort: "-created",
    });

    const customisations: Record<string, AssetWithColor> = {};

    const categoriesWithAssets = categories.map((category) => {
      const categoryAssets = assets.filter(
        (asset) => asset.category === category.id
      );

      const defaultAsset = category.defaultAsset
        ? categoryAssets.find((asset) => asset.id === category.defaultAsset)
        : null;

      if (defaultAsset) {
        customisations[category.name] = {
          ...defaultAsset,
          color: category.expand?.colorPalette?.colors?.[0],
        };
      } else {
        customisations[category.name] = {
          color: category.expand?.colorPalette?.colors?.[0],
        } as AssetWithColor;
      }

      return { ...category, assets: categoryAssets };
    });

    set({
      categories: categoriesWithAssets,
      assets,
      currentCategory: categoriesWithAssets[0],
      customisations,
      loading: false,
    });
  },
  setCurrentCategory: (category: CategoryWithAssets) =>
    set({ currentCategory: category }),
  setAsset: (category: CategoryWithAssets, asset: AssetsRecord | null) =>
    set((state) => {
      const updatedCustomisations = { ...state.customisations };

      if (asset === null) {
        updatedCustomisations[category.name] = {
          color: updatedCustomisations[category.name]?.color,
        } as AssetWithColor;
      } else {
        updatedCustomisations[category.name] = {
          ...asset,
          color: updatedCustomisations[category.name]?.color || "",
        };
      }

      return { customisations: updatedCustomisations };
    }),
  updateColor: (color: string) => {
    set((state) => ({
      customisations: {
        ...state.customisations,
        [state.currentCategory!.name]: {
          ...state.customisations[state.currentCategory!.name],
          color,
        },
      },
    }));

    if (get().currentCategory?.name === "Head") {
      get().updateSkin(color);
    }
  },
});
