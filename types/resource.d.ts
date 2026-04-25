export interface Resource {
  id: string;
  type: ResourceType;
  position: Vector3;
  hp: number;
  maxHp: number;

  alive: boolean;
  respawnAt?: number;
}
