import { AssetBox } from "@/components/AssetsBox";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { Button } from "./ui/button";

export const UI = () => {
  const download = useConfiguratorStore((state) => state.download);
  return (
    <main className="pointer-events-none fixed z-10 inset-0 p-10">
      <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
        <div>
          <Button onClick={download}>Download</Button>
        </div>
        <AssetBox />
      </div>
    </main>
  );
};
