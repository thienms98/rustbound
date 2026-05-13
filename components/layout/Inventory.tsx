import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useInventory } from '@/store/inventory';
import { BackpackIcon } from 'lucide-react';
import { useState } from 'react';
import { CROPS } from '@/data/items/crops';

export function Inventory() {
  const inventory = useInventory((state) => state.items);
  console.log('🚀 ~ Inventory ~ inventory:', inventory);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button className="fixed left-30 bottom-4" onClick={() => setIsOpen((prev) => !prev)}>
        <BackpackIcon size={64} />
      </Button>

      <div
        className={cn('fixed inset-0 transition-all bg-black/20', isOpen ? 'visible' : 'invisible')}
        onClick={() => setIsOpen(false)}
      >
        <div className="bg-white p-20">
          <h2>Inventory</h2>

          <div className="flex gap-2 max-w-38">
            {inventory.map((item) => (
              <div key={item.id} className="size-12 rounded-md border relative">
                {item.name}

                {'quantity' in item && (
                  <div className="absolute text-xs right-0 bottom-0 p-px rounded-sm bg-white">x{item.quantity}</div>
                )}

                {/* <div className="">{CROPS[item.name]?.description}</div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;
