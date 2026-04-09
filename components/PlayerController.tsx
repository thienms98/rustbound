import Player from './Object3D/Player';
import Resources from './Resources';
import { CharacterStats } from '@/types/character';
import { ATTACK_TIME, getInputClearState, getInputState, updateCameraPosition, updatePosition, updateVelocity } from '@/lib/movement';
import { handleAttack } from '@/lib/attack';
import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Group, Object3D, Raycaster } from 'three';
import { useInventory } from '@/store/inventory';
import { getRaycastedObjects } from '@/lib/raycaster';

const PlayerController = () => {
  const playerRef = useRef<Object3D>(null);
  const objectsRef = useRef<Group>(null);
  const addStone = useInventory((state) => state.addStone);
  const addWood = useInventory((state) => state.addWood);
  const [target, setTarget] = useState<Object3D | null>(null);
  const statsRef = useRef<CharacterStats>({
    direction: 0,
    rotation: 0,
    velocity: {
      x: 0,
      z: 0,
    },
    isAttack: false,
    attackCooldown: 0,
  });

  const raycasterRef = useRef(new Raycaster());

  const handleObjectHit = (object: Object3D) => {
    if (object.userData.hp <= 0)
      switch (object.userData.type) {
        case 'wood':
          addWood();
          break;
        case 'stone':
          addStone();
          break;
      }
  };

  useFrame(({ camera }, delta) => {
    if (!playerRef.current) return;

    const payload = {
      player: playerRef.current,
      delta,
      camera,
      ...statsRef.current,
    };

    updateVelocity(payload);
    updatePosition(payload);
    statsRef.current.attackCooldown -= delta;
    statsRef.current.attackCooldown = Math.max(statsRef.current.attackCooldown, 0);

    updateCameraPosition(payload);

    if (!objectsRef.current || !statsRef.current.isAttack) return;

    const intersects = getRaycastedObjects({
      character: playerRef.current,
      objects: [objectsRef.current],
      raycaster: raycasterRef.current,
    });

    handleAttack({
      intersects,
      onHit: handleObjectHit,
    });
    setTarget(intersects[0]?.object);

    statsRef.current.isAttack = false;
    statsRef.current.attackCooldown = ATTACK_TIME;
  });

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    statsRef.current = getInputState(e.key.toLowerCase(), statsRef.current);
  }, []);

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    statsRef.current = {
      ...statsRef.current,
      ...getInputClearState(e.key.toLowerCase()),
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return (
    <>
      <Player ref={playerRef} />
      <Resources ref={objectsRef} />
    </>
  );
};

export default PlayerController;
