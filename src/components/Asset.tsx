import { useGLTF } from "@react-three/drei";
import { FC, useMemo } from "react";
import { BufferGeometry, Material, Mesh, Skeleton } from "three";

type AssetProps = {
  url: string;
  skeleton: Skeleton;
};

type MeshItems = {
  geometry: BufferGeometry;
  material: Material;
  morphTargetInfluences: number[] | undefined;
};

export const Asset: FC<AssetProps> = (asset) => {
  const { scene } = useGLTF(asset.url);

  const meshItems = useMemo(() => {
    const items: MeshItems[] = [];
    scene.traverse((child) => {
      const node = child as Mesh;

      if (node.isMesh) {
        items.push({
          geometry: node.geometry,
          material: node.material as Material,
          morphTargetInfluences: node.morphTargetInfluences,
        });
      }
    });

    return items;
  }, [scene]);

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
