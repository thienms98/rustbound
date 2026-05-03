'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stats } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import PlayerController from '@/components/PlayerController';
import { Suspense } from 'react';
import ErrorBoundary from '@/app/custom-error-boundary';
import { Ground, Panel } from '@/components';
import { EntityManager } from '@/components/Object3D/Entities';
import { INITIAL_ENTITIES } from '@/lib/entity';

export default function Home() {
  return (
    <ErrorBoundary title="Dashboard Error">
      <main className="w-screen h-screen">
        {/* <Canvas camera={{ fov: 30 }}>
          <Suspense>
            <Physics debug>
              <Ground />
              <EntityManager entities={INITIAL_ENTITIES} />
              <PlayerController />
            </Physics>
          </Suspense>

          <ambientLight />
          <spotLight position={[0, 100, 0]} />
          <Sky sunPosition={[100, 20, 100]} />

          <Stats />
          <OrbitControls />
        </Canvas> */}
        <Panel />
      </main>
    </ErrorBoundary>
  );
}
