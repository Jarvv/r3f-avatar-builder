import { useConfiguratorStore } from "@/stores/configuratorStore";
import { useAnimations, useGLTF } from "@react-three/drei";
import { RefObject, useEffect } from "react";
import { Group, Object3DEventMap } from "three";

export const useAvatarAnimations = (
  group: RefObject<Group<Object3DEventMap>>
) => {
  const { animations } = useGLTF("/models/Poses.glb");
  const { actions } = useAnimations(animations, group);

  const pose = useConfiguratorStore((state) => state.pose);
  const setPoses = useConfiguratorStore((state) => state.setPoses);
  const setPose = useConfiguratorStore((state) => state.setPose);

  useEffect(() => {
    const poses = Object.keys(actions);
    setPoses(poses);
    setPose(poses[0]);
  }, [actions, setPoses, setPose]);

  useEffect(() => {
    actions[pose]?.reset().fadeIn(0.2).play();

    return () => {
      actions[pose]?.reset().fadeOut(0.2);
    };
  }, [actions, pose]);
};
