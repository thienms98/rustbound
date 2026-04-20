import { Resource } from "@/components/Object3D/Resources";
import { Object3D, Vector3 } from "three";
import { ResourceType } from "./resource";
import { RapierRigidBody } from "@react-three/rapier";
import { keysContainsAction } from "./utils";
import { CharacterStats } from "@/types/character";
import { ACTION_KEYS } from "./keyboard";

export const ATTACK_COOLDOWN = 0.5;
export const ATTACK_RANGE = 10;
export const ATTACK_RADIUS = Math.PI / 3;

export const RESPAWN_TIME = 5000; // at ms

interface AttackPayload {
  player: RapierRigidBody;
  stats: CharacterStats;
  resources: Resource[];
  keys: Set<string>;
  objects: Object3D[];
  delta: number;
}

export const handleAttack = (
  payload: AttackPayload,
  onHarvest: (items: Record<ResourceType, number>) => void
) => {
  const { stats, keys, resources } = payload;
  stats.attackCooldown = handleAttackCooldown(payload);

  const inRangeObjects = getInRangeObjects(payload).map((i) =>
    String(i.userData.id)
  );

  if (!keysContainsAction(keys, ACTION_KEYS.ATTACK) || stats.attackCooldown > 0)
    return { inRangeObjects, resources };
  stats.attackCooldown = ATTACK_COOLDOWN;

  const harvested: Record<ResourceType, number> = {};

  const newResources = [...resources].map((res) => {
    if (!inRangeObjects.includes(res.id)) return res;

    const newHp = Math.max(res.hp - 1, 0);
    let alive = true;
    let respawnAt = res.respawnAt;

    if (newHp === 0) {
      alive = false;
      respawnAt = Date.now() + RESPAWN_TIME;

      harvested[res.type]++;
      if (!harvested[res.type]) harvested[res.type] = 1;
    }

    return {
      ...res,
      hp: newHp,
      alive,
      respawnAt
    };
  });

  onHarvest(harvested);

  return { resources: newResources, inRangeObjects };
};

export const getInRangeObjects = (payload: AttackPayload) => {
  const { objects, player } = payload;
  const { x, y, z } = player.translation();

  const origin = new Vector3(x, y, z);

  const forward = new Vector3(0, 0, 1);
  forward.applyQuaternion(player.rotation()).normalize();

  const hits: Object3D[] = [];
  objects.forEach((obj) => {
    const pos = obj.userData.position as Vector3;
    const target = pos.clone().sub(origin);
    const distance = target.length();

    if (distance > ATTACK_RANGE) return;

    const dot = forward.dot(target);

    if (dot > Math.cos(ATTACK_RADIUS / 2)) hits.push(obj);
  });

  return hits;
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

export const handleAttackCooldown = (payload: AttackPayload) => {
  const { stats, delta } = payload;
  stats.attackCooldown -= delta;
  stats.attackCooldown = Math.max(stats.attackCooldown, 0);

  return stats.attackCooldown;
};
