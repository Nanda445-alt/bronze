import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

interface PremiumProductCardProps {
  product: Product;
}

export default function PremiumProductCard({ product }: PremiumProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    setIsLoading(true);
    try {
      await addToCart(product, selectedSize);
      toast.success('Added to cart', {
        style: {
          background: '#1B1B3A',
          color: '#fff',
          borderRadius: '8px',
        },
      });
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
        
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="text-white text-center p-6">
            <p className="font-elegant text-sm mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`px-3 py-1 text-sm border rounded transition-colors ${
                    selectedSize === size
                      ? 'border-white text-white bg-white bg-opacity-20'
                      : 'border-white border-opacity-50 hover:border-opacity-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || isLoading}
              className={`w-full bg-white text-black px-6 py-2 rounded flex items-center justify-center gap-2
                font-display tracking-wide text-sm uppercase
                transition-colors duration-300 hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed
                ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
            >
              <ShoppingBag className="h-4 w-4" />
              {isLoading ? 'Adding...' : 'Quick Add'}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="font-elegant text-xl text-black mb-2">{product.name}</h3>
        <p className="font-display text-sm tracking-wider text-black">₹{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}