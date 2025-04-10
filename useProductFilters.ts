import { useState, useMemo } from 'react';
import { Product } from '../types/product';
import { Filters, SortOption } from '../types/filters';

const initialFilters: Filters = {
  priceRange: [],
  colors: [],
  sizes: [],
  categories: []
};

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (filters.priceRange.length > 0) {
      result = result.filter((product) =>
        filters.priceRange.some(
          (range) => product.price >= range.min && product.price <= range.max
        )
      );
    }

    if (filters.colors.length > 0) {
      result = result.filter((product) =>
        filters.colors.includes(product.color)
      );
    }

    if (filters.sizes.length > 0) {
      result = result.filter((product) =>
        product.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'priceHighToLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'priceLowToHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'popularity':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return result;
  }, [products, filters, sortOption]);

  return {
    filteredProducts,
    filters,
    sortOption,
    updateFilters: setFilters,
    updateSort: setSortOption
  };
}