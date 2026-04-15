import { CharacterStats } from "@/types/character";
import { RapierRigidBody } from "@react-three/rapier";
import { Camera, Vector2 } from "three";

export type Velocity = {
  x: number;
  z: number;
};

export const MAX_SPEED = 12;
export const ACCELERATE = 2;
export const ROTATE_SPEED = Math.PI / 180;

export const initialStats: CharacterStats = {
  velocity: {
    x: 0,
    z: 0
  },
  angle: 0,
  attackCooldown: 0
};

export const getDirections = (keys: Set<string>) => {
  const forward =
    Number(keys.has("w") || keys.has("arrowup")) -
    Number(keys.has("s") || keys.has("arrowdown"));

  const right =
    Number(keys.has("d") || keys.has("arrowright")) -
    Number(keys.has("a") || keys.has("arrowleft"));

  return { forward, right };
};

export const updateVelocity = (payload: {
  forward: number;
  velocity: Velocity;
  angle: number;
  delta: number;
}) => {
  const { forward, angle, velocity } = payload;
  const dirX = Math.sin(angle);
  const dirZ = Math.cos(angle);

  velocity.x += dirX * ACCELERATE * forward;
  velocity.z += dirZ * ACCELERATE * forward;

  const vec = new Vector2(velocity.x, velocity.z);

  if (vec.length() > MAX_SPEED) {
    vec.normalize().multiplyScalar(MAX_SPEED);
  }

  velocity.x = vec.x;
  velocity.z = vec.y;

  velocity.x *= 0.9;
  velocity.z *= 0.9;
};

export const updatePosition = ({
  player,
  velocity
}: {
  player: RapierRigidBody;
  delta: number;
  forward: number;
  right: number;
  velocity: { x: number; z: number };
}) => {
  player.setLinvel(
    {
      x: velocity.x,
      y: player.linvel().y,
      z: velocity.z
    },
    true
  );
};

export const updateRotation = (
  player: RapierRigidBody,
  angle: number,
  right: number
) => {
  angle -= ROTATE_SPEED * right;
  player.setRotation(
    {
      x: 0,
      y: Math.sin(angle / 2),
      z: 0,
      w: Math.cos(angle / 2)
    },
    true
  );

  return angle;
};

const CAMERA_SMOOTH = 0.05;
const CAMERA_OFFSET = {
  x: 30,
  y: 12,
  z: 30
};

export const updateCameraPosition = (payload: {
  player: RapierRigidBody;
  camera: Camera;
  angle: number;
}) => {
  const { player, camera, angle } = payload;

  const position = player.translation();
  const dirX = Math.sin(angle);
  const dirZ = Math.cos(angle);

  // camera always follow up character
  const targetX = position.x - dirX * CAMERA_OFFSET.x;
  const targetY = position.y + CAMERA_OFFSET.y;
  const targetZ = position.z - dirZ * CAMERA_OFFSET.z;

  // delay to make camera smoother
  camera.position.x += (targetX - camera.position.x) * CAMERA_SMOOTH;
  camera.position.y += (targetY - camera.position.y) * CAMERA_SMOOTH;
  camera.position.z += (targetZ - camera.position.z) * CAMERA_SMOOTH;

  camera.lookAt(position.x, position.y, position.z);
};
