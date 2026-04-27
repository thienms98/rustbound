import { useInventory, useKeyboard } from '@/store';
import { v4 } from 'uuid';
import { HTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';
import InventoryItem from './InventoryItem';

const Inventory = (props: HTMLAttributes<HTMLDivElement>) => {
  const items = useInventory((state) => state.items);
  const keys = useKeyboard.getState().keys;
  console.log('🚀 ~ Inventory ~ keys:', keys);
  const [dragItem, setDragItem] = useState<number>();

  return (
    <div
      {...props}
      className={cn(
        'fixed top-20 left-2 gap-4 bg-white/50 backdrop-blur-2xl p-2 rounded-lg text-black text-sm grid grid-cols-5 select-none',
        keys.has('tab') || keys.has('b') ? '' : 'hidden',
        props.className,
      )}
    >
      {items.map((item, idx) => {
        return <InventoryItem key={item?.id || v4()} {...item} order={idx} dragItem={dragItem} setDragItem={setDragItem} />;
      })}
    </div>
  );
};

export default Inventory;
