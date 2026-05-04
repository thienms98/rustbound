import { generateFromLayout, MAIN_LAYOUT } from '@/lib/tile';
import { useKeyboard } from '@/store';
import { Tile } from '@/types/tile';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Object3D } from 'three';
import * as THREE from 'three';

const color = {
  soil: '#824a15',
  water: '#1eb6c7',
  grass: 'green',
  path: '#634d38',
};

const width = 50,
  height = 50;

enum Mode {
  NONE,
  BUILD,
}

const Ground = memo(() => {
  const keys = useKeyboard((state) => state.keys);
  const [grid, setGrid] = useState(generateFromLayout(MAIN_LAYOUT));
  const [mode, setMode] = useState(Mode.BUILD);

  const ghostRef = useRef<Object3D>(null);

  useEffect(() => {
    console.log(keys);
  }, [keys]);

  const onTileChange = (x: number, z: number, tile: Tile) => {
    if (mode === Mode.BUILD)
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[x][z].type = tile.type;

        return newGrid;
      });
  };

  const onHover = useCallback(
    (point: THREE.Vector3) => {
      if (mode !== Mode.BUILD || !ghostRef.current) return;

      const box = new THREE.Box3().setFromObject(ghostRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);

      const gridX = Math.floor(point.x);
      const gridZ = Math.floor(point.z);

      ghostRef.current.position.set(gridX, 0.5, gridZ);
    },
    [mode],
  );

  return (
    <>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[width / 2 - 1, -0.5, height / 2 - 1]}>
          <boxGeometry args={[width, 1, height]} />
          <meshStandardMaterial visible={false} />
        </mesh>
      </RigidBody>
      <mesh ref={ghostRef}>
        <boxGeometry args={[5, 1, 3]}></boxGeometry>
        <meshStandardMaterial color="lightblue" transparent opacity={0.4} depthWrite={false} />
      </mesh>
      <group>
        {grid.map((row, x) => (
          <group key={x}>
            {row.map((tile, z) => (
              <mesh
                key={x * row.length + z}
                position={[x, -0.5, z]}
                onPointerMove={(e) => {
                  onHover(e.point);
                }}
              >
                <boxGeometry />
                <meshStandardMaterial color={color[tile.type]} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Bounding */}
        <CuboidCollider args={[width / 2, 2.5, 0.25]} position={[width / 2 - 0.5, 1.5, -0.75]} />
        <CuboidCollider
          args={[width / 2, 2.5, 0.25]}
          position={[width / 2 - 0.5, 1.5, height - 0.25]}
        />
        <CuboidCollider
          args={[0.25, 2.5, height / 2]}
          position={[width - 0.25, 1.5, height / 2 - 0.5]}
        />
        <CuboidCollider args={[0.25, 2.5, height / 2]} position={[-0.75, 1.5, height / 2 - 0.5]} />
      </group>
    </>
  );
});

Ground.displayName = 'Ground';
export default Ground;
