import { RapierRigidBody } from "@react-three/rapier";
import { Object3D, Raycaster, Vector3 } from "three";

interface RaycasterPayload {
  angle: number;
  player: RapierRigidBody;
  objects: Object3D[];
  raycaster: Raycaster;
}

export const getRaycastedIntersects = (payload: RaycasterPayload) => {
  const { angle, player, objects, raycaster } = payload;

  const { x, y, z } = player.translation();
  const origin = new Vector3(x, y, z);
  const dir = new Vector3(Math.sin(angle), 0, Math.cos(angle));

  raycaster.set(origin, dir);

  const intersects = raycaster.intersectObjects(objects);
  return intersects;
};
