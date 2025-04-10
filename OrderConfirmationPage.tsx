import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white flex items-center justify-center py-12 px-4"
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-serif">Thank You for Your Order!</h1>
          <p className="text-gray-600">
            Your order has been successfully placed and will be processed shortly.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mt-8">
            <p className="text-sm text-gray-500 mb-2">Order confirmation sent to:</p>
            <p className="font-medium">your.email@example.com</p>
          </div>

          <Link
            to="/collection/mens"
            className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 mt-8 hover:bg-gray-800 transition-colors w-full"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}