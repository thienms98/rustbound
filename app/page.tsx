'use client';

import Cube from '@/components/Cube';
import Floor from '@/components/Floor';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Canvas camera={{ position: [10, 10, 20], fov: 30 }}>
        <ambientLight />
        <spotLight />
        <Cube />
        <Floor />
        <OrbitControls />
      </Canvas>
    </main>
  );
}
