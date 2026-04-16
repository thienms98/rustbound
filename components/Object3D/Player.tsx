import { useAnimations, useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { forwardRef, useEffect } from "react";

const Player = forwardRef<RapierRigidBody, { animation: string }>(
  ({ animation }, ref) => {
    const { scene, animations } = useGLTF("/girl_mechanic.glb");
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
        <RigidBody ref={ref} colliders={"cuboid"} restitution={0} friction={1}>
          <primitive object={scene} />
        </RigidBody>
      </>
    );
  }
);

Player.displayName = "Cube";
export default Player;
