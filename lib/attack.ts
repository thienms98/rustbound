import { Resource } from '@/components/Object3D/Resources';
import { Object3D, Vector3 } from 'three';
import { ResourceType } from './resource';
import { RapierRigidBody } from '@react-three/rapier';
import { keysContainsAction } from './utils';
import { CharacterStats } from '@/types/character';
import { ACTION_KEYS } from './keyboard';

export const ATTACK_COOLDOWN = 0.5;
export const ATTACK_RANGE = 20;
export const ATTACK_RADIUS = Math.PI / 2;

export const RESPAWN_TIME = 60000; // at ms

interface AttackPayload {
  player: RapierRigidBody;
  stats: CharacterStats;
  resources: Resource[];
  keys: Set<string>;
  objects: Object3D[];
  delta: number;
}

export const handleAttack = (payload: AttackPayload) => {
  const { stats, keys, resources } = payload;
  stats.attackCooldown = handleAttackCooldown(payload);

  if (!keysContainsAction(keys, ACTION_KEYS.ATTACK) || stats.attackCooldown > 0) return { hitObjects: [], resources };
  stats.attackCooldown = ATTACK_COOLDOWN;
  const hitObjects = getAttackedObjects(payload).map((i) => i.userData.id);
  const newResources = [...resources].map((res) => {
    if (!hitObjects.includes(res.id)) return res;

    const newHp = Math.min(res.hp - 1, 0);
    const alive = newHp ? true : false;
    const respawnAt = alive ? res.respawnAt : Date.now() + RESPAWN_TIME;

    return {
      ...res,
      hp: newHp,
      alive,
      respawnAt,
    };
  });

  return { resources: newResources, hitObjects };
};

export const getAttackedObjects = (payload: AttackPayload) => {
  const { objects, player } = payload;
  const { x, y, z } = player.translation();

  const origin = new Vector3(x, y, z);

  const forward = new Vector3(0, 0, 1);
  console.log({ origin, forward });
  forward.applyQuaternion(player.rotation()).normalize();

  const hits: Object3D[] = [];
  console.log('🚀 ~ getAttackedObjects ~ objects:', objects);
  objects.forEach((obj) => {
    const pos = obj.getWorldPosition(new Vector3());
    console.log('🚀 ~ getAttackedObjects ~ pos:', pos);
    const target = pos.clone().sub(origin);
    const distance = target.length();
    console.log('🚀 ~ getAttackedObjects ~ distance:', distance);

    if (distance > ATTACK_RANGE) return;

    const dot = forward.dot(target);
    console.log('🚀 ~ getAttackedObjects ~ dot:', dot);

    if (dot > Math.cos(ATTACK_RADIUS / 2)) hits.push(obj);
  });

  return hits;
};

export const onObjectHit = (object: Object3D, resources: Resource[], onDead?: (type: ResourceType, quantity: number) => void) => {
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
