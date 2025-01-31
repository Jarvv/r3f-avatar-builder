import { StateCreator } from "zustand";
import PocketBase from "pocketbase";
import {
  AssetsRecord,
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
} & { expand?: { colorPalette: ColorPalettesRecord } };

export type AssetWithColor = AssetsRecord & { color?: string };

export interface CustomisationSlice {
  categories: CategoryWithAssets[];
  currentCategory: CategoryWithAssets | null;
  assets: AssetWithColor[];
  customisations: Record<string, AssetWithColor>;
  download: () => Promise<void>;
  setDownload: (download: () => Promise<void>) => void;
  fetchCategories: () => void;
  setCurrentCategory: (category: CategoryWithAssets) => void;
  setAsset: (category: CategoryWithAssets, asset: AssetWithColor) => void;
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
  download: async () => {},
  setDownload: (download) => set({ download }),
  fetchCategories: async () => {
    const categories = await pb.collection("Categories").getFullList({
      sort: "+position",
      expand: "colorPalette",
    });
    const assets = await pb.collection("Assets").getFullList({
      sort: "-created",
    });

    let customisations: Record<string, AssetsRecord> = {};

    const categoriesWithAssets = categories.map((category) => {
      const categoryAssets = assets.filter(
        (asset) => asset.category === category.id
      );

      if (category.defaultAsset) {
        customisations = {
          ...customisations,
          [category.name]: categoryAssets.find(
            (asset) => asset.id === category.defaultAsset
          ) as AssetsRecord,
        };
      }

      return { ...category, assets: categoryAssets };
    });

    set({
      categories: categoriesWithAssets,
      assets,
      currentCategory: categoriesWithAssets[0],
      customisations,
    });
  },
  setCurrentCategory: (category: CategoryWithAssets) =>
    set({ currentCategory: category }),
  setAsset: (category: CategoryWithAssets, asset: AssetsRecord) =>
    set((state) => ({
      customisations: {
        ...state.customisations,
        [category.name]: asset,
      },
    })),
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
