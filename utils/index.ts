import { Mesh } from 'three';

export enum DIRECTION {
  BACKWARD = -1,
  NONE = 0,
  FORWARD = 1,
}

export enum ROTATION {
  RIGHT = -1,
  LEFT = 1,
  NONE = 0,
}

export type Input = {
  direction: DIRECTION;
  rotate: ROTATION;
};

export const MOVEMENT_SPEED = 1;
export const ROTATE_SPEED = Math.PI / 3;

export const getInputState = (key: string): Partial<Input> => {
  switch (key) {
    case 'a':
    case 'arrowleft':
      return { rotate: ROTATION.LEFT };

    case 'd':
    case 'arrowright':
      return { rotate: ROTATION.RIGHT };

    case 'w':
    case 'arrowup':
      return { direction: DIRECTION.FORWARD };

    case 's':
    case 'arrowdown':
      return { direction: DIRECTION.BACKWARD };

    default:
      return {};
  }
};

export const getInputClearState = (key: string): Partial<Input> => {
  switch (key) {
    case 'a':
    case 'arrowleft':
    case 'd':
    case 'arrowright':
      return { rotate: ROTATION.NONE };

    case 'w':
    case 'arrowup':
    case 's':
    case 'arrowdown':
      return { direction: DIRECTION.NONE };

    default:
      return {};
  }
};

export const handleCubeAction = ({ cube, delta, direction, rotate }: { cube: Mesh; delta: number } & Input) => {
  const angle = cube.rotation.y;
  const dirX = Math.sin(angle);
  const dirZ = Math.cos(angle);

  cube.position.x += dirX * delta * MOVEMENT_SPEED * direction;
  cube.position.z += dirZ * delta * MOVEMENT_SPEED * direction;

  cube.rotation.y += delta * ROTATE_SPEED * rotate;
};
