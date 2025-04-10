import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid, LayoutGrid, List } from 'lucide-react';
import { mensProducts } from '../data/mensProducts';
import { womensProducts } from '../data/womensProducts';
import ProductGrid from '../components/products/ProductGrid';

type ViewMode = 'compact' | 'grid' | 'large';
type SortOption = 'newest' | 'price-high' | 'price-low';

export default function CollectionPage() {
  const { gender } = useParams();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  
  if (!gender || !['mens', 'womens'].includes(gender)) {
    return <Navigate to="/" replace />;
  }

  const allProducts = gender === 'mens' ? mensProducts : womensProducts;

  // Sort products
  const sortedProducts = [...allProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Collection Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-serif mb-4 capitalize"
          >
            {gender === 'mens' ? "Men's" : "Women's"} Collection
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-24 h-0.5 bg-black mx-auto"
          />
        </div>

        {/* Sort and View Options */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 flex flex-wrap items-center justify-between gap-4"
        >
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-200 p-2 rounded-none bg-white font-serif text-sm focus:outline-none focus:border-black"
          >
            <option value="newest">Newest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('compact')}
              className={`p-2 transition-colors ${
                viewMode === 'compact' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label="Compact view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('large')}
              className={`p-2 transition-colors ${
                viewMode === 'large' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label="Large view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Product Grid */}
        <ProductGrid products={sortedProducts} viewMode={viewMode} />
      </div>
    </motion.div>
  );
}