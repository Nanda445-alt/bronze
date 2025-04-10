import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
  viewMode: 'compact' | 'grid' | 'large';
}

export default function ProductGrid({ products, viewMode }: ProductGridProps) {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getGridClass = () => {
    switch (viewMode) {
      case 'compact':
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6';
      case 'grid':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';
      case 'large':
        return 'grid-cols-1 gap-12';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode}
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
        className={`grid ${getGridClass()}`}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={item}
            onClick={() => navigate(`/product/${product.id}`)}
            className={`cursor-pointer group ${
              viewMode === 'large' ? 'flex gap-8' : ''
            }`}
          >
            <div className={viewMode === 'large' ? 'w-1/2' : 'w-full'}>
              <div className={`relative overflow-hidden bg-gray-50 ${
                viewMode === 'compact' ? 'aspect-[3/4]' : 'aspect-[4/5]'
              }`}>
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                />
                {product.isLimitedEdition && (
                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs font-serif">
                    Limited Edition
                  </div>
                )}
              </div>
            </div>
            
            <div className={`${
              viewMode === 'large' 
                ? 'w-1/2 flex flex-col justify-center' 
                : viewMode === 'compact' 
                  ? 'mt-2' 
                  : 'mt-4'
            }`}>
              <h3 className={`font-serif ${
                viewMode === 'compact' ? 'text-sm' : 'text-lg'
              } mb-1`}>
                {product.name}
              </h3>
              <p className={`text-gray-600 ${
                viewMode === 'compact' ? 'text-sm' : ''
              }`}>
                ₹{product.price.toLocaleString()}
              </p>
              
              {viewMode !== 'compact' && (
                <>
                  {viewMode === 'large' && (
                    <p className="text-gray-500 mt-4 mb-6">{product.description}</p>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-1 border border-gray-200 text-xs"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}