export const recipes = [
  // =========================
  // PROCESSING
  // =========================

  {
    id: 'flour',
    name: 'Flour',
    quantity: 2,
    ingredients: [
      {
        id: 'wheat',
        name: 'Wheat',
        quantity: 4,
      },
    ],
    duration: 60000,
  },

  {
    id: 'bread',
    name: 'Bread',
    quantity: 1,
    ingredients: [
      {
        id: 'flour',
        name: 'Flour',
        quantity: 2,
      },
    ],
    duration: 90000,
  },

  // =========================
  // SIMPLE COOKING
  // =========================

  {
    id: 'baked_potato',
    name: 'Baked Potato',
    quantity: 1,
    ingredients: [
      {
        id: 'potato',
        name: 'Potato',
        quantity: 2,
      },
    ],
    duration: 45000,
  },

  {
    id: 'vegetable_soup',
    name: 'Vegetable Soup',
    quantity: 1,
    ingredients: [
      {
        id: 'carrot',
        name: 'Carrot',
        quantity: 2,
      },
      {
        id: 'potato',
        name: 'Potato',
        quantity: 2,
      },
      {
        id: 'tomato',
        name: 'Tomato',
        quantity: 1,
      },
    ],
    duration: 120000,
  },

  {
    id: 'tomato_soup',
    name: 'Tomato Soup',
    quantity: 1,
    ingredients: [
      {
        id: 'tomato',
        name: 'Tomato',
        quantity: 4,
      },
    ],
    duration: 90000,
  },

  {
    id: 'salad',
    name: 'Fresh Salad',
    quantity: 1,
    ingredients: [
      {
        id: 'tomato',
        name: 'Tomato',
        quantity: 2,
      },
      {
        id: 'carrot',
        name: 'Carrot',
        quantity: 1,
      },
    ],
    duration: 30000,
  },

  // =========================
  // ADVANCED FOOD
  // =========================

  {
    id: 'sandwich',
    name: 'Sandwich',
    quantity: 1,
    ingredients: [
      {
        id: 'bread',
        name: 'Bread',
        quantity: 2,
      },
      {
        id: 'tomato',
        name: 'Tomato',
        quantity: 1,
      },
    ],
    duration: 60000,
  },

  {
    id: 'veggie_stew',
    name: 'Veggie Stew',
    quantity: 2,
    ingredients: [
      {
        id: 'potato',
        name: 'Potato',
        quantity: 3,
      },
      {
        id: 'carrot',
        name: 'Carrot',
        quantity: 2,
      },
      {
        id: 'tomato',
        name: 'Tomato',
        quantity: 2,
      },
    ],
    duration: 180000,
  },

  {
    id: 'pasta',
    name: 'Pasta',
    quantity: 1,
    ingredients: [
      {
        id: 'flour',
        name: 'Flour',
        quantity: 3,
      },
      {
        id: 'tomato',
        name: 'Tomato',
        quantity: 2,
      },
    ],
    duration: 150000,
  },

  // =========================
  // FARM VALUE GOODS
  // =========================

  {
    id: 'seed_mix',
    name: 'Seed Mix',
    quantity: 3,
    ingredients: [
      {
        id: 'wheat',
        name: 'Wheat',
        quantity: 2,
      },
      {
        id: 'carrot',
        name: 'Carrot',
        quantity: 1,
      },
    ],
    duration: 20000,
  },

  {
    id: 'animal_feed',
    name: 'Animal Feed',
    quantity: 2,
    ingredients: [
      {
        id: 'wheat',
        name: 'Wheat',
        quantity: 3,
      },
      {
        id: 'carrot',
        name: 'Carrot',
        quantity: 1,
      },
    ],
    duration: 40000,
  },
];
