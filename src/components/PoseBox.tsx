import { useConfiguratorStore } from "@/stores/configuratorStore";
import { Button } from "./ui/button";

export const PoseBox = () => {
  const currentPose = useConfiguratorStore((state) => state.pose);
  const poses = useConfiguratorStore((state) => state.poses);
  const setPose = useConfiguratorStore((state) => state.setPose);

  return (
    <div className="flex flex-col gap-2">
      {poses.map((pose, index) => {
        return (
          <Button
            variant={index !== 0 ? "secondary" : "secondary"}
            className={`border ${index === 0 && "mb-2 bg-indigo-600"} ${
              currentPose === pose ? "border-white" : "border-transparent"
            }`}
            size={"sm"}
            key={index}
            onClick={() => setPose(pose)}
          >
            {pose}
          </Button>
        );
      })}
    </div>
  );
};
