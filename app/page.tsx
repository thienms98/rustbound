'use client';

import Floor from '@/components/Object3D/Ground';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stats } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import PlayerController from '@/components/PlayerController';
import { Suspense } from 'react';
import Panel from '@/components/Panel';

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Canvas camera={{ fov: 30 }}>
        <Suspense>
          <Physics>
            <Floor />
            <PlayerController />
          </Physics>
        </Suspense>

        <ambientLight />
        <spotLight />

        <Environment preset="dawn" background />

        <Stats />
        <OrbitControls />
      </Canvas>
      <Panel />
    </main>
  );
}
