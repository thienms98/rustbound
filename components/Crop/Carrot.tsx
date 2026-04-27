import { GROWING_STAGE } from "@/lib/farming";

const Carrot = ({ stage }: { stage: GROWING_STAGE }) => {
  switch (stage) {
    case GROWING_STAGE.SEED:
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      );
    case GROWING_STAGE.SPROUT:
      return (
        <mesh>
          <boxGeometry args={[1, 2, 1]} />
          <meshStandardMaterial color={"lightgreen"} />
        </mesh>
      );
    case GROWING_STAGE.SEEDLING:
      return (
        <mesh>
          <boxGeometry args={[1, 4, 1]} />
          <meshStandardMaterial color={"lightyellow"} />
        </mesh>
      );

    case GROWING_STAGE.GROWTH:
      return (
        <mesh>
          <boxGeometry args={[1, 6, 1]} />
          <meshStandardMaterial color={"yellow"} />
        </mesh>
      );

    case GROWING_STAGE.SOIL:
    default:
      return null;
  }
};

export default Carrot;
