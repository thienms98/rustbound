import { Intersection, Object3D } from "three";

const ATTACK_RANGE = 3;

interface AttackPayload {
  intersects: Intersection<Object3D>[];
  onHit?: (object: Object3D) => void;
  onMiss?: (object: Object3D) => void;
}

export const handleAttack = (payload: AttackPayload) => {
  const { intersects, onHit, onMiss } = payload;
  console.log("🚀 ~ handleAttack ~ intersects:", intersects);
  const closest = intersects[0];
  if (!closest) return;

  console.log(closest.distance);

  if (closest.distance < ATTACK_RANGE) {
    if (onHit) onHit(closest.object);
  } else {
    if (onMiss) onMiss(closest.object);
  }
};
