import { AssetBox } from "@/components/AssetsBox";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ColorPicker";

export const UI = () => {
  const download = useConfiguratorStore((state) => state.download);
  const currentCategory = useConfiguratorStore(
    (state) => state.currentCategory
  );
  const customisations = useConfiguratorStore((state) => state.customisations);
  const loading = useConfiguratorStore((state) => state.loading);

  return (
    <main className="pointer-events-none fixed z-10 inset-0 p-10 select-none">
      <div
        className={`absolute inset-0 bg-black z-10 pointer-events-none flex items-center justify-center transition-opacity duration-1000 ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="animate-pulsetext-white">Loading...</p>
      </div>
      <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
        <div>
          <Button onClick={download}>Download</Button>
        </div>
        <div className="px-10 flex flex-col">
          {currentCategory?.colorPalette &&
            customisations[currentCategory.name] && <ColorPicker />}
          <AssetBox />
        </div>
      </div>
    </main>
  );
};
