import { GROWING_STAGE, Plant } from "@/lib/farming";
import Carrot from "./Carrot";

const Crop = ({ plant, stage }: { plant: Plant; stage: GROWING_STAGE }) => {
  switch (plant.name) {
    case "carrot":
      return <Carrot stage={stage} />;
  }
};

export default Crop;
