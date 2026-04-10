import { Resource } from '@/components/Resources';
import { Intersection, Object3D, Vector2, Vector3 } from 'three';
import { v4 } from 'uuid';

export const MINIMUM_DISTANCE = 5;
export const MAX_HP = 5;
export const MAX_RESPAWN_ATTEMPS = 3;
const HP_MIN_DISTANCE = 10;

export const getDistance = (aPosition: Vector3, bPosition: Vector3) => {
  return Math.sqrt(Math.pow(aPosition.x - bPosition.x, 2) + Math.pow(aPosition.z - bPosition.z, 2));
};

const spawnResource = (type: string): Resource => {
  const position = getRandomPosition();

  const newResource = {
    id: v4(),
    type,
    position,
    hp: MAX_HP,
    maxHp: MAX_HP,
    alive: true,
  };

  return newResource;
};

export const getRespawnResource = (resources: Resource[]) => {
  return resources.map((r) => {
    if (r.alive || (r.respawnAt && r.respawnAt >= Date.now())) return r;

    const randomPosition = getRandomPosition();
    const validPosition = resources.every((r) => getDistance(r.position, randomPosition) > MINIMUM_DISTANCE);
    if (!validPosition) return r;

    console.log('respawning at: ', randomPosition);

    return {
      ...r,
      position: randomPosition,
      hp: MAX_HP,
      maxHp: MAX_HP,
      alive: true,
    };
  });
};

export const getRandomPosition = (
  restrictedArea = [
    [-50, 50],
    [-50, 50],
  ],
) => {
  const [[x1, x2], [z1, z2]] = restrictedArea;

  const xMin = Math.min(x2, x1);
  const zMin = Math.min(z2, z1);
  const xRange = Math.abs(x2 - x1);
  const zRange = Math.abs(z2 - z1);

  return new Vector3(xMin + Math.random() * xRange, 0.5, zMin + Math.random() * zRange);
};

export const getCloseIntersects = (char: Object3D, intersects: Intersection<Object3D>[], distance = HP_MIN_DISTANCE) => {
  return intersects.map((item) => (getDistance(item.object.position, char.position) < distance ? item.object.userData.id : null)).filter((i) => Boolean(i));
};
