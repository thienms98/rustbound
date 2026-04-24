"use client";

import { Ground } from "@/components/Object3D";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import PlayerController from "@/components/PlayerController";
import Inventory from "@/components/Inventory";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Canvas camera={{ fov: 30 }}>
        <Suspense>
          <Physics>
            <Ground />
            <PlayerController />
          </Physics>
        </Suspense>

        <ambientLight />
        <spotLight position={[0, 100, 0]} />
        <Sky sunPosition={[100, 20, 100]} />

        <fog attach="fog" args={[0xa0a0a0, 200, 300]} />

        <Stats />
        <OrbitControls />
      </Canvas>
      {/* <Inventory /> */}
    </main>
  );
}
