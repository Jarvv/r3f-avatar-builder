import { Backdrop, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { UI } from "@/components/UI";
import { Avatar } from "@/components/Avatar";

function App() {
  return (
    <>
      <UI />
      <Canvas shadows camera={{ position: [-1, 3, 5], fov: 45 }}>
        <Backdrop
          scale={[50, 10, 5]}
          floor={1.5}
          receiveShadow
          position={[0, 0, -4]}
        >
          <meshStandardMaterial color="#555" />
        </Backdrop>
        <color attach="background" args={["#555"]} />
        <fog attach="fog" args={["#555", 15, 25]} />
        <Stage
          intensity={0.3}
          preset="rembrandt"
          environment="city"
          adjustCamera={false}
          shadows
        >
          <OrbitControls
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            maxDistance={6}
            minDistance={2}
            enablePan={false}
          />
          <Avatar />
          <directionalLight
            position={[1, 0.1, -5]}
            intensity={3}
            color={"red"}
          />
          <directionalLight
            position={[-1, 0.1, -5]}
            intensity={8}
            color={"blue"}
          />
        </Stage>
      </Canvas>
    </>
  );
}

export default App;
