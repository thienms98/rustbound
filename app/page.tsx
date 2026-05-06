"use client";

import ErrorBoundary from "@/app/custom-error-boundary";
import Toolbar from "@/components/layout/Toolbar";
import Grid from "@/components/objects/Grid";
import Ground from "@/components/objects/Ground";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { Mesh, MeshStandardMaterial, Object3D, Raycaster } from "three";

const GroundColor = "#573106";
const HighlightColor = "#30ffee";

export default function Home() {
  const gridRef = useRef<Object3D>(null);
  const groundRef = useRef<Mesh>(null);

  const raycastRef = useRef(new Raycaster());
  const hoveredRef = useRef<Mesh>(null);

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    console.log(e);
    if (!gridRef.current) return;

    const point = e.point;
    const origin = point.clone().setY(-2);
    const dir = point.clone().sub(origin).normalize();

    raycastRef.current.set(origin, dir);

    const hoveredTiles = raycastRef.current.intersectObjects(
      gridRef.current.children
    );

    const hit = hoveredTiles[0]?.object as Mesh | undefined;

    if (hit === hoveredRef.current) return;

    if (hoveredRef.current) {
      const mat = hoveredRef.current.material as MeshStandardMaterial;
      mat.color.set(GroundColor);
    }

    if (hit) {
      (hit.material as MeshStandardMaterial).color.set(HighlightColor);
    }

    hoveredRef.current = hit || null;
  };

  return (
    <ErrorBoundary title="Dashboard Error">
      <main className="w-screen h-screen">
        <Canvas camera={{ fov: 30, position: [0, 60, 60] }}>
          <gridHelper args={[40, 40]} position={[9.5, 0.51, 9.5]} />
          <Suspense>
            <Physics>
              <Ground ref={groundRef} onPointerMove={onPointerMove} />
            </Physics>
            <Grid ref={gridRef} />
          </Suspense>

          <ambientLight />
          <spotLight position={[0, 100, 0]} />
          <Sky sunPosition={[100, 20, 100]} distance={150} />

          <fog attach="fog" args={[0xa0a0a0, 200, 300]} />

          <Stats />
          <OrbitControls />
        </Canvas>

        <Toolbar />
      </main>
    </ErrorBoundary>
  );
}
