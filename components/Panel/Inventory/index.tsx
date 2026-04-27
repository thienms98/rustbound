import { useInventory } from '@/store';
import { v4 } from 'uuid';
import { HTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';
import InventoryItem from './InventoryItem';

const Inventory = (props: HTMLAttributes<HTMLDivElement>) => {
  const items = useInventory((state) => state.items);
  const [dragItem, setDragItem] = useState<number>();
  const [selectedItem, setSelectedItem] = useState<string>();

  return (
    <div {...props} className={cn('size-fit gap-4 bg-white/50 backdrop-blur-2xl p-2 rounded-lg text-black text-sm grid grid-cols-5 select-none', props.className)}>
      {items.map((item, idx) => {
        return <InventoryItem key={item?.id || v4()} item={item} order={idx} state={{ dragItem, setDragItem, selectedItem, setSelectedItem }} />;
      })}
    </div>
  );
};

export default Inventory;
