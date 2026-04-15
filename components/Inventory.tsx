import { useInventory } from "@/store/inventory";
import InventoryItem from "./InventoryItem";
import { MAX_SLOT } from "@/lib/inventory";
import { v4 } from "uuid";

const Inventory = () => {
  const items = useInventory((state) => state.items);
  console.log(items);

  return (
    <div className="fixed top-2 left-2 gap-4 bg-white/50 backdrop-blur-2xl p-2 rounded-lg text-black text-sm grid grid-cols-5">
      {Array.from({ length: MAX_SLOT }).map((_, i) => {
        const item = items[i];
        return <InventoryItem key={item?.id || v4()} {...item} />;
      })}
    </div>
  );
};

export default Inventory;
