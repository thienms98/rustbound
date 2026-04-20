import { useAnimations, useGLTF } from '@react-three/drei';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { forwardRef, useEffect } from 'react';

const Player = forwardRef<RapierRigidBody, { animation: string }>(({ animation }, ref) => {
  const { scene, animations } = useGLTF('/girl.glb');
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const action = actions[animation];
    action?.reset().fadeIn(0.2).play();

    return () => {
      action?.fadeOut(0.2);
    };
  }, [actions, animation]);

  return (
    <>
      <RigidBody ref={ref} colliders={'cuboid'} restitution={0} friction={1} linearDamping={5} angularDamping={10}>
        <primitive object={scene} position={[0, 0, 0]} />
      </RigidBody>
    </>
  );
});

Player.displayName = 'Player';
export default Player;
