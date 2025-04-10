import React from 'react';

interface CollectionCardProps {
  title: string;
  image: string;
  category: string;
  description: string;
}

export default function CollectionCard({ title, image, category, description }: CollectionCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden mb-6">
        <img
          src={image}
          alt={title}
          className="w-full aspect-[4/5] object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      </div>
      <div className="text-center">
        <p className="text-sm text-gold-600 mb-2 tracking-wider">{category}</p>
        <h3 className="text-2xl font-serif mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button className="mt-4 border-b-2 border-gold-600 text-sm font-serif pb-1 hover:border-gold-800 transition-colors">
          Explore Collection
        </button>
      </div>
    </div>
  );
}