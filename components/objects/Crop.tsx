import { useFarmAssets } from '@/hooks/useFarmAssets';
import { EntityCrop } from '@/types/entity';
import { useFrame } from '@react-three/fiber';
import { memo, useMemo, useRef } from 'react';
import { Mesh, Object3D } from 'three';

export enum CROP {
  CARROT = 'carrot',
  POTATO = 'potatoe',
  WHEAT = 'wheat',
  TOMATO = 'tomato',
}

const Crop = memo(({ name, position, userData }: EntityCrop) => {
  const { nodes } = useFarmAssets();
  const groupRef = useRef<Object3D>(null);
  const stageRef = useRef(0);
  // eslint-disable-next-line react-hooks/purity
  const frameCounterRef = useRef(Math.floor(Math.random() * 30));
  const meshes = useMemo(
    () =>
      Object.values(nodes)
        .filter((mesh) => mesh.name.toLowerCase().includes(name.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((mesh) => {
          const { geometry, material } = mesh as Mesh;
          const newMesh = new Mesh(geometry, material);
          newMesh.name = mesh.name;
          return newMesh;
        })
        .filter((i) => Boolean(i)),
    [nodes, name],
  );

  useFrame(() => {
    frameCounterRef.current++;
    if (frameCounterRef.current % 30 !== 0) return;

    if (!groupRef.current || stageRef.current >= meshes.length - 1) return;
    const now = Date.now();
    const timePassed = now - userData.plantedAt;
    const stage = Math.max(0, Math.floor((timePassed * 2) / userData.growthDuration));

    // return on stage unchanged
    if (stageRef.current === stage) return;

    stageRef.current = stage;

    groupRef.current.children.forEach((mesh, index) => {
      mesh.visible = index === stage;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {meshes.map(
        (mesh, index) =>
          mesh && (
            <primitive key={mesh.uuid} object={mesh} scale={0.4} userData={userData} frustumCulled visible={!index} />
          ),
      )}
    </group>
  );
});

Crop.displayName = 'Crop';
export default Crop;
