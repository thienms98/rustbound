import { generateFromLayout, MAIN_LAYOUT } from "@/lib/tile";
import { RigidBody } from "@react-three/rapier";
import { memo } from "react";

const color = {
  soil: "brown",
  water: "blue",
  grass: "green"
};

const width = 50,
  height = 50;
const Ground = memo(() => {
  const grid = generateFromLayout(MAIN_LAYOUT);

  return (
    <>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[width / 2 - 0.5, -0.5, height / 2 - 0.5]}>
          <boxGeometry args={[width, 1, height]} />
          <meshStandardMaterial visible={false} />
        </mesh>
      </RigidBody>
      <group>
        {grid.map((row, x) => (
          <group key={x}>
            {row.map((tile, z) => (
              <mesh key={x * row.length + z} position={[x, -0.5, z]}>
                <boxGeometry />
                <meshStandardMaterial color={color[tile.type]} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </>
  );
});

Ground.displayName = "Ground";
export default Ground;
