import { Object3D, Vector3 } from "three";

export const findObjectByName = (
  object: Object3D,
  name: string
): Object3D | null => {
  if (!object || !object.isObject3D) return null;

  if (object.name === name) return object;

  for (const child of object.children) {
    const found = findObjectByName(child, name);
    if (found) return found;
  }

  return null;
};

export const getDistance = (aPosition: Vector3, bPosition: Vector3) => {
  return Math.sqrt(
    Math.pow(aPosition.x - bPosition.x, 2) +
      Math.pow(aPosition.z - bPosition.z, 2)
  );
};
