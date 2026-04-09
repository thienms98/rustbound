import { Object3D, Raycaster, Vector3 } from "three";

const ATTACK_RANGE = 1;

export const handleRaycaster = (
  character: Object3D,
  objects: Object3D[],
  raycaster: Raycaster
) => {
  const angle = character.rotation.y;
  const dir = new Vector3(Math.sin(angle), 0, Math.cos(angle));

  if (!objects) return;
  raycaster.set(character.position, dir);

  const intersects = raycaster.intersectObjects(objects);
  const closest = intersects[0];
  if (!closest) return;

  console.log("🚀 ~ handleRaycaster ~ closest.distance:", closest.distance);
  if (closest.distance < ATTACK_RANGE) console.log("hit");
  else console.log("miss");
};
