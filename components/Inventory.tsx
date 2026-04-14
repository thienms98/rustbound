import { useInventory } from "@/store/inventory";

const Inventory = () => {
  // const { wood, stone } = useInventory((state) => state);

  return (
    <div className="fixed top-2 left-2 flex gap-4 bg-white/50 backdrop-blur-2xl p-2 rounded-lg text-black text-sm">
      {/* <div className="flex gap-1">
        <span>🪵</span>
        <span>{wood}</span>
      </div>
      <div className="flex gap-1">
        <span>🪨</span>
        <span>{stone}</span>
      </div> */}
    </div>
  );
};

export default Inventory;
