import { Environment, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, N8AO } from "@react-three/postprocessing";
import { Avatar } from "@/components/Avatar";
import { CameraManager } from "@/components/CameraManager";
import { Lights } from "@/components/Lights";
import { CAMERA } from "@/const";

export const AvatarCanvas = () => {
  return (
    <Canvas
      shadows
      camera={{ position: CAMERA.POSITION, fov: 45 }}
      gl={{
        preserveDrawingBuffer: true,
      }}
    >
      <mesh receiveShadow rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#333" roughness={0.85} />
      </mesh>
      <color attach="background" args={["#130f30"]} />
      <fog attach="fog" args={["#130f30", 10, 40]} />
      <Environment preset="sunset" environmentIntensity={0.3} />
      <CameraManager />
      <Lights />
      <SoftShadows size={52} samples={16} focus={0.5} />
      <Avatar />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1.2} intensity={1.2} />
        <N8AO
          quality="performance"
          halfRes
          aoRadius={50}
          distanceFalloff={0.2}
          intensity={6}
          screenSpaceRadius
        />
      </EffectComposer>
    </Canvas>
  );
};
