import React from 'react';
import CollectionCarousel from './collections/CollectionCarousel';

export default function FeaturedCollections() {
  return (
    <section id="collections" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Featured Collections</h2>
          <div className="w-24 h-0.5 bg-gold-600 mx-auto"></div>
        </div>
        <CollectionCarousel />
      </div>
    </section>
  );
}