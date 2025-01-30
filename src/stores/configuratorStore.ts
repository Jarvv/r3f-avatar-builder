import { create } from "zustand";
import PocketBase from "pocketbase";
import {
  AssetsRecord,
  CategoriesRecord,
  TypedPocketBase,
} from "../pocketbase-types";

const pb = new PocketBase(
  import.meta.env.VITE_POCKETBASE_URL
) as TypedPocketBase;

export interface ConfiguratorState {
  categories: CategoryWithAssets[];
  currentCategory: CategoryWithAssets | null;
  assets: AssetsRecord[];
  customisations: Record<string, AssetsRecord>;
  download: () => Promise<void>;
  setDownload: (download: () => Promise<void>) => void;
  fetchCategories: () => void;
  setCurrentCategory: (category: CategoryWithAssets) => void;
  setAsset: (category: CategoryWithAssets, asset: AssetsRecord) => void;
}

export type CategoryWithAssets = CategoriesRecord & { assets: AssetsRecord[] };

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  categories: [],
  currentCategory: null,
  assets: [],
  customisations: {},
  download: async () => {},
  setDownload: (download) => set({ download }),
  fetchCategories: async () => {
    const categories = await pb.collection("Categories").getFullList({
      sort: "+position",
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
}));
