import { Intersection, Object3D, Vector3 } from 'three';
import { v4 } from 'uuid';
import { getDistance } from './utils';
import { RapierRigidBody } from '@react-three/rapier';
import { Resource } from '@/types/resource';

export const MINIMUM_DISTANCE = 5;
export const MAX_HP = 5;
export const MAX_SPAWN_ATTEMPS = 5;
const HP_MIN_DISTANCE = 10;

export enum ResourceType {
  TREE = 'tree',
  ROCK = 'rock',
}

const restrictedAreas = {
  [ResourceType.TREE]: [
    [-40, -10],
    [-40, -10],
  ],
  [ResourceType.ROCK]: [
    [20, 50],
    [10, 40],
  ],
};

export const initialSpawn = (resources: Resource[] = []) => {
  Object.values(ResourceType).forEach((t) => {
    const type = t as ResourceType;
    const restrictedArea = restrictedAreas[type];
    Array.from({ length: 12 }).forEach(() => {
      resources = spawnResource(type, resources, restrictedArea);
    });
  });

  return resources;
};

const spawnResource = (type: ResourceType, resources: Resource[], restrictedArea?: number[][]): Resource[] => {
  let attempts = MAX_SPAWN_ATTEMPS;
  while (attempts) {
    attempts--;

    const randomPosition = getRandomPosition(restrictedArea);
    const validPosition = resources.every((r) => !r.alive || getDistance(r.position, randomPosition) > MINIMUM_DISTANCE);
    if (!validPosition) continue;

    const newResource = {
      id: v4(),
      type,
      position: randomPosition,
      hp: MAX_HP,
      maxHp: MAX_HP,
      alive: true,
    };
    return [...resources, newResource];
  }

  return resources;
};

export const getRespawnResource = (resources: Resource[]) => {
  return resources.map((r) => {
    const type = r.type;
    if (r.alive || (r.respawnAt && r.respawnAt >= Date.now())) return r;
    let attempts = MAX_SPAWN_ATTEMPS;
    while (attempts) {
      attempts--;

      const randomPosition = getRandomPosition(restrictedAreas[type]);
      const validPosition = resources.every((r) => !r.alive || getDistance(r.position, randomPosition) > MINIMUM_DISTANCE);
      if (!validPosition) continue;

      return {
        ...r,
        position: randomPosition,
        hp: MAX_HP,
        maxHp: MAX_HP,
        alive: true,
      };
    }

    return r;
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

  return new Vector3(xMin + Math.random() * xRange, 3, zMin + Math.random() * zRange);
};

export const getCloseIntersects = (char: RapierRigidBody, intersects: Intersection<Object3D>[], distance = HP_MIN_DISTANCE) => {
  const { x, y, z } = char.translation();

  return intersects.filter((item) => getDistance(item.object.position, new Vector3(x, y, z)) < distance).map((i) => i.object.userData.id);
};
