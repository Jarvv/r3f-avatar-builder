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
  fetchCategories: async () => {
    const categories = await pb.collection("Categories").getFullList({
      sort: "+position",
    });
    const assets = await pb.collection("Assets").getFullList({
      sort: "-created",
    });

    const customisations: Record<string, AssetsRecord> = {};

    const categoriesWithAssets = categories.map((category) => {
      const categoryAssets = assets.filter(
        (asset) => asset.collectionId === category.id
      );

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
