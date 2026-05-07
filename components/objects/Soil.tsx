import { useFarmAssets } from '@/hooks/useFarmAssets';
import { memo } from 'react';
import * as Three from 'three';

const TILE_SIZE = 1;

const Soil = memo(({ position }: { position: Three.Vector3 }) => {
  console.log('rerender');
  const { nodes } = useFarmAssets();
  const mesh = nodes.Soil.clone() as Three.Mesh;
  const box = new Three.Box3().setFromObject(mesh);

  const footprint = { x: 1, z: 1 };

  const size = new Three.Vector3();
  box.getSize(size);

  const scaleX = (footprint.x * TILE_SIZE) / size.x;
  const scaleZ = (footprint.z * TILE_SIZE) / size.z;

  return <mesh geometry={mesh.geometry} material={mesh.material} scale={[scaleX, scaleZ, scaleZ]} position={position} />;
});

Soil.displayName = 'Soil';
export default Soil;
