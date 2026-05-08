'use client';

import ErrorBoundary from '@/app/custom-error-boundary';
import Toolbar from '@/components/layout/Toolbar';
import Entity from '@/components/objects/Entity';
import Grid from '@/components/objects/Grid';
import Ground from '@/components/objects/Ground';
import { isInsideRectangle } from '@/helpers/bounding';
import { useAction } from '@/store/action';
import { EntityType, useEntity } from '@/store/entity';
import { OrbitControls, Sky, Stats } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense, useRef } from 'react';
import { Mesh, MeshStandardMaterial, Object3D, Raycaster, Vector2, Vector3 } from 'three';
import { v4 } from 'uuid';

const GroundColor = '#573106';
const HighlightColor = '#30ffee';
const LEFT_MOUSE = 0;

export default function Home() {
  const action = useAction((state) => state.action);
  const { addEntity, destroyEntitiesInTile } = useEntity((state) => state);

  const gridRef = useRef<Object3D>(null);
  const groundRef = useRef<Mesh>(null);

  const raycastRef = useRef(new Raycaster());
  const hoveredRef = useRef<Mesh>(null);

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!gridRef.current) return;

    const point = e.point;
    const origin = point.clone().setY(-2);
    const dir = point.clone().sub(origin).normalize();

    raycastRef.current.set(origin, dir);

    const hoveredTiles = raycastRef.current.intersectObjects(gridRef.current.children);

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

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.button !== LEFT_MOUSE) return;
    if (!hoveredRef.current) return;

    const position = hoveredRef.current.position.clone();
    const isInside = isInsideRectangle(new Vector2(position.x, position.z), new Vector2(0, 0), new Vector2(100, 100));
    if (!isInside) return;

    const { tilled, planted, watered } = hoveredRef.current.userData as {
      tilled: boolean;
      planted: boolean;
      watered: boolean;
    };

    if (action.type === 'plant') {
      if (!tilled) {
        addEntity({
          id: v4(),
          name: 'soil',
          type: EntityType.SOIL,
          position,
          footprint: new Vector3(1, 1, 1),
        });
        hoveredRef.current.userData.tilled = true;
        return;
      }
      if (!planted) {
        addEntity({
          id: v4(),
          name: 'Wheat',
          type: EntityType.CROP,
          position,
          footprint: new Vector3(1, 1, 1),
          userData: {
            plantedAt: Date.now(),
            growthDuration: 20000,
          },
        });
        hoveredRef.current.userData.planted = true;
        return;
      }
    }

    if (action.type === 'destroy') {
      destroyEntitiesInTile(hoveredRef.current.position.clone());
    }
  };

  return (
    <ErrorBoundary title="Dashboard Error">
      <main className="w-screen h-screen">
        <Canvas camera={{ fov: 30, position: [30, 30, 70] }}>
          <gridHelper args={[40, 40]} position={[9.5, 0.51, 9.5]} />
          <ambientLight />
          <spotLight position={[0, 100, 0]} />
          <Sky sunPosition={[100, 20, 100]} distance={150} />
          <fog attach="fog" args={[0xa0a0a0, 200, 300]} />
          <OrbitControls />
          <Stats />

          <Suspense>
            <Physics>
              <Ground ref={groundRef} onPointerMove={onPointerMove} onPointerDown={onPointerDown} />
            </Physics>
            <Grid ref={gridRef} />
            <Entity />
          </Suspense>
        </Canvas>

        <Toolbar />
      </main>
    </ErrorBoundary>
  );
}
