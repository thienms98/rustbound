import { Html } from "@react-three/drei";
import { forwardRef } from "react";
import { Group, Object3D, Vector3 } from "three";

interface Props {
  target: Object3D | null;
  resources: Resource[];
}

export interface Resource {
  id: string;
  type: string;
  position: Vector3;
  hp: number;
  maxHp: number;

  alive: boolean;
  respawnAt?: number; // timestamp
}

const Resources = forwardRef<Group, Props>(({ target, resources }, ref) => {
  console.log("🚀 ~ target:", target);
  return (
    <group ref={ref}>
      {resources.map(
        (item) =>
          item.alive && (
            <mesh
              key={item.id}
              position={item.position}
              // rotation={[Math.PI / 2, 0, 0]}
              userData={{
                id: item.id,
                type: item.type,
                hp: item.hp
              }}
            >
              {item.type === "tree" ? (
                <coneGeometry args={[1, 3, 64, 1]} />
              ) : (
                <sphereGeometry args={[1, 32, 16]} />
              )}
              <meshStandardMaterial
                color={item.type === "tree" ? "green" : "gray"}
              />
              {target?.userData.id === item.id && (
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
          )
      )}
    </group>
  );
});

Resources.displayName = "Resources";
export default Resources;
