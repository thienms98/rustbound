import { useFarmAssets } from '@/hooks/useFarmAssets';
import { useFrame } from '@react-three/fiber';
import { memo } from 'react';
import { Box3, Vector3 } from 'three';

export enum CROP {
  CARROT = 'Carrot',
  POTATO = 'Potatoe',
  WHEAT = 'Wheat',
  TOMATO = 'Tomato',
}

const TILE_SIZE = 1;

const Crop = memo(({ name, position }: { name: string; position: Vector3; userData: { plantedAt: number; growingTime: number } }) => {
  useFrame(() => {});

  console.log('rerender crop');
  const { nodes } = useFarmAssets();
  const mesh = nodes[name].clone();

  const footprint = new Vector3(1, 1, 1);

  if (!mesh) return null;
  const box = new Box3().setFromObject(mesh);
  const size = new Vector3();
  box.getSize(size);

  const scaleX = (footprint.x * TILE_SIZE) / size.x;

  return <primitive object={mesh} position={position} scale={scaleX} frustumCulled />;
});

Crop.displayName = 'Crop';
export default Crop;
