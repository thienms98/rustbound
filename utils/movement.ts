import { DIRECTION, ROTATION } from "@/constants/character";
import { CharacterStats } from "@/types/character";
import { Camera, Mesh, Vector2 } from "three";

export type Velocity = {
  x: number;
  z: number;
};

export const MAX_SPEED = 12;
export const ACCELERATE = 2;
export const ROTATE_SPEED = Math.PI / 2;
export const ATTACK_TIME = 1;

export const getInputState = (
  key: string,
  stats: CharacterStats
): CharacterStats => {
  switch (key) {
    case "a":
    case "arrowleft":
      return { ...stats, rotation: ROTATION.LEFT };

    case "d":
    case "arrowright":
      return { ...stats, rotation: ROTATION.RIGHT };

    case "w":
    case "arrowup":
      return { ...stats, direction: DIRECTION.FORWARD };

    case "s":
    case "arrowdown":
      return { ...stats, direction: DIRECTION.BACKWARD };

    case "e":
      if (stats.attackCooldown) return stats;
      return { ...stats, isAttack: true, attackCooldown: ATTACK_TIME };

    default:
      return stats;
  }
};

export const getInputClearState = (key: string): Partial<CharacterStats> => {
  switch (key) {
    case "a":
    case "arrowleft":
    case "d":
    case "arrowright":
      return { rotation: ROTATION.NONE };

    case "w":
    case "arrowup":
    case "s":
    case "arrowdown":
      return { direction: DIRECTION.NONE };

    default:
      return {};
  }
};

export const updateVelocity = (
  payload: CharacterStats & { cube: Mesh; delta: number }
) => {
  const { direction, cube, velocity } = payload;
  const angle = cube.rotation.y;
  const dirX = Math.sin(angle);
  const dirZ = Math.cos(angle);

  velocity.x += dirX * ACCELERATE * direction;
  velocity.z += dirZ * ACCELERATE * direction;

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
  cube,
  delta,
  rotation,
  velocity
}: { cube: Mesh; delta: number } & CharacterStats) => {
  cube.position.x += velocity.x * delta;
  cube.position.z += velocity.z * delta;

  cube.rotation.y += delta * ROTATE_SPEED * rotation;
};

const CAMERA_SMOOTH = 0.05;
const CAMERA_OFFSET = {
  x: 30,
  y: 20,
  z: 30
};

export const updateCameraPosition = (
  payload: {
    cube: Mesh;
    camera: Camera;
  } & CharacterStats
) => {
  const { cube, camera } = payload;
  const angle = cube.rotation.y;
  const dirX = Math.sin(angle);
  const dirZ = Math.cos(angle);

  // camera always follow up character
  const targetX = cube.position.x - dirX * CAMERA_OFFSET.x;
  const targetY = cube.position.y + CAMERA_OFFSET.y;
  const targetZ = cube.position.z - dirZ * CAMERA_OFFSET.z;

  // delay to make camera smoother
  camera.position.x += (targetX - camera.position.x) * CAMERA_SMOOTH;
  camera.position.y += (targetY - camera.position.y) * CAMERA_SMOOTH;
  camera.position.z += (targetZ - camera.position.z) * CAMERA_SMOOTH;

  camera.lookAt(cube.position);
};
