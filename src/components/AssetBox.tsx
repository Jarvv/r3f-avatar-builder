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
    <div className="rounded-t-lg bg-gradient-to-br from-black/50 to-indigo-900/30 backdrop-blur-sm drop-shadow-md p-6 gap-6 flex flex-col">
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
          {currentCategory.removable && (
            <button
              className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
              bg-gradient-to-tr ${
                !customisations[currentCategory.name]?.id
                  ? "border-white from-white/20 to-white/30"
                  : "from-black/70 to-black/20 border-black"
              }`}
              onClick={() => setAsset(currentCategory, null)}
            >
              <div className="w-full h-full flex items-center justify-center text-white bg-black/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </button>
          )}
          {currentCategory.assets.map((asset, index) => (
            <button
              key={index}
              className={`w-20 h-20  flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
                bg-gradient-to-tr
                ${
                  customisations[currentCategory.name]?.id === asset.id
                    ? "border-white from-white/20 to-white/30"
                    : "from-black/70 to-black/20 border-black"
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
