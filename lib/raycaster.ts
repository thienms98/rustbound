import { RapierRigidBody } from "@react-three/rapier";
import { Object3D, Raycaster, Vector3 } from "three";

interface RaycasterPayload {
  player: RapierRigidBody;
  objects: Object3D[];
  raycaster: Raycaster;
}

export const getRaycastedIntersects = (payload: RaycasterPayload) => {
  const { player, objects, raycaster } = payload;

  const { x, y, z } = player.translation();
  const origin = new Vector3(x, y, z);

  const dir = new Vector3(0, 0, 1);
  dir.applyQuaternion(player.rotation());
  dir.y = 0.2; // optional, để ray chúc lên
  dir.normalize();

  raycaster.set(origin, dir);

  const intersects = raycaster.intersectObjects(objects);
  return intersects;
};
