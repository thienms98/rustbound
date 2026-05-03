import { generateFromLayout, MAIN_LAYOUT } from '@/lib/tile';
import { RigidBody } from '@react-three/rapier';
import { memo } from 'react';

const color = {
  soil: 'brown',
  water: 'blue',
  grass: 'green',
  path: 'black',
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
        <RigidBody type="fixed" colliders="cuboid">
          <mesh position={[width / 2 - 0.5, 1.5, -0.75]}>
            <boxGeometry args={[width, 5, 0.5]}></boxGeometry>
            <meshStandardMaterial transparent opacity={0}></meshStandardMaterial>
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="cuboid">
          <mesh position={[width / 2 - 0.5, 1.5, height - 0.25]}>
            <boxGeometry args={[width, 5, 0.5]}></boxGeometry>
            <meshStandardMaterial transparent opacity={0}></meshStandardMaterial>
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="cuboid">
          <mesh position={[width - 0.5, 1.5, height / 2 - 0.5]}>
            <boxGeometry args={[0.5, 5, height + 1]}></boxGeometry>
            <meshStandardMaterial transparent opacity={0}></meshStandardMaterial>
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" colliders="cuboid">
          <mesh position={[-0.75, 1.5, height / 2 - 0.5]}>
            <boxGeometry args={[0.5, 5, height + 1]}></boxGeometry>
            <meshStandardMaterial transparent opacity={0}></meshStandardMaterial>
          </mesh>
        </RigidBody>
      </group>
    </>
  );
});

Ground.displayName = 'Ground';
export default Ground;
