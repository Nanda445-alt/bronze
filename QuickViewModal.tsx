import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types/product';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:text-gold-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-serif mb-2">{product.name}</h2>
            <p className="text-xl text-gray-800 mb-4">₹{product.price}</p>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Available Sizes</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-3 py-1 border border-gray-200 hover:border-gray-300"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {product.isLimitedEdition && (
              <p className="text-gold-600 font-serif mb-4">Limited Edition</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}