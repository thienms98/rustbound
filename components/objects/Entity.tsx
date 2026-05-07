import { useEntity } from "@/store/entity";
import Crop from "./Crop";
import Soil from "./Soil";

interface Entity {
  type: "crop";
}

const Entity = () => {
  const entities = useEntity((state) => state.entities);
  console.log(entities);

  return (
    <group position={[0, 0.5, 0]}>
      {entities.map((ent) => {
        switch (ent.type) {
          case "soil":
            return <Soil position={ent.position} />;

          case "crop":
            return <Crop name={ent.name} position={ent.position} />;

          default:
            return null;
        }
      })}
    </group>
  );
};

export default Entity;
