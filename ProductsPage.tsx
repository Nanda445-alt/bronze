import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mensProducts } from '../data/mensProducts';
import { womensProducts } from '../data/womensProducts';
import ProductGrid from '../components/products/ProductGrid';
import FilterSidebar from '../components/filters/FilterSidebar';
import { Filters } from '../types/filters';

export default function ProductsPage() {
  const { gender, category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [filters, setFilters] = useState<Filters>({
    priceRange: [],
    colors: [],
    sizes: [],
    categories: category ? [category] : []
  });
  const [activeCategory, setActiveCategory] = useState<'topwear' | 'bottomwear'>(
    category === 'bottomwear' ? 'bottomwear' : 'topwear'
  );

  // Get products based on gender
  const allProducts = gender === 'mens' ? mensProducts : womensProducts;

  // Filter products based on category if specified
  const products = category
    ? allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : allProducts;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-serif capitalize">
                {gender}'s {category || 'Collection'}
              </h1>
              <div className="flex items-center gap-4">
                <select
                  className="border border-gray-200 p-2 rounded"
                  onChange={(e) => setViewMode(e.target.value as 'grid' | 'large')}
                  value={viewMode}
                >
                  <option value="grid">Grid View</option>
                  <option value="large">Large View</option>
                </select>
              </div>
            </div>

            <ProductGrid products={products} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}