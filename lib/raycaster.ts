import { Object3D, Raycaster, Vector3 } from 'three';

interface RaycasterPayload {
  character: Object3D;
  objects: Object3D[];
  raycaster: Raycaster;
}

export const getRaycastedObjects = (payload: RaycasterPayload) => {
  const { character, objects, raycaster } = payload;
  const angle = character.rotation.y;
  const dir = new Vector3(Math.sin(angle), 0, Math.cos(angle));

  raycaster.set(character.position, dir);

  const intersects = raycaster.intersectObjects(objects);
  return intersects;
};
