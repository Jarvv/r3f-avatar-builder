import { AssetBox } from "./AssetsBox";

export const UI = () => {
  return (
    <main className="pointer-events-none fixed z-10 inset-0 p-10">
      <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
        <AssetBox />
      </div>
    </main>
  );
};
