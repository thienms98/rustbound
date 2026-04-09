import Cube from "./Cube";
import Resources from "./Resources";
import { CharacterStats } from "@/types/character";
import {
  ATTACK_TIME,
  getInputClearState,
  getInputState,
  updateCameraPosition,
  updatePosition,
  updateVelocity
} from "@/utils/movement";
import { handleRaycaster } from "@/utils/raycaster";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { Group, Mesh, Raycaster, Vector3 } from "three";
const env = process.env.NODE_ENV;

const PlayerController = () => {
  const cubeRef = useRef<Mesh>(null);
  const objectsRef = useRef<Group>(null);

  const statsRef = useRef<CharacterStats>({
    direction: 0,
    rotation: 0,
    velocity: {
      x: 0,
      z: 0
    },
    isAttack: false,
    attackCooldown: 0
  });

  const raycasterRef = useRef(new Raycaster());

  useFrame(({ camera }, delta) => {
    if (!cubeRef.current) return;

    const payload = {
      cube: cubeRef.current,
      delta,
      camera,
      ...statsRef.current
    };

    updateVelocity(payload);
    updatePosition(payload);
    statsRef.current.attackCooldown -= delta;
    statsRef.current.attackCooldown = Math.max(
      statsRef.current.attackCooldown,
      0
    );

    if (!objectsRef.current || !statsRef.current.isAttack) return;

    handleRaycaster(
      cubeRef.current,
      [objectsRef.current],
      raycasterRef.current
    );
    statsRef.current.isAttack = false;
    statsRef.current.attackCooldown = ATTACK_TIME;

    if (env === "production") updateCameraPosition(payload);
  });

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    statsRef.current = getInputState(e.key.toLowerCase(), statsRef.current);
  }, []);

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    statsRef.current = {
      ...statsRef.current,
      ...getInputClearState(e.key.toLowerCase())
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return (
    <>
      <Cube ref={cubeRef} />
      <Resources ref={objectsRef} />
    </>
  );
};

export default PlayerController;
