import { Product } from '../types/product';
import { mensProducts } from '../data/mensProducts';
import { womensProducts } from '../data/womensProducts';
import { premiumProducts } from '../data/premiumMensProducts';

const allProducts = [...mensProducts, ...womensProducts, ...premiumProducts];

export async function searchProducts(query: string): Promise<Product[]> {
  // Normalize the search query
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return [];

  // Search through all products
  return allProducts.filter(product => {
    const searchableText = [
      product.name,
      product.description,
      product.category,
      product.color
    ].join(' ').toLowerCase();

    return searchableText.includes(searchTerm);
  });
}