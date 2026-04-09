import { DIRECTION, ROTATION } from "@/constants/character";
import { Mesh, Vector2 } from "three";

export type Input = {
  direction: DIRECTION;
  rotation: ROTATION;
};

export type Velocity = {
  x: number;
  z: number;
};

export const MAX_SPEED = 12;
export const ACCELERATE = 2;
export const ROTATE_SPEED = Math.PI / 2;

export const getInputState = (key: string): Partial<Input> => {
  switch (key) {
    case "a":
    case "arrowleft":
      return { rotation: ROTATION.LEFT };

    case "d":
    case "arrowright":
      return { rotation: ROTATION.RIGHT };

    case "w":
    case "arrowup":
      return { direction: DIRECTION.FORWARD };

    case "s":
    case "arrowdown":
      return { direction: DIRECTION.BACKWARD };

    default:
      return {};
  }
};

export const getInputClearState = (key: string): Partial<Input> => {
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
  payload: Input & { velocity: Velocity; cube: Mesh; delta: number }
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
}: { cube: Mesh; delta: number; velocity: Velocity } & Input) => {
  cube.position.x += velocity.x * delta;
  cube.position.z += velocity.z * delta;

  cube.rotation.y += delta * ROTATE_SPEED * rotation;
};
