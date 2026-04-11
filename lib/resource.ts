import { Resource } from "@/components/Resources";
import { Intersection, Object3D, Vector3 } from "three";
import { v4 } from "uuid";

export const MINIMUM_DISTANCE = 5;
export const MAX_HP = 5;
export const MAX_SPAWN_ATTEMPS = 5;
const HP_MIN_DISTANCE = 10;

export enum ResourceType {
  TREE,
  ROCK
}

const restrictedAreas = {
  [ResourceType.TREE]: [
    [-30, 0],
    [-30, 0]
  ],
  [ResourceType.ROCK]: [
    [20, 50],
    [10, 40]
  ]
};

export const getDistance = (aPosition: Vector3, bPosition: Vector3) => {
  return Math.sqrt(
    Math.pow(aPosition.x - bPosition.x, 2) +
      Math.pow(aPosition.z - bPosition.z, 2)
  );
};

export const initialSpawn = (resources: Resource[] = []) => {
  Object.values(ResourceType)
    .filter((v) => typeof v === "number")
    .forEach((t) => {
      const type = t as ResourceType;
      const restrictedArea = restrictedAreas[type];
      Array.from({ length: 12 }).forEach(() => {
        resources = spawnResource(type, resources, restrictedArea);
      });
    });

  return resources;
};

const spawnResource = (
  type: ResourceType,
  resources: Resource[],
  restrictedArea?: number[][],
  attempts = MAX_SPAWN_ATTEMPS
): Resource[] => {
  while (attempts) {
    attempts--;

    const randomPosition = getRandomPosition(restrictedArea);
    const validPosition = resources.every(
      (r) =>
        !r.alive || getDistance(r.position, randomPosition) > MINIMUM_DISTANCE
    );
    if (!validPosition) continue;

    const newResource = {
      id: v4(),
      type,
      position: randomPosition,
      hp: MAX_HP,
      maxHp: MAX_HP,
      alive: true
    };
    return [...resources, newResource];
  }

  return resources;
};

export const getRespawnResource = (resources: Resource[]) => {
  return resources.map((r) => {
    if (r.alive || (r.respawnAt && r.respawnAt >= Date.now())) return r;

    const randomPosition = getRandomPosition(restrictedAreas[r.type]);
    const validPosition = resources.every(
      (r) => getDistance(r.position, randomPosition) > MINIMUM_DISTANCE
    );
    if (!validPosition) return r;

    return {
      ...r,
      position: randomPosition,
      hp: MAX_HP,
      maxHp: MAX_HP,
      alive: true
    };
  });
};

export const getRandomPosition = (
  restrictedArea = [
    [-50, 50],
    [-50, 50]
  ]
) => {
  const [[x1, x2], [z1, z2]] = restrictedArea;

  const xMin = Math.min(x2, x1);
  const zMin = Math.min(z2, z1);
  const xRange = Math.abs(x2 - x1);
  const zRange = Math.abs(z2 - z1);

  return new Vector3(
    xMin + Math.random() * xRange,
    0.5,
    zMin + Math.random() * zRange
  );
};

export const getCloseIntersects = (
  char: Object3D,
  intersects: Intersection<Object3D>[],
  distance = HP_MIN_DISTANCE
) => {
  return intersects
    .filter(
      (item) => getDistance(item.object.position, char.position) < distance
    )
    .map((i) => i.object.userData.id);
};
