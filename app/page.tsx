"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import PlayerController from "@/components/PlayerController";
import { Suspense } from "react";
import ErrorBoundary from "@/app/custom-error-boundary";
import { Inventory, Shop, Ground } from "@/components";

export default function Home() {
  return (
    <ErrorBoundary title="Dashboard Error">
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
        <Inventory />
        <Shop />
      </main>
    </ErrorBoundary>
  );
}
