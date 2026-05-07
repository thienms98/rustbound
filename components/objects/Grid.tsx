import { ThreeElements } from '@react-three/fiber';
import { useRef } from 'react';
import { Object3D } from 'three';

const grid = Array.from({ length: 20 }).flatMap((_, i) =>
  Array.from({ length: 20 }).map((_, j) => ({
    x: i,
    y: j,
    userData: {
      tilled: false,
      watered: false,
      planted: false,
    },
  })),
);

const GroundColor = '#573106';

const Grid = (props: ThreeElements['group']) => {
  const gridRef = useRef<Object3D>(null);

  return (
    <group ref={gridRef} {...props}>
      {grid.map(({ x, y, userData }) => (
        <mesh key={`${x}-${y}`} position={[x, 0, y]} userData={userData}>
          <boxGeometry />
          <meshBasicMaterial color={GroundColor} />
        </mesh>
      ))}
    </group>
  );
};

export default Grid;
