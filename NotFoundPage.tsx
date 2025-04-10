import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-pearl-50"
    >
      <div className="text-center">
        <h1 className="text-6xl font-serif text-burgundy-600 mb-4">404</h1>
        <p className="text-2xl font-serif mb-8">Page Not Found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-burgundy-600 hover:text-burgundy-700"
        >
          <ArrowLeft className="h-5 w-5" />
          Return to Home
        </Link>
      </div>
    </motion.div>
  );
}