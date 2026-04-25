import { useInventory, useKeyboard } from "@/store";
import InventoryItem from "./InventoryItem";
import { v4 } from "uuid";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Inventory = () => {
  const items = useInventory((state) => state.items);
  const keys = useKeyboard.getState().keys;
  console.log("🚀 ~ Inventory ~ keys:", keys);
  const [dragItem, setDragItem] = useState<number>();

  return (
    <div
      className={cn(
        "fixed top-20 left-2 gap-4 bg-white/50 backdrop-blur-2xl p-2 rounded-lg text-black text-sm grid grid-cols-5 select-none",
        keys.has("tab") || keys.has("b") ? "" : "hidden"
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

export default Inventory;
