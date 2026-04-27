import { useInventory } from '@/store/inventory';
import InventoryItem from './InventoryItem';
import { v4 } from 'uuid';
import { HTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

const Panel = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const items = useInventory((state) => state.items);
  const [dragItem, setDragItem] = useState<number>();

  return (
    <div className={cn('w-1/2 h-auto flex gap-8 bg-amber-100 p-6 py-8 rounded-lg', className)}>
      <div className="w-auto h-auto grid grid-cols-5 gap-3">
        {items.map((item, idx) => {
          return <InventoryItem key={item?.id || v4()} {...item} order={idx} dragItem={dragItem} setDragItem={setDragItem} />;
        })}
      </div>
      <div className="flex-1 bg-amber-300 p-4 rounded-md">Description</div>
    </div>
  );
};

export default Panel;
