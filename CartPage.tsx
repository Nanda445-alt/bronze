import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { state, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = async (id: string, size: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(id, size, newQuantity);
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = (id: string, size: string) => {
    removeFromCart(id, size);
    toast.success('Item removed from cart');
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to proceed to checkout');
      return;
    }
    navigate('/checkout');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif mb-6">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Discover our latest collections and add your favorite pieces.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
          >
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-serif mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {state.items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex gap-6 pb-6 border-b border-gray-200"
                >
                  <div className="w-24 h-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-serif mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">Size: {item.selectedSize}</p>
                        <p className="font-medium">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-600">
                        Total: ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6">
              <h2 className="text-xl font-serif mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Log in to Checkout'}
              </button>
              <Link
                to="/"
                className="block text-center mt-4 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}