import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Collection {
  name: string;
  images: string[];
}

const collections: Collection[] = [
  {
    name: "Women's Heritage",
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27'
    ]
  },
  {
    name: "Men's Modern Classics",
    images: [
      'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
      'https://images.unsplash.com/photo-1626497764746-6dc36546b388'
    ]
  }
];

export default function CollectionCarousel() {
  const [activeCollection, setActiveCollection] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === collections[activeCollection].images.length - 1 ? 0 : prev + 1
    );
  }, [activeCollection]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? collections[activeCollection].images.length - 1 : prev - 1
    );
  }, [activeCollection]);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextImage, 2000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, nextImage]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeCollection]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          {collections.map((collection, index) => (
            <button
              key={collection.name}
              onClick={() => setActiveCollection(index)}
              className={`px-6 py-2 font-serif text-lg transition-colors ${
                activeCollection === index
                  ? 'text-gold-600 border-b-2 border-gold-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {collection.name}
            </button>
          ))}
        </div>

        <div className="relative aspect-[16/9] max-w-5xl mx-auto">
          <div
            className="absolute inset-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`${activeCollection}-${currentImageIndex}`}
                src={collections[activeCollection].images[currentImageIndex]}
                alt={collections[activeCollection].name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={prevImage}
                className="p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all transform hover:scale-105"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all transform hover:scale-105"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {collections[activeCollection].images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index
                      ? 'bg-white w-4'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}