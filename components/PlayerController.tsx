import { Player, Resources, Farm } from '@/components';
import { initialStats, updateCameraPosition, updatePosition, getDirections, updateRotation } from '@/lib/movement';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Object3D, Raycaster } from 'three';
import { useInventory } from '@/store';
import { getRespawnResource, initialSpawn, ResourceType } from '@/lib/resource';
import { RapierRigidBody } from '@react-three/rapier';
import { handleAttack } from '@/lib/attack';
import { handleAnimation } from '@/lib/animation';
import { GROWING_STAGE, plantCrop, plants, Plot, raycastPlots } from '@/lib/farming';
import { useFarm, useKeyboard } from '@/store';

const PlayerController = () => {
  const addItem = useInventory((state) => state.addItem);
  const updatePlot = useFarm((state) => state.updatePlot);
  const keys = useKeyboard.getState().keys;

  const playerRef = useRef<RapierRigidBody>(null);
  const objectsRef = useRef<Object3D>(null);
  const statsRef = useRef(initialStats);
  // const keysRef = useRef<Set<string>>(new Set());
  const plotsRef = useRef<Object3D>(null);

  // const [resources, setResources] = useState<Resource[]>(initialSpawn());
  const [targets, setTargets] = useState<string[]>([]);

  const [animation, setAnimation] = useState<'root|Girl_Idle' | 'root|Girl_walk' | 'root|Girl_run'>('root|Girl_Idle');

  const raycasterRef = useRef(new Raycaster());

  useFrame(({ camera }, delta) => {
    if (!playerRef.current) return;

    const direction = getDirections(keys);
    const isSprint = keys.has('shift');
    const payload = {
      player: playerRef.current,
      objects: objectsRef.current ? objectsRef.current.children : [],
      keys,
      stats: statsRef.current,
      raycaster: raycasterRef.current,
      plots: plotsRef.current,
      // resources,
      delta,
      camera,
      direction,
      isSprint,
    };

    updateRotation(payload);
    updatePosition(payload);
    updateCameraPosition(payload);
    setAnimation(handleAnimation(payload));

    // const attackResults = handleAttack(payload, (items) => {
    //   // TODO: Thêm hàm addItems để tránh async do setState khi có nhiều type cũng lúc
    //   Object.entries(items).forEach(([type, quantity]) => {
    //     if (quantity) addItem(type as unknown as ResourceType, quantity);
    //   });
    // });

    // if (!attackResults) return;

    // const { inRangeObjects } = attackResults;
    // setTargets(inRangeObjects);

    // let { resources: newResources } = attackResults;
    // newResources = getRespawnResource(newResources);
    // setResources(newResources);

    const target = raycastPlots(payload);
    setTargets(target ? [target.userData.id] : []);
    if (target && keys.has('e')) {
      const plot = target.userData as Plot;
      if (plot.plant && plot.plantedAt) {
        const now = Date.now();
        const havestTime = plot.plantedAt + plot.plant.growthTime;

        if (now >= havestTime) {
          updatePlot({
            ...plot,
            stage: GROWING_STAGE.SOIL,
            plant: undefined,
            plantedAt: undefined,
          });
        } else {
          // console.log(havestTime - now, "ms left");
        }
      } else {
        const newPlot = plantCrop(plot, plants.carrot);
        updatePlot(newPlot);
      }
    }
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keys.add(e.key.toLowerCase());
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys.delete(e.key.toLowerCase());
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <>
      <Player ref={playerRef} animation={animation} />
      {/* <Resources ref={objectsRef} targets={targets} resources={resources} /> */}
      <Farm ref={plotsRef} targets={targets} />
    </>
  );
};

export default PlayerController;
