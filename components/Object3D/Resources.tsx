import { ResourceType } from "@/lib/resource";
import { Html } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";
import { Object3D, Vector3 } from "three";

interface Props {
  targets: string[];
  resources: Resource[];
}

export interface Resource {
  id: string;
  type: ResourceType;
  position: Vector3;
  hp: number;
  maxHp: number;

  alive: boolean;
  respawnAt?: number;
}

const Resources = forwardRef<Object3D, Props>(({ targets, resources }, ref) => {
  return (
    <group ref={ref}>
      {resources.map(
        (item) =>
          item.alive && (
            <RigidBody
              type="fixed"
              colliders="cuboid"
              restitution={0}
              friction={1}
              key={item.id}
              userData={{
                id: item.id,
                type: item.type,
                hp: item.hp,
                position: item.position
              }}
            >
              <mesh
                type="resource"
                position={item.position}
                userData={{
                  id: item.id,
                  type: item.type,
                  hp: item.hp
                }}
              >
                {item.type === ResourceType.TREE ? (
                  <coneGeometry args={[1, 6, 64, 1]} />
                ) : (
                  <sphereGeometry args={[3, 32, 16]} />
                )}
                <meshStandardMaterial
                  color={item.type === ResourceType.TREE ? "green" : "gray"}
                />
                {targets.includes(item.id) && (
                  <Html position={[0, 3, 0]} center>
                    <div className="w-12.5 h-1.5 bg-green-50">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(item.hp / item.maxHp) * 100}%` }}
                      />
                    </div>
                  </Html>
                )}
              </mesh>
            </RigidBody>
          )
      )}
    </group>
  );
});

Resources.displayName = "Resources";
export default Resources;
