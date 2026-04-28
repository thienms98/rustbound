import { SeedType, TreeType, UtilityType } from "@/lib/resource";
import { cn } from "@/lib/utils";
import { useInventory } from "@/store";
import { useStats } from "@/store/stats";
import { ShopItem } from "@/types/item";
import { CoinsIcon } from "lucide-react";
import {
  FormEventHandler,
  MouseEventHandler,
  SubmitEventHandler,
  useCallback,
  useState
} from "react";
import { toast } from "sonner";

const initialItems: ShopItem[] = [
  {
    id: "CRS",
    name: "carrot seed",
    asset: "",
    type: SeedType.CARROT_SEED,
    price: 500,
    qty: 1,
    stock: 20,
    currency: "coin",
    restockedAt: new Date(),
    restockTime: 3600000,
    sellPrice: 0.1 * 5
  },
  {
    id: "WHS",
    name: "wheet seed",
    type: SeedType.WHEET_SEED,
    asset: "",
    price: 25,
    qty: 1,
    stock: 5,
    currency: "coin",
    restockedAt: new Date(),
    restockTime: 3600000,
    sellPrice: 0.1 * 25
  },
  {
    id: "APT",
    name: "apple tree",
    type: TreeType.APPLE_TREE,
    asset: "",
    price: 100,
    qty: 1,
    stock: 2,
    currency: "coin",
    restockedAt: new Date(),
    restockTime: 3600000,
    sellPrice: 0.1 * 100
  },
  {
    id: "FER",
    name: "fertilizer x4",
    type: UtilityType.FERTILIZER,
    asset: "",
    price: 20,
    qty: 4,
    stock: 10,
    currency: "coin",
    restockedAt: new Date(),
    restockTime: 3600000,
    sellPrice: 0.1 * 20
  }
];

const Store = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [amount, setAmount] = useState(1);
  const [shopItems, setShopItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState<ShopItem>();

  const addInventoryItem = useInventory((state) => state.addItem);
  const changeBalance = useStats((state) => state.changeBalance);
  const balance = useStats((state) => state.stats.balance);

  const handleClick = useCallback((item: ShopItem) => {
    setSelectedItem(item);
    setAmount(1);
  }, []);

  const buyItem = (item: ShopItem, stacks: number = 1) => {
    const totalPrice = item.price * stacks;

    if (totalPrice > balance) {
      toast("Not enough coin");
      return;
    }

    if (!item.stock) {
      toast("OUT OF STOCKS");
      return;
    }

    const newItems = [...shopItems];
    stacks = Math.min(stacks, item.stock);

    const updatedItem = { ...item, stock: item.stock - stacks };
    toast(JSON.stringify(updatedItem));

    setShopItems(
      newItems.map((i) => (i.id === updatedItem.id ? updatedItem : i))
    );
    addInventoryItem(item.type, item.qty * stacks);
    changeBalance(totalPrice * -1);
  };

  const handleBuy: SubmitEventHandler = (e) => {
    e.preventDefault();
    if (!selectedItem) return;
    toast(amount);
    buyItem(selectedItem, amount);
    setAmount(1);
  };

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="grid grid-cols-5 gap-5 p-2 bg-white rounded-lg size-fit">
        {shopItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            onContextMenu={(e) => {
              e.preventDefault();
              buyItem(item);
            }}
          >
            <div className="relative truncate border border-black rounded-lg size-16">
              {item.id}
              <div className="absolute bottom-0.5 right-0.5 text-black font-semibold text-md">
                x{item.stock}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <CoinsIcon size={12} />
              {item.price}
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <div className="bg-white">
          <span>{selectedItem.name}</span>

          <form className="flex" onSubmit={handleBuy}>
            <input
              type="number"
              name="qty"
              value={amount}
              min={1}
              max={selectedItem.stock}
              onChange={(e) => setAmount(+e.target.value)}
            />
            <button type="submit">Buy</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Store;
