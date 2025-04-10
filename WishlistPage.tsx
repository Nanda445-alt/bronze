import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { state, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (productId: string) => {
    const product = state.items.find(item => item.id === productId);
    if (!product) return;

    try {
      await addToCart(product, product.sizes[0]);
      removeFromWishlist(productId);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-gray-300" />
          <h1 className="text-3xl font-serif mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">
            Save your favorite items to keep track of what you love.
          </p>
          <Link
            to="/collection/mens"
            className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-serif mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {state.items.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group"
            >
              <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                >
                  <Heart className="h-5 w-5 fill-current text-red-500" />
                </button>
              </div>

              <h3 className="font-serif text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">₹{product.price.toLocaleString()}</p>

              <button
                onClick={() => handleAddToCart(product.id)}
                className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}