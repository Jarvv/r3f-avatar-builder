import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#f0f0f0"]} />
        <OrbitControls />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
