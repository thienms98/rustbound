import { CROP } from '@/components/objects/Crop';
import { create } from 'zustand';

interface InventoryItem {
  order: number;
}

interface InventoryCrop extends InventoryItem {
  type: CROP;
}

type InventorySlot = InventoryCrop;

interface StorageStore {
  inventory: InventorySlot[];
}

const useInventory = create<StorageStore>((set) => ({
  inventory: [],
}));
