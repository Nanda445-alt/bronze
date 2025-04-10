import React from 'react';
import { motion } from 'framer-motion';
import PremiumProductCard from './products/PremiumProductCard';
import { premiumProducts } from '../data/premiumMensProducts';

export default function PremiumCollection() {
  return (
    <section className="bg-[#F9F6F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-serif text-[#1B1B3A] mb-4"
          >
            Premium Collection
          </motion.h2>
          <div className="w-24 h-0.5 bg-[#C6A55C] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {premiumProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PremiumProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}