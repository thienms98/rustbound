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
  isAttack: boolean;
  attackCooldown: number;
}

export interface CharacterAction {
  type: string;
  position: Vector3;
}
