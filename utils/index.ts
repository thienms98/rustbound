import { Group, Mesh } from 'three';

export enum CUBE_ACTION {
  IDLE,
  FORWARD,
  BACWARD,
  ROTATE_LEFT,
  ROTATE_RIGHT,
}

export const MOVEMENT_SPEED = 1;
export const ROTATE_SPEED = Math.PI / 3;

export const getActionByKey = (key: string) => {
  switch (key) {
    case 'a':
    case 'arrowleft':
      return CUBE_ACTION.ROTATE_LEFT;

    case 'd':
    case 'arrowright':
      return CUBE_ACTION.ROTATE_RIGHT;

    case 'w':
    case 'arrowup':
      return CUBE_ACTION.FORWARD;

    case 's':
    case 'arrowdown':
      return CUBE_ACTION.BACWARD;

    default:
      return CUBE_ACTION.IDLE;
  }
};

export const handleCubeAction = ({ action, cube, delta }: { action: CUBE_ACTION; cube: Mesh; delta: number }) => {
  const angle = cube.rotation.y;
  const dirX = Math.sin(angle);
  const dirZ = Math.cos(angle);

  switch (action) {
    case CUBE_ACTION.FORWARD:
      cube.position.x += dirX * delta * MOVEMENT_SPEED;
      cube.position.z += dirZ * delta * MOVEMENT_SPEED;
      break;
    case CUBE_ACTION.BACWARD:
      cube.position.x -= dirX * delta * MOVEMENT_SPEED;
      cube.position.z -= dirZ * delta * MOVEMENT_SPEED;
      break;
    case CUBE_ACTION.ROTATE_LEFT:
      cube.rotation.y += delta * ROTATE_SPEED;
      break;
    case CUBE_ACTION.ROTATE_RIGHT:
      cube.rotation.y -= delta * ROTATE_SPEED;
      break;
  }
};
