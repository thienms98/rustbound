import { Intersection, Object3D } from 'three';

const ATTACK_RANGE = 2;

interface AttackPayload {
  intersects: Intersection<Object3D>[];
  onHit?: (object: Object3D) => void;
  onMiss?: (object: Object3D) => void;
}

export const handleAttack = (payload: AttackPayload) => {
  const { intersects, onHit, onMiss } = payload;
  const closest = intersects[0];
  if (!closest) return;

  if (closest.distance < ATTACK_RANGE) {
    hitObject(closest.object);
    if (onHit) onHit(closest.object);
  } else {
    if (onMiss) onMiss(closest.object);
  }
};

const hitObject = (object: Object3D) => {
  console.log(object.userData.hp);
  if (--object.userData.hp <= 0) object.parent?.remove(object);
};
