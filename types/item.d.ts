export interface BaseItem {
  id: string;
  name: string;
  qty: number;
  asset: string;
  price: number;
  sellPrice: number;
  currency: 'coin';
}

export interface ShopItem extends BaseItem {
  stock: number;
  restockedAt: Date;
  restockTime: number;
}
