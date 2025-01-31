import { useEffect } from "react";
import { Group, Mesh, MeshBasicMaterial, Object3DEventMap } from "three";

export const useAssetColor = (
  scene: Group<Object3DEventMap>,
  assetColor: string | undefined
) => {
  useEffect(() => {
    if (!assetColor) return;

    scene.traverse((child) => {
      const node = child as Mesh;

      if (node.isMesh) {
        const material = node.material as MeshBasicMaterial;
        if (material?.name.includes("Color_")) {
          material.color.set(assetColor);
        }
      }
    });
  }, [scene, assetColor]);
};
