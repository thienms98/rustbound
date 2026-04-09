export type Input = {
  direction: DIRECTION;
  rotate: ROTATION;
};

export type Velocity = {
  x: number;
  z: number;
};

export interface CharacterStats {
  direction: DIRECTION;
  rotation: ROTATION;
  velocity: {
    x: number;
    z: number;
  };
}
