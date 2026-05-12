export const categories = ['Todos', 'Hamburguesas', 'Combos', 'Bebidas', 'Extras'];

export const products = [
  {
    id: 1,
    category: 'Hamburguesas',
    name: 'Doble Mordida',
    description: 'Doble smash burger, cheddar fundido, pepinillos y salsa mordida.',
    price: 24.9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    category: 'Hamburguesas',
    name: 'Lechuga Crunch',
    description: 'Carne jugosa, aros crocantes, tomate, lechuga y mayo mostaza.',
    price: 21.9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    category: 'Hamburguesas',
    name: 'Fuego BBQ',
    description: 'Tocino, cebolla grillada, BBQ ahumada y queso americano.',
    price: 23.5,
    featured: false,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    category: 'Combos',
    name: 'Combo Mordida Max',
    description: 'Doble Mordida, papas rusticas y bebida helada.',
    price: 32.9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    category: 'Combos',
    name: 'Combo Pareja',
    description: 'Dos hamburguesas clasicas, dos bebidas y papas para compartir.',
    price: 49.9,
    featured: false,
    image: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    category: 'Bebidas',
    name: 'Limonada Verde',
    description: 'Limonada fresca con hierbabuena y hielo.',
    price: 8.9,
    featured: false,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    category: 'Bebidas',
    name: 'Soda Artesanal',
    description: 'Burbujeante, fria y perfecta para cortar el picante.',
    price: 7.5,
    featured: false,
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    category: 'Extras',
    name: 'Papas Mordida',
    description: 'Papas doradas con paprika, queso y salsa secreta.',
    price: 12.9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80'
  }
];

export const orderStates = [
  'PENDIENTE',
  'CONFIRMADO',
  'EN_PREPARACION',
  'LISTO_PARA_ENVIO',
  'EN_CAMINO',
  'ENTREGADO',
  'CANCELADO'
];

export const sampleOrders = [
  { id: 1024, customer: 'Cliente Mordida', total: 34.02, status: 'EN_CAMINO', address: 'Av. Primavera 245', rider: 'Rayo Rider' },
  { id: 1023, customer: 'Lucia Torres', total: 49.9, status: 'EN_PREPARACION', address: 'Calle Burger 808', rider: 'Sin asignar' },
  { id: 1022, customer: 'Mateo Ruiz', total: 24.9, status: 'PENDIENTE', address: 'Jr. Mostaza 120', rider: 'Sin asignar' }
];

export const coupons = [
  { code: 'MORDIDA10', description: '10% primer pedido', active: true, discount: 10 },
  { code: 'COMBO15', description: '15% combos', active: true, discount: 15 },
  { code: 'FREEDRINK', description: 'Bebida demo', active: false, discount: 5 }
];
