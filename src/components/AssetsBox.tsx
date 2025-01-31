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
    <div className="rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20 backdrop-blur-sm drop-shadow-md p-6 gap-6 flex flex-col">
      <div className="flex items-center gap-6 pb-2 px-6 pointer-events-auto overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`transition-colors duration-200 font-medium flex-shrink-0 border-b ${
              currentCategory?.name === category.name
                ? "text-white shadow-purple-100 border-b-white"
                : "text-gray-400 hover:text-gray-500 border-b-transparent"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {currentCategory && (
        <div className="flex gap-2 flex-wrap px-6">
          {currentCategory.assets.map((asset, index) => (
            <button
              key={index}
              className={`w-20 h-20 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-none border-2 duration-300 ${
                customisations[currentCategory.name]?.id === asset.id
                  ? "border-white opacity-100"
                  : "border-transparent opacity-80"
              }`}
              onClick={() => setAsset(currentCategory, asset)}
            >
              <img
                className="object-cover w-full h-full"
                src={pb.files.getURL(asset, asset.thumbnail)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
