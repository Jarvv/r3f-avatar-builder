import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import PocketBase from "pocketbase";
import { useConfiguratorStore } from "@/stores/configuratorStore";
import { Asset } from "./Asset";
import { TypedPocketBase } from "@/pocketbase-types";
import { Group, Object3DEventMap, SkinnedMesh } from "three";
import { download } from "@/services/Download";

const pb = new PocketBase(
  import.meta.env.VITE_POCKETBASE_URL
) as TypedPocketBase;

export const Avatar = () => {
  const group = useRef<Group<Object3DEventMap>>(null);
  const { nodes } = useGLTF("/models/Armature.glb");
  const { animations } = useFBX("/models/Idle.fbx");
  const { actions } = useAnimations(animations, group);

  const skeleton = (nodes.Plane as SkinnedMesh).skeleton;
  const customisations = useConfiguratorStore((state) => state.customisations);
  const setDownload = useConfiguratorStore((state) => state.setDownload);

  useEffect(() => {
    setDownload(() => download(group.current!));
  }, [setDownload]);

  useEffect(() => {
    actions["mixamo.com"]?.play();
  }, [actions]);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {Object.keys(customisations).map(
            (key) =>
              customisations[key].url && (
                <Suspense key={customisations[key].id}>
                  <Asset
                    url={pb.files.getURL(
                      customisations[key],
                      customisations[key].url
                    )}
                    skeleton={skeleton}
                    categoryName={key}
                  />
                </Suspense>
              )
          )}
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/Armature.glb");
