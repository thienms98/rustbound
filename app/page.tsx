"use client";

import Floor from "@/components/Floor";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PlayerController from "@/components/PlayerController";

const env = process.env.NODE_ENV;

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Canvas camera={{ position: [10, 10, 20], fov: 30 }}>
        <ambientLight />
        <spotLight />
        <Floor />
        <PlayerController />
        {env === "development" && <OrbitControls />}
      </Canvas>
    </main>
  );
}
