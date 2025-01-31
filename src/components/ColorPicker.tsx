import { useConfiguratorStore } from "@/stores/configuratorStore";
import { Button } from "./ui/button";

export const ColorPicker = () => {
  const customisations = useConfiguratorStore((state) => state.customisations);
  const updateColor = useConfiguratorStore((state) => state.updateColor);
  const currentCategory = useConfiguratorStore(
    (state) => state.currentCategory
  );

  const handleColorChange = (color: string) => {
    updateColor(color);
  };

  if (!customisations[currentCategory!.name]?.id) {
    return null;
  }

  return (
    <div className="pointer-events-auto relative flex gap-2 max-w-full overflow-x-auto backdrop-blur0sm py-2 drop-shadow-md no-scrollbar">
      {(currentCategory?.expand?.colorPalette?.colors as string[])?.map(
        (color, index) => (
          <Button
            key={index}
            variant={"ghost"}
            size={"icon"}
            onClick={() => handleColorChange(color)}
            className={`border ${
              customisations[currentCategory!.name]?.color === color
                ? "border-white"
                : "border-transparent"
            }`}
          >
            <div
              className="w-full h-full rounded-md"
              style={{ backgroundColor: color }}
            />
          </Button>
        )
      )}
    </div>
  );
};
