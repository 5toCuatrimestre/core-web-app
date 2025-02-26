export const products = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    description:
      "Hamburguesa con carne de res, lechuga, tomate, queso y pan artesanal.",
    price: 8.99,
    status: "activo",
    createdAt: "2024-02-02T10:30:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 3, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 4, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 5, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 6, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" }
    ],
    categories: [
      { id: 1, name: "Comida" },
      { id: 2, name: "Carne" },
    ],
  },
  {
    id: 2,
    name: "Pizza Margarita",
    description:
      "Pizza con base de salsa de tomate, mozzarella fresca y albahaca.",
    price: 12.99,
    status: "activo",
    createdAt: "2024-02-01T14:45:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 3, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 3, name: "Comida" },
      { id: 4, name: "Pizzas" },
    ],
  },
  {
    id: 3,
    name: "Tacos al Pastor",
    description:
      "Tacos de cerdo marinados con piña, cilantro, cebolla y salsa.",
    price: 7.5,
    status: "activo",
    createdAt: "2024-01-28T09:00:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 5, name: "Comida" },
      { id: 6, name: "Carne" },
    ],
  },
  {
    id: 4,
    name: "Ensalada César",
    description:
      "Lechuga romana, crutones, queso parmesano y aderezo César casero.",
    price: 9.5,
    status: "inactivo",
    createdAt: "2024-01-25T18:20:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 7, name: "Comida" },
      { id: 8, name: "Vegetariano" },
    ],
  },
  {
    id: 5,
    name: "Sushi Roll Philadelphia",
    description:
      "Roll con salmón, queso crema y aguacate, cubierto con ajonjolí.",
    price: 11.99,
    status: "activo",
    createdAt: "2024-01-20T16:10:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
      },
    ],
    categories: [
      { id: 9, name: "Cena" },
      { id: 10, name: "Sushi" },
    ],
  },
  {
    id: 6,
    name: "Lasagna Bolognesa",
    description:
      "Capas de pasta con salsa bolognesa, bechamel y queso gratinado.",
    price: 13.99,
    status: "activo",
    createdAt: "2024-01-15T11:55:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 11, name: "Cena" },
      { id: 12, name: "Carne" },
    ],
  },
  {
    id: 7,
    name: "Hot Dog Clásico",
    description: "Pan suave con salchicha de res, cebolla, mostaza y ketchup.",
    price: 5.99,
    status: "inactivo",
    createdAt: "2024-01-10T08:40:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 13, name: "Comida" },
      { id: 14, name: "Menú Infantil" },
    ],
  },
  {
    id: 8,
    name: "Papas Fritas",
    description: "Papas fritas crujientes servidas con salsa de queso cheddar.",
    price: 4.99,
    status: "activo",
    createdAt: "2024-01-05T13:25:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 15, name: "Comida" },
      { id: 16, name: "Menú Infantil" },
    ],
  },
  {
    id: 9,
    name: "Pollo a la Parrilla",
    description:
      "Pechuga de pollo a la parrilla con guarnición de vegetales al vapor.",
    price: 14.5,
    status: "activo",
    createdAt: "2023-12-30T20:15:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 17, name: "Cena" },
      { id: 12, name: "Carne" },
    ],
  },
  {
    id: 10,
    name: "Tarta de Chocolate",
    description: "Postre de chocolate con base de galleta y crema batida.",
    price: 6.99,
    status: "activo",
    createdAt: "2023-12-20T07:35:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 18, name: "Cena" },
      { id: 19, name: "Postre" },
    ],
  },
  {
    id: 11,
    name: "Flan de Caramelo",
    description: "Flan casero con caramelo líquido y textura suave.",
    price: 5.5,
    status: "activo",
    createdAt: "2023-12-15T10:45:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 18, name: "Cena" },
      { id: 19, name: "Postre" },
    ],
  },
  {
    id: 12,
    name: "Helado de Vainilla",
    description: "Helado cremoso de vainilla natural con chispas de chocolate.",
    price: 4.5,
    status: "inactivo",
    createdAt: "2023-12-10T14:20:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 18, name: "Cena" },
      { id: 19, name: "Postre" },
    ],
  },
  {
    id: 13,
    name: "Café Espresso",
    description: "Café espresso fuerte, preparado con granos 100% arábica.",
    price: 2.99,
    status: "activo",
    createdAt: "2023-12-05T08:10:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 20, name: "Desayuno" },
      { id: 21, name: "Bebida" },
    ],
  },
  {
    id: 14,
    name: "Jugo de Naranja Natural",
    description: "Jugo de naranja recién exprimido, sin azúcar añadida.",
    price: 3.99,
    status: "activo",
    createdAt: "2023-12-02T09:00:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 20, name: "Desayuno" },
      { id: 21, name: "Bebida" },
    ],
  },
  {
    id: 15,
    name: "Limonada Casera",
    description: "Bebida refrescante con jugo de limón natural y menta.",
    price: 3.5,
    status: "activo",
    createdAt: "2023-12-01T11:30:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 20, name: "Desayuno" },
      { id: 21, name: "Bebida" },
    ],
  },
  {
    id: 16,
    name: "Margarita Clásica",
    description: "Cóctel con tequila, jugo de limón y licor de naranja.",
    price: 7.99,
    status: "activo",
    createdAt: "2023-11-28T20:15:00",
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
      },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 22, name: "Cena" },
      { id: 23, name: "Bebida" },
    ],
  },
  {
    id: 17,
    name: "Mojito",
    description: "Bebida cubana con ron, hierbabuena, lima y soda.",
    price: 8.5,
    status: "activo",
    createdAt: "2023-11-25T17:45:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 22, name: "Cena" },
      { id: 23, name: "Bebida" },
    ],
  },
  {
    id: 18,
    name: "Cerveza Artesanal IPA",
    description: "Cerveza artesanal con notas cítricas y amargor equilibrado.",
    price: 6.5,
    status: "activo",
    createdAt: "2023-11-20T19:30:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 22, name: "Cena" },
      { id: 23, name: "Bebida" },
    ],
  },
  {
    id: 19,
    name: "Vino Tinto Cabernet Sauvignon",
    description: "Vino tinto con notas frutales y taninos equilibrados.",
    price: 15.99,
    status: "activo",
    createdAt: "2023-11-15T22:10:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
      },
    ],
    categories: [
      { id: 22, name: "Cena" },
      { id: 23, name: "Bebida" },
    ],
  },
  {
    id: 20,
    name: "Agua Mineral",
    description: "Botella de agua mineral natural sin gas.",
    price: 1.99,
    status: "activo",
    createdAt: "2023-11-10T12:00:00",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
      { id: 2, url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    ],
    categories: [
      { id: 20, name: "Desayuno" },
      { id: 21, name: "Bebida" },
    ],
  },
];
