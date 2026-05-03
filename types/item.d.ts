import { GeneralType } from '@/lib/resource';

export interface BaseItem {
  id: string;
  name: string;
  type: GeneralType;
  qty: number;
  asset: string;
  price: number;
  sellPrice: number;
  currency: 'coin';
}

export interface ShopItem extends BaseItem {
  stock: number | Infinity;
  restockedAt: Date;
  restockTime: number;
}
