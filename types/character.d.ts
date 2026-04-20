export type Input = {
  direction: DIRECTION;
  rotate: ROTATION;
};

export type Velocity = {
  x: number;
  z: number;
};

export interface CharacterStats {
  rotation: number;
  attackCooldown: number;
}

export interface CharacterAction {
  type: string;
  position: Vector3;
}
