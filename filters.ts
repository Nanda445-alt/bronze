export interface PriceRange {
  min: number;
  max: number;
  label: string;
}

export interface Filters {
  priceRange: PriceRange[];
  colors: string[];
  sizes: string[];
  categories: string[];
}

export type SortOption = 'newest' | 'priceHighToLow' | 'priceLowToHigh' | 'popularity';