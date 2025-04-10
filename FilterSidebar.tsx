import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Filters } from '../../types/filters';

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  activeCategory: 'topwear' | 'bottomwear';
  onCategoryChange: (category: 'topwear' | 'bottomwear') => void;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  activeCategory,
  onCategoryChange
}: FilterSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-64 bg-white p-6 space-y-8"
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-gray-600 hover:text-gold-600 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-serif">Back to Home</span>
      </Link>

      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-xl mb-4">Categories</h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange('topwear')}
              className={`w-full text-left py-2 px-3 rounded transition-colors ${
                activeCategory === 'topwear'
                  ? 'bg-gold-50 text-gold-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              Topwear
            </button>
            <button
              onClick={() => onCategoryChange('bottomwear')}
              className={`w-full text-left py-2 px-3 rounded transition-colors ${
                activeCategory === 'bottomwear'
                  ? 'bg-gold-50 text-gold-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              Bottomwear
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                onClick={() => {
                  const newSizes = filters.sizes.includes(size)
                    ? filters.sizes.filter((s) => s !== size)
                    : [...filters.sizes, size];
                  onFilterChange({ ...filters, sizes: newSizes });
                }}
                className={`px-3 py-1 border rounded ${
                  filters.sizes.includes(size)
                    ? 'border-gold-600 text-gold-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {['Black', 'White', 'Navy', 'Green', 'Beige'].map((color) => (
              <button
                key={color}
                onClick={() => {
                  const newColors = filters.colors.includes(color)
                    ? filters.colors.filter((c) => c !== color)
                    : [...filters.colors, color];
                  onFilterChange({ ...filters, colors: newColors });
                }}
                className={`px-3 py-1 border rounded ${
                  filters.colors.includes(color)
                    ? 'border-gold-600 text-gold-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}