import { useFarmAssets } from '@/hooks/useFarmAssets';
import { EntityCrop } from '@/store/entity';
import { memo, useEffect, useMemo, useState } from 'react';
import { Box3, Vector3 } from 'three';

export enum CROP {
  CARROT = 'Carrot',
  POTATO = 'Potatoe',
  WHEAT = 'Wheat',
  TOMATO = 'Tomato',
}

const TILE_SIZE = 1;
const now = Date.now();

const Crop = memo(({ name, position, footprint, userData }: EntityCrop) => {
  const [stage, setStage] = useState(Math.floor(((now - userData.plantedAt) * 2) / userData.growthDuration) + 1);

  useEffect(() => {
    const timeout = setInterval(() => {
      const now = Date.now();
      const newStage = Math.floor(((now - userData.plantedAt) * 2) / userData.growthDuration);

      setStage(newStage + 1);
      if (newStage > 1) clearInterval(timeout);
    }, 500);

    return () => clearInterval(timeout);
  }, []);

  const { nodes } = useFarmAssets();
  const mesh = useMemo(() => nodes[`${name}_F${stage}`]?.clone(), [nodes, name, stage]);
  console.log('🚀 ~ mesh:', mesh);

  if (!mesh) return null;
  const box = new Box3().setFromObject(mesh);
  const size = new Vector3();
  box.getSize(size);

  const scaleX = (footprint.x * TILE_SIZE) / size.x;

  return <primitive object={mesh} position={position} scale={scaleX} userData={userData} frustumCulled />;
});

Crop.displayName = 'Crop';
export default Crop;
