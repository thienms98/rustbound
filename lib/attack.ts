import { Resource } from "@/components/Object3D/Resources";
import { Intersection, Object3D } from "three";
import { ResourceType } from "./resource";

export const ATTACK_TIME = 0.5;
export const ATTACK_RANGE = 20;

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
    if (onHit) onHit(closest.object);
  } else {
    if (onMiss) onMiss(closest.object);
  }
};

export const onObjectHit = (
  object: Object3D,
  resources: Resource[],
  onDead?: (type: ResourceType, quantity: number) => void
) => {
  const newResources = [...resources];
  const item = resources.find((item) => item.id === object.userData.id);
  if (!item) return newResources;

  const newHp = Math.max(item.hp - 1, 0);

  item.hp = newHp;
  item.alive = Boolean(newHp);
  item.respawnAt = Date.now() + 10000;

  if (newHp <= 0 && onDead) onDead(object.userData.type, 1);

  return newResources;
};
