'use client';

import Floor from '@/components/Object3D/Floor';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PlayerController from '@/components/PlayerController';
import Inventory from '@/components/Inventory';

const env = process.env.NODE_ENV;

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Canvas camera={{ position: [10, 10, 20], fov: 30 }}>
        <ambientLight />
        <spotLight />
        <Floor />
        <PlayerController />
        {/* {env === 'development' && <OrbitControls />} */}
      </Canvas>
      <Inventory />
    </main>
  );
}
