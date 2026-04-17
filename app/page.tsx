"use client";

import Floor from "@/components/Object3D/Floor";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import PlayerController from "@/components/PlayerController";
import Inventory from "@/components/Inventory";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Canvas camera={{ fov: 30 }}>
        <Suspense>
          <Physics debug>
            <Floor />
            <PlayerController />
          </Physics>
        </Suspense>

        <ambientLight />
        <spotLight />

        <Environment preset="dawn" background />

        <OrbitControls />
      </Canvas>
      <Inventory />
    </main>
  );
}
