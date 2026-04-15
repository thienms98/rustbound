import { Resource } from "@/components/Object3D/Resources";
import { Intersection, Object3D } from "three";
import { ResourceType } from "./resource";

export const ATTACK_TIME = 0.5;
export const ATTACK_RANGE = 3;

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
  const updatedResources = resources.map((item) =>
    item.id === object.userData.id
      ? {
          ...item,
          hp: Math.max(item.hp - 1, 0),
          alive: Boolean(Math.max(item.hp - 1, 0)),
          respawnAt: Date.now() + 10000
        }
      : item
  );

  if (object.userData.hp - 1 <= 0 && onDead) onDead(object.userData.type, 1);

  return updatedResources;
};
