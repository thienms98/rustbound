import { cn } from '@/lib/utils';
import { CoinsIcon } from 'lucide-react';

const items = [
  {
    id: 'CRS',
    name: 'carrot seed',
    price: 5,
    qty: 1,
    stocks: 20,
  },
  {
    id: 'WHS',
    name: 'wheet seed',
    price: 25,
    qty: 1,
    stocks: 5,
  },
  {
    id: 'APT',
    name: 'apple tree',
    price: 100,
    qty: 1,
    stocks: 2,
  },
  {
    id: 'FER',
    name: 'fertilizer',
    price: 20,
    qty: 4,
    stocks: 10,
  },
];

const Store = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('size-fit grid grid-cols-5 p-2 rounded-lg bg-white gap-5', className)} {...props}>
      {items.map((item) => (
        <div key={item.id}>
          <div className="border border-black size-10 rounded-lg truncate relative">
            {item.id}
            <div className="absolute bottom-0.5 right-0.5 text-black font-semibold text-xs">x{item.qty}</div>
          </div>
          <div className="flex items-center justify-center">
            <CoinsIcon size={12} />
            {item.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;
