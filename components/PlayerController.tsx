import Player from "./Object3D/Player";
import Resources, { Resource } from "./Resources";
import {
  initialStats,
  updateCameraPosition,
  updatePosition,
  updateVelocity
} from "@/lib/movement";
import { getInputClearState, getInputState } from "@/lib/keyboard";
import { ATTACK_TIME, handleAttack } from "@/lib/attack";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { Object3D, Raycaster } from "three";
import { useInventory } from "@/store/inventory";
import { getRaycastedObjects } from "@/lib/raycaster";
import {
  getCloseIntersects,
  getRespawnResource,
  initialSpawn,
  ResourceType
} from "@/lib/resource";
import AttackEffect from "./AttackEffect";
import { CharacterAction } from "@/types/character";
const PlayerController = () => {
  const addStone = useInventory((state) => state.addStone);
  const addWood = useInventory((state) => state.addWood);

  const playerRef = useRef<Object3D>(null);
  const objectsRef = useRef<Object3D>(null);
  const statsRef = useRef(initialStats);

  const [resources, setResources] = useState<Resource[]>(initialSpawn());
  const [targets, setTargets] = useState<string[]>([]);
  const [actions, setActions] = useState<CharacterAction[]>([]);

  const raycasterRef = useRef(new Raycaster());

  const handleObjectHit = (object: Object3D, resources: Resource[]) => {
    const updatedResources = resources.map((item) =>
      item.id === object.userData.id
        ? {
            ...item,
            hp: Math.max(item.hp - 1, 0),
            alive: Boolean(Math.max(item.hp - 1, 0)),
            respawnAt: Date.now() + 10000
          }
        : item
    );

    if (object.userData.hp - 1 <= 0)
      switch (object.userData.type) {
        case ResourceType.TREE:
          addWood();
          break;
        case ResourceType.ROCK:
          addStone();
          break;
      }

    return updatedResources;
  };

  useFrame(({ camera }, delta) => {
    if (!playerRef.current) return;

    const payload = {
      player: playerRef.current,
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

    updateCameraPosition(payload);

    let newResources = [...resources];

    if (objectsRef.current) {
      const intersects = getRaycastedObjects({
        character: playerRef.current,
        objects: [objectsRef.current],
        raycaster: raycasterRef.current
      });

      setTargets(getCloseIntersects(playerRef.current, intersects));

      if (statsRef.current.isAttack) {
        handleAttack({
          intersects,
          onHit: (object) => {
            newResources = handleObjectHit(object, newResources);
          }
        });

        statsRef.current.isAttack = false;
        statsRef.current.attackCooldown = ATTACK_TIME;

        console.log(newResources);
      }
    }

    newResources = getRespawnResource(newResources);
    setResources(newResources);
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
      <Player ref={playerRef} />
      <AttackEffect ref={playerRef} />
      <Resources ref={objectsRef} targets={targets} resources={resources} />
    </>
  );
};

export default PlayerController;
