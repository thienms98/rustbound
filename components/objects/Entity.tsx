import { useEntity } from '@/store/entity';
import Crop from './Crop';
import Soil from './Soil';
import { memo } from 'react';

interface Entity {
  type: 'crop';
}

const Entity = memo(() => {
  const entities = useEntity((state) => state.entities);

  return (
    <group position={[0, 0.5, 0]}>
      {entities.map((ent) => {
        switch (ent.type) {
          case 'soil':
            return <Soil key={ent.id} position={ent.position} />;

          case 'crop':
            return <Crop key={ent.id} name={ent.name} position={ent.position} />;

          default:
            return null;
        }
      })}
    </group>
  );
});

Entity.displayName = 'Entity';
export default Entity;
