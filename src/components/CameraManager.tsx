import { CAMERA } from "@/const";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const CameraManager = () => {
  const controls = useRef<CameraControls>(null);
  const currentCategory = useConfiguratorStore(
    (state) => state.currentCategory
  );

  useEffect(() => {
    console.log(currentCategory);
    if (!controls.current) return;

    if (currentCategory?.expand?.cameraPlacement) {
      controls.current.setLookAt(
        ...currentCategory.expand.cameraPlacement.position!,
        ...currentCategory.expand.cameraPlacement.target!,
        true
      );
    } else {
      controls.current.setLookAt(...CAMERA.POSITION, ...CAMERA.TARGET, true);
    }
  }, [currentCategory]);

  return (
    <CameraControls
      ref={controls}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      minDistance={2}
      maxDistance={8}
    />
  );
};
