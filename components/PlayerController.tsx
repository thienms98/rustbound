import Player from './Object3D/Player';
import Resources, { Resource } from './Resources';
import { CharacterStats } from '@/types/character';
import { ATTACK_TIME, getInputClearState, getInputState, initialStats, updateCameraPosition, updatePosition, updateVelocity } from '@/lib/movement';
import { handleAttack } from '@/lib/attack';
import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Group, Object3D, Raycaster, Vector3 } from 'three';
import { useInventory } from '@/store/inventory';
import { getRaycastedObjects } from '@/lib/raycaster';
import { getDistance } from '@/lib/resource';

const PlayerController = () => {
  const addStone = useInventory((state) => state.addStone);
  const addWood = useInventory((state) => state.addWood);

  const playerRef = useRef<Object3D>(null);
  const objectsRef = useRef<Group>(null);
  const statsRef = useRef(initialStats);

  const [targets, setTargets] = useState<string[]>([]);
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'tree-1',
      type: 'tree',
      position: new Vector3(10, 1, 10),
      hp: 3,
      maxHp: 3,
      alive: true,
    },
    {
      id: 'tree-2',
      type: 'tree',
      position: new Vector3(10, 1, 12),
      hp: 3,
      maxHp: 3,
      alive: true,
    },
    {
      id: 'rock-1',
      type: 'rock',
      position: new Vector3(-10, 0.5, 5),
      hp: 5,
      maxHp: 5,
      alive: true,
    },
  ]);

  const raycasterRef = useRef(new Raycaster());

  const handleObjectHit = (object: Object3D) => {
    setResources((prev) =>
      prev.map((item) =>
        item.id === object.userData.id
          ? {
              ...item,
              hp: item.hp - 1,
              alive: false,
              respawnAt: Date.now() + 300000,
            }
          : item,
      ),
    );
    if (object.userData.hp - 1 <= 0)
      switch (object.userData.type) {
        case 'tree':
          addWood();
          break;
        case 'rock':
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

    // updateCameraPosition(payload);

    if (!objectsRef.current) return;

    const intersects = getRaycastedObjects({
      character: playerRef.current,
      objects: [objectsRef.current],
      raycaster: raycasterRef.current,
    });

    setTargets(intersects.map((item) => (getDistance(item.object, playerRef.current!) < 5 ? item.object.userData.id : null)));

    if (statsRef.current.isAttack) {
      console.log('attacking', intersects[0]);
      handleAttack({
        intersects,
        onHit: handleObjectHit,
      });

      statsRef.current.isAttack = false;
      statsRef.current.attackCooldown = ATTACK_TIME;
    }
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
      <Resources ref={objectsRef} targets={targets} resources={resources} />
    </>
  );
};

export default PlayerController;
