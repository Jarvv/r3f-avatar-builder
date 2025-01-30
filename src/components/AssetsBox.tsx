import { useCategories } from "@/hooks/useCategories";
import { TypedPocketBase } from "@/pocketbase-types";
import PocketBase from "pocketbase";
import { useConfiguratorStore } from "@/stores/configuratorStore";

const pb = new PocketBase(
  import.meta.env.VITE_POCKETBASE_URL
) as TypedPocketBase;

export const AssetBox = () => {
  useCategories();

  const {
    categories,
    currentCategory,
    setCurrentCategory,
    setAsset,
    customisations,
  } = useConfiguratorStore();

  return (
    <div className="rounded-2xl bg-white drop-shadow-md p-6 gap-6 flex flex-col">
      <div className="flex items-center gap-6 pointer-events-auto justify-evenly">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`transition-colors duration-200 font-medium ${
              currentCategory?.name === category.name
                ? "text-indigo-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {currentCategory && (
        <div className="flex gap-2 flex-wrap">
          {currentCategory.assets.map((asset, index) => (
            <button
              key={index}
              className={`w-20 h-20 rounded-md overflow-hidden bg-gray-200 pointer-events-auto hover:opacity-100 transition-none border-2 duration-500 ${
                customisations[currentCategory.name]?.id === asset.id
                  ? "border-indigo-500 opacity-100"
                  : "border-transparent opacity-80"
              }`}
              onClick={() => setAsset(currentCategory, asset)}
            >
              <img src={pb.files.getURL(asset, asset.thumbnail)} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
