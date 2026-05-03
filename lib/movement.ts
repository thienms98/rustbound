import { CharacterStats } from '@/types/character';
import { RapierRigidBody } from '@react-three/rapier';
import { Camera, Vector2 } from 'three';

export type Velocity = {
  x: number;
  z: number;
};

export const MOVEMENT_SPEED = 10;
export const SPRINT_SPEED = 20;
export const ROTATE_SPEED = Math.PI / 180;

export const initialStats: CharacterStats = {
  rotation: 0,
  attackCooldown: 0,
};

export const getDirections = (keys: Set<string>) => {
  const y = Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup'));

  const x = Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft'));

  return new Vector2(x, y);
};

export const updatePosition = (payload: { player: RapierRigidBody; direction: Vector2; isSprint: boolean }) => {
  const { direction, isSprint, player } = payload;
  if (direction.length() === 0) {
    player.setLinvel(
      {
        x: 0,
        y: player.linvel().y,
        z: 0,
      },
      true,
    );
    return;
  }

  direction.normalize();

  const SPEED = isSprint ? SPRINT_SPEED : MOVEMENT_SPEED;

  const current = player.linvel();

  player.setLinvel(
    {
      x: current.x + (direction.x * SPEED - current.x) * 0.2,
      y: current.y,
      z: current.z + (direction.y * SPEED - current.z) * 0.2,
    },
    true,
  );
};

export const updateRotation = ({ player, direction, stats }: { player: RapierRigidBody; direction: Vector2; stats: CharacterStats }) => {
  if (!direction.length()) return;

  direction.normalize();
  const angle = Math.atan2(direction.x, direction.y);

  const delta = angle - stats.rotation;
  const shortest = Math.atan2(Math.sin(delta), Math.cos(delta));

  // 🔥 smooth factor (0.1 → chậm, 0.3 → nhanh)
  stats.rotation += shortest * 0.075;

  player.setRotation(
    {
      x: 0,
      y: Math.sin(stats.rotation / 2),
      z: 0,
      w: Math.cos(stats.rotation / 2),
    },
    true,
  );
};

const CAMERA_OFFSET = {
  x: -10,
  y: 30,
  z: 60,
};

export const updateCameraPosition = (payload: { player: RapierRigidBody; camera: Camera }) => {
  const { player, camera } = payload;

  const position = player.translation();

  camera.position.x = position.x + CAMERA_OFFSET.x;
  camera.position.y = position.y + CAMERA_OFFSET.y;
  camera.position.z = position.z + CAMERA_OFFSET.z;

  camera.lookAt(position.x, position.y, position.z);
};
