import { Product } from '../types/product';

export const premiumProducts: Product[] = [
  {
    id: 'pm1',
    name: 'Italian Cashmere Blazer',
    price: 1295,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35',
    color: 'Navy',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Premium',
    description: 'Masterfully tailored blazer in pure Italian cashmere. Features hand-stitched details and mother-of-pearl buttons.',
    popularity: 4.9,
    createdAt: new Date('2024-02-15'),
    isLimitedEdition: true
  },
  {
    id: 'pm2',
    name: 'Merino Wool Turtleneck',
    price: 495,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1',
    color: 'Cream',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Premium',
    description: 'Luxurious fine-knit turtleneck crafted from Australian merino wool. Perfect for sophisticated layering.',
    popularity: 4.8,
    createdAt: new Date('2024-02-15'),
    isLimitedEdition: false
  },
  {
    id: 'pm3',
    name: 'Silk-Blend Evening Shirt',
    price: 395,
    image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176',
    color: 'White',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Premium',
    description: 'Elegant evening shirt in silk-cotton blend with French cuffs and mother-of-pearl buttons.',
    popularity: 4.7,
    createdAt: new Date('2024-02-15'),
    isLimitedEdition: false
  },
  {
    id: 'pm4',
    name: 'Handcrafted Leather Belt',
    price: 245,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4',
    color: 'Brown',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Premium',
    description: 'Italian full-grain leather belt with hand-polished gold buckle. Each piece uniquely patinas with age.',
    popularity: 4.8,
    createdAt: new Date('2024-02-15'),
    isLimitedEdition: true
  }
];