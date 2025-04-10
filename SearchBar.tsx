import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { searchProducts } from '../utils/search';
import { Product } from '../types/product';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedQuery) {
        setIsLoading(true);
        try {
          const searchResults = await searchProducts(debouncedQuery);
          setResults(searchResults);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    handleSearch();
  }, [debouncedQuery]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg transform transition-transform duration-300">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center border-b border-gray-200">
          <Search className={`h-5 w-5 ${isLoading ? 'text-gray-400 animate-pulse' : 'text-gray-400'}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full px-4 py-3 text-base sm:text-lg focus:outline-none"
          />
          <button
            onClick={() => {
              onClose();
              setQuery('');
            }}
            className="p-2 hover:text-gold-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {query && (
          <div className="mt-4 max-h-[60vh] sm:max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {isLoading ? 'Searching...' : 'No products found'}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center space-x-4 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-20 object-cover"
                    />
                    <div className="flex-1 text-left">
                      <h3 className="font-serif text-base sm:text-lg">{product.name}</h3>
                      <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}