import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { forwardRef } from 'react';

const Player = forwardRef<RapierRigidBody>((_, ref) => {
  return (
    <>
      <RigidBody ref={ref} colliders={'cuboid'} restitution={0} friction={1}>
        <mesh name="player">
          {/* <primitive object={new AxesHelper(2)} /> */}
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="white" />
          {/* 6 mặt */}
          <meshStandardMaterial attach="material-0" color="white" /> {/* right */}
          <meshStandardMaterial attach="material-1" color="white" /> {/* left */}
          <meshStandardMaterial attach="material-2" color="white" /> {/* top */}
          <meshStandardMaterial attach="material-3" color="white" /> {/* bottom */}
          <meshStandardMaterial attach="material-4" color="red" /> {/* front */}
          <meshStandardMaterial attach="material-5" color="white" /> {/* back */}
        </mesh>
      </RigidBody>
      {/* <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} /> */}
    </>
  );
});

Player.displayName = 'Cube';
export default Player;
