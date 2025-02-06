import { animated, useSpring } from "@react-spring/three";
import { Float, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

type AvatarLoaderProps = {
  children: React.ReactNode;
};

type AvatarWrapperProps = {
  children: React.ReactNode;
  loading: boolean;
};

export const AvatarLoader = ({ children }: AvatarLoaderProps) => {
  const { active } = useProgress();
  const [loading, setLoading] = useState(active);
  const setLoadingAt = useRef(0);

  const { positionY } = useSpring({
    positionY: loading ? 0 : -4,
  });

  const { scale, spin, floatHeight } = useSpring({
    scale: loading ? 0.5 : 1,
    spin: loading ? Math.PI * 4 : 0,
    floatHeight: loading ? 0.5 : 0,
  });

  useEffect(() => {
    let timeout;
    if (active) {
      timeout = setTimeout(() => {
        setLoading(true);
        setLoadingAt.current = Date.now();
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setLoading(false);
      }, Math.max(0, 2000 - (Date.now() - setLoadingAt.current)));
    }
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <>
      <animated.group position-y={positionY}>
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 4]} />
          <meshStandardMaterial
            color={"orange"}
            emissive={"orange"}
            emissiveIntensity={5}
            opacity={0.1}
            transparent
          />
        </mesh>
        <mesh position-y={2}>
          <cylinderGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial
            color={"orange"}
            emissive={"orange"}
            emissiveIntensity={4}
            opacity={0.8}
            transparent
          />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial
            color={"orange"}
            emissive={"orange"}
            emissiveIntensity={4}
            opacity={0.8}
            transparent
          />
        </mesh>
      </animated.group>
      <AvatarWrapper loading={loading}>
        <animated.group
          scale={scale}
          position-y={floatHeight}
          rotation-y={spin}
        >
          {children}
        </animated.group>
      </AvatarWrapper>
    </>
  );
};

const AvatarWrapper = ({ loading, children }: AvatarWrapperProps) => {
  return loading ? (
    <Float floatIntensity={1} speed={6}>
      {children}
    </Float>
  ) : (
    children
  );
};
