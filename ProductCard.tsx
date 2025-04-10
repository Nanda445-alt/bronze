import React, { useState } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types/product';
import QuickViewModal from './QuickViewModal';
import { useCart } from '../../contexts/CartContext';
import LazyImage from '../LazyImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSize) return;
    
    setIsLoading(true);
    try {
      await addToCart(product, selectedSize);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <div className="group relative">
      <div className="relative aspect-square overflow-hidden bg-pearl-100">
        <LazyImage
          src={product.image}
          alt={product.name}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
        {product.isLimitedEdition && (
          <div className="absolute top-2 right-2 bg-burgundy-600 text-white px-3 py-1 text-sm font-serif">
            Limited Edition
          </div>
        )}
        <button
          onClick={handleQuickView}
          className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Quick view"
        >
          <Eye className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-serif text-slate-800">{product.name}</h3>
        <p className="text-slate-600">₹{product.price.toLocaleString()}</p>
        
        <div className="mt-2 flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(size);
              }}
              className={`px-2 py-1 border ${
                selectedSize === size
                  ? 'border-burgundy-600 text-burgundy-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || isLoading}
          className={`mt-4 w-full bg-slate-900 text-white py-2 px-4 flex items-center justify-center gap-2 hover:bg-burgundy-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors ${
            isLoading ? 'opacity-75 cursor-wait' : ''
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
}