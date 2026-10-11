export const times = {
  open: '16:00',
  close: '23:00',
}

export const storeInfo = {
  name: 'Cardápio Digital',
  tagline: 'Os melhores hambúrgueres e batatas da cidade!',
  phone: '5511999999999',
  deliveryFee: 5.5,
  address: 'Rua dos Cardápios, 111',
  logo: '',
  cover: '/logo.svg',
  hours: { open: '16:00', close: '23:00' },
  payments: ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro'],
  troco: '',
};

export const HeaderCard = [
  { id: 1, name: 'Entrega', tagline: 'Em sua região.' },
  { id: 2, name: 'Retirada', tagline: 'No balcão.' },
  { id: 3, name: 'Pedido mínimo', tagline: 'R$ 25,00' },
];

export const categories = [
  { id: 'hamburgueres', name: 'Hambúrgueres' },
  { id: 'aperitivos', name: 'Aperitivos' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'sobremesas', name: 'Sobremesas' },
  { id: 'combos', name: 'Combos' },
];

export const products = [
  {
    id: 1,
    category: 'hamburgueres',
    name: 'X-Bacon',
    description: 'Pão, hambúrguer, bacon crocante, queijo e molho especial.',
    price: 26.9,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    featured: true,
    },
  {
    id: 2,
    category: 'hamburgueres',
    name: 'Duplo Smash',
    description: 'Dois hambúrgueres, queijo cheddar, cebola roxa e molho da casa.',
    price: 31.5,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    category: 'aperitivos',
    name: 'Batata Frita',
    description: 'Porção crocante com sal grosso e molho aioli.',
    price: 18.0,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    category: 'aperitivos',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados e fritos.',
    price: 19.5,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    category: 'bebidas',
    name: 'Refrigerante Lata',
    description: 'Escolha entre cola, limão, guaraná e uva.',
    price: 7.5,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f2b7420e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    category: 'bebidas',
    name: 'Água Mineral',
    description: '500 ml, gelada e natural.',
    price: 5.0,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    category: 'sobremesas',
    name: 'Milkshake',
    description: 'Sabores de chocolate, morango e baunilha.',
    price: 16.0,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80',
    featured: true,
    },
  {
    id: 8,
    category: 'sobremesas',
    name: 'Brownie',
    description: 'Brownie de chocolate com cobertura cremosa.',
    price: 12.0,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 9,
    category: 'combos',
    name: 'Combo Família',
    description: 'Dois hambúrgueres, batata frita grande e 4 refrigerantes.',
    price: 50.9,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    featured: true,
    },
  {
    id: 10,
    category: 'combos',
    name: 'Combo Casal',
    description: 'Dois hambúrgueres, batata frita média e 2 refrigerantes.',
    price: 44.9,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 11,
    category: 'combos',
    name: 'Combo individual',
    description: 'Um hambúrguer, batata frita pequena e 1 refrigerante.',
    price: 38.9,
    ingredients: ["Espresso", "Leite vaporizado"],
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  },
];
