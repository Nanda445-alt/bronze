import { Product } from '../types/product';

export const womensProducts: Product[] = [
  // Topwear Products
  {
    id: 'w1',
    name: 'Silk Wrap Blouse',
    price: 225,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    color: 'White',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Topwear',
    description: 'Elegant silk wrap blouse with draped detail.',
    popularity: 4.8,
    createdAt: new Date('2024-02-15'),
    isLimitedEdition: false
  },
  {
    id: 'w2',
    name: 'Cashmere Sweater',
    price: 345,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    color: 'Beige',
    sizes: ['S', 'M', 'L'],
    category: 'Topwear',
    description: 'Luxurious cashmere sweater with ribbed details.',
    popularity: 4.9,
    createdAt: new Date('2024-02-10'),
    isLimitedEdition: true
  },
  {
    id: 'w3',
    name: 'Tailored Blazer',
    price: 395,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Topwear',
    description: 'Classic tailored blazer with gold buttons.',
    popularity: 4.7,
    createdAt: new Date('2024-02-01'),
    isLimitedEdition: false
  },
  {
    id: 'w4',
    name: 'Silk Evening Top',
    price: 275,
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153',
    color: 'Navy',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Topwear',
    description: 'Luxurious silk evening top with delicate detailing.',
    popularity: 4.6,
    createdAt: new Date('2024-02-05'),
    isLimitedEdition: true
  },

  // Bottomwear Products
  {
    id: 'w5',
    name: 'High-Waist Trousers',
    price: 245,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
    color: 'Navy',
    sizes: ['S', 'M', 'L'],
    category: 'Bottomwear',
    description: 'Elegant high-waist trousers with wide legs.',
    popularity: 4.6,
    createdAt: new Date('2024-02-05'),
    isLimitedEdition: false
  },
  {
    id: 'w6',
    name: 'Pleated Midi Skirt',
    price: 195,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
    color: 'Green',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Bottomwear',
    description: 'Elegant pleated midi skirt in forest green.',
    popularity: 4.5,
    createdAt: new Date('2024-02-20'),
    isLimitedEdition: false
  },
  {
    id: 'w7',
    name: 'Tailored Palazzo Pants',
    price: 285,
    image: 'https://images.unsplash.com/photo-1509551388413-e18d05a2b3da',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Bottomwear',
    description: 'Flowing palazzo pants with perfect drape.',
    popularity: 4.7,
    createdAt: new Date('2024-01-25'),
    isLimitedEdition: false
  },
  {
    id: 'w8',
    name: 'Silk Maxi Skirt',
    price: 325,
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc',
    color: 'Beige',
    sizes: ['S', 'M', 'L'],
    category: 'Bottomwear',
    description: 'Luxurious silk maxi skirt with side slit.',
    popularity: 4.8,
    createdAt: new Date('2024-01-15'),
    isLimitedEdition: true
  }
];