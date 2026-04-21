import { useInventory } from "@/store/inventory";
import InventoryItem from "./InventoryItem";
import { v4 } from "uuid";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Panel = () => {
  const items = useInventory((state) => state.items);
  const [dragItem, setDragItem] = useState<number>();

  return (
    <div
      className={cn(
        "w-full h-full bg-white/50 backdrop-blur-2xl p-2 rounded-lg text-black text-sm grid grid-cols-5 gap-3 select-none"
      )}
    >
      {items.map((item, idx) => {
        return (
          <InventoryItem
            key={item?.id || v4()}
            {...item}
            order={idx}
            dragItem={dragItem}
            setDragItem={setDragItem}
          />
        );
      })}
    </div>
  );
};

export default Panel;
