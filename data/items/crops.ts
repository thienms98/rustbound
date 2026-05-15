export enum ITEM_TYPES {
  PLANT = 'PLANT',
  SEED = 'SEED',
  TOOL = 'TOOL',
}

type CropType = {
  [key: string]: {
    id: string;
    name: string;
    type: ITEM_TYPES;
    description: string;
    icon: string;
    stackable: boolean;
    value?: number;
    growthTime?: number;
    durability?: number;
  };
};

export const CROPS: CropType = {
  wheat: {
    id: 'wheat',
    name: 'Lúa mì',
    type: ITEM_TYPES.PLANT,
    description: 'Nguyên liệu cơ bản để làm bánh mì.',
    icon: 'assets/icons/wheat.png',
    stackable: true,
    value: 10,
  },
  carrot: {
    id: 'carrot',
    name: 'Cà rốt',
    type: ITEM_TYPES.PLANT,
    description: 'Giàu Vitamin A, giúp thỏ và nông dân đều vui.',
    icon: 'assets/icons/carrot.png',
    stackable: true,
    value: 15,
  },
  potato: {
    id: 'potato',
    name: 'Khoai tây',
    type: ITEM_TYPES.PLANT,
    description: 'Có thể nướng, nghiền hoặc làm khoai tây chiên.',
    icon: 'assets/icons/potato.png',
    stackable: true,
    value: 12,
  },
  tomato: {
    id: 'tomato',
    name: 'Cà chua',
    type: ITEM_TYPES.PLANT,
    description: 'Mọng nước và đỏ rực dưới ánh mặt trời.',
    icon: 'assets/icons/tomato.png',
    stackable: true,
    value: 18,
  },

  // --- HẠT GIỐNG (SEEDS) ---
  WHEAT_SEED: {
    id: 'wheat_seed',
    name: 'Hạt giống lúa mì',
    type: ITEM_TYPES.SEED,
    description: 'Dùng để gieo trồng lúa mì. Cần 3 ngày để thu hoạch.',
    icon: 'assets/icons/wheat_seed.png',
    stackable: true,
    growthTime: 3, // Đơn vị: ngày/phút tùy logic game của bạn
  },
  CARROT_SEED: {
    id: 'carrot_seed',
    name: 'Hạt giống cà rốt',
    type: ITEM_TYPES.SEED,
    description: 'Hạt giống cà rốt chất lượng cao.',
    icon: 'assets/icons/carrot_seed.png',
    stackable: true,
    growthTime: 5,
  },
  POTATO_SEED: {
    id: 'potato_seed',
    name: 'Mầm khoai tây',
    type: ITEM_TYPES.SEED,
    description: 'Đừng ăn nhé, hãy đem đi trồng!',
    icon: 'assets/icons/potato_seed.png',
    stackable: true,
    growthTime: 4,
  },
  TOMATO_SEED: {
    id: 'tomato_seed',
    name: 'Hạt giống cà chua',
    type: ITEM_TYPES.SEED,
    description: 'Cần nhiều nước để nảy mầm.',
    icon: 'assets/icons/tomato_seed.png',
    stackable: true,
    growthTime: 6,
  },

  // --- CÔNG CỤ (TOOLS) ---
  SHOVEL: {
    id: 'shovel',
    name: 'Xẻng',
    type: ITEM_TYPES.TOOL,
    description: 'Dùng để đào đất hoặc dọn dẹp các cây hỏng.',
    icon: 'assets/icons/shovel.png',
    stackable: false,
    durability: 100, // Độ bền
  },
  HOE: {
    id: 'hoe',
    name: 'Cuốc',
    type: ITEM_TYPES.TOOL,
    description: 'Dùng để xới đất chuẩn bị gieo mầm.',
    icon: 'assets/icons/hoe.png',
    stackable: false,
    durability: 100,
  },
};
