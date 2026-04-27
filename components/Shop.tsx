import { plants } from "@/lib/farming";
import { cn } from "@/lib/utils";
import InventoryItem from "./InventoryItem";

const Shop = () => {
  return (
    <div
      className={cn(
        "fixed top-20 right-2 gap-4 bg-white/50 backdrop-blur-2xl p-2 rounded-lg text-black text-sm grid grid-cols-5 select-none"
        // inventory ? "" : "hidden"
      )}
    >
      {Object.values(plants).map((item, idx) => {
        return item.name;
      })}
    </div>
  );
};

export default Shop;
