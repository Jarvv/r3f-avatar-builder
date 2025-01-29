import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { UI } from "./components/UI";
import { Avatar } from "./components/Avatar";

function App() {
  return (
    <>
      <UI />
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#f0f0f0"]} />
        <OrbitControls />
        <Avatar />
      </Canvas>
    </>
  );
}

export default App;
