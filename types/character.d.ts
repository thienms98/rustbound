export enum DIRECTION {
  BACKWARD = -1,
  NONE = 0,
  FORWARD = 1
}

export enum ROTATION {
  RIGHT = -1,
  LEFT = 1,
  NONE = 0
}

export type Input = {
  direction: DIRECTION;
  rotate: ROTATION;
};

export type Velocity = {
  x: number;
  z: number;
};

export interface Character {
  direction: DIRECTION;
  rotation: ROTATION;
  velocity: {
    x: number;
    z: number;
  };
}
