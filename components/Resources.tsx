import { forwardRef } from "react";
import { Group } from "three";

const Resources = forwardRef<Group>((_, ref) => {
  return (
    <group ref={ref}>
      <mesh
        position={[-20, 0.5, 20]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{
          type: "tree",
          hp: 3
        }}
      >
        <torusGeometry args={[4, 1, 30, 30]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh
        position={[-20, 0.5, -6]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{
          type: "tree",
          hp: 3
        }}
      >
        <torusGeometry args={[4, 1, 30, 30]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh
        position={[20, 2, 20]}
        userData={{
          type: "rock",
          hp: 5
        }}
      >
        <coneGeometry args={[2, 4, 64, 1]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>
      <mesh
        position={[10, 2, 15]}
        userData={{
          type: "rock",
          hp: 5
        }}
      >
        <coneGeometry args={[2, 4, 64, 1]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>
    </group>
  );
});

Resources.displayName = "Resources";
export default Resources;
