export type Input = {
  direction: DIRECTION;
  rotate: ROTATION;
};

export type Velocity = {
  x: number;
  z: number;
};

export interface CharacterStats {
  velocity: {
    x: number;
    z: number;
  };
  angle: number;
  isAttack: boolean;
  attackCooldown: number;
}

export interface CharacterAction {
  type: string;
  position: Vector3;
}
