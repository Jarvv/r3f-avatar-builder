import { useAssetColor } from "@/services/Asset";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { BufferGeometry, Material, Mesh, Skeleton } from "three";

type AssetProps = {
  url: string;
  skeleton: Skeleton;
  categoryName: string;
};

type MeshItems = {
  geometry: BufferGeometry;
  material: Material;
  morphTargetInfluences: number[] | undefined;
};

export const Asset = (asset: AssetProps) => {
  const { scene } = useGLTF(asset.url);
  const customisations = useConfiguratorStore((state) => state.customisations);
  const assetColor = customisations[asset.categoryName]?.color;
  const skin = useConfiguratorStore((state) => state.skin);

  useAssetColor(scene, assetColor);

  const meshItems = useMemo(() => {
    const items: MeshItems[] = [];
    scene.traverse((child) => {
      const node = child as Mesh;

      if (node.isMesh) {
        const material = node.material as Material;

        items.push({
          geometry: node.geometry,
          material: material.name.includes("Skin_") ? skin : material,
          morphTargetInfluences: node.morphTargetInfluences,
        });
      }
    });

    return items;
  }, [scene, skin]);

  return meshItems.map((item, index) => (
    <skinnedMesh
      key={index}
      skeleton={asset.skeleton}
      geometry={item.geometry}
      material={item.material}
      morphTargetInfluences={item.morphTargetInfluences}
      castShadow
      receiveShadow
    />
  ));
};
