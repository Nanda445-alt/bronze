import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mensProducts } from '../../data/mensProducts';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategoryFilter({ 
  selectedCategories, 
  onCategoryChange,
}: CategoryFilterProps) {
  const navigate = useNavigate();
  const productsByCategory = mensProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = new Set();
    }
    acc[product.category].add(product.name);
    return acc;
  }, {} as Record<string, Set<string>>);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-64 bg-white p-6 space-y-8"
    >
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gold-600 transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-serif">Back to Home</span>
      </button>

      <div className="space-y-8">
        {/* Topwear Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="font-serif text-xl mb-4 text-gray-800">Topwear</h3>
          <div className="space-y-2">
            {Array.from(productsByCategory['Topwear'] || []).map((item, index) => (
              <motion.label 
                key={item} 
                className="flex items-center cursor-pointer group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(item)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...selectedCategories, item]
                      : selectedCategories.filter(cat => cat !== item);
                    onCategoryChange(newCategories);
                  }}
                  className="hidden"
                />
                <span className={`text-sm py-1 transition-colors ${
                  selectedCategories.includes(item)
                    ? 'text-gold-600'
                    : 'text-gray-600 group-hover:text-gray-800'
                }`}>
                  {item}
                </span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Bottomwear Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-serif text-xl mb-4 text-gray-800">Bottomwear</h3>
          <div className="space-y-2">
            {Array.from(productsByCategory['Bottomwear'] || []).map((item, index) => (
              <motion.label 
                key={item} 
                className="flex items-center cursor-pointer group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(item)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...selectedCategories, item]
                      : selectedCategories.filter(cat => cat !== item);
                    onCategoryChange(newCategories);
                  }}
                  className="hidden"
                />
                <span className={`text-sm py-1 transition-colors ${
                  selectedCategories.includes(item)
                    ? 'text-gold-600'
                    : 'text-gray-600 group-hover:text-gray-800'
                }`}>
                  {item}
                </span>
              </motion.label>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}