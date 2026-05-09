import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useInventory } from '@/store/inventory';

export function Inventory() {
  const inventory = useInventory((state) => state.items);
  console.log('🚀 ~ Inventory ~ inventory:', inventory);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed left-32 bottom-3">Inventory</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Inventory;
