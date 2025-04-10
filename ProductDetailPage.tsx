import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { mensProducts } from '../data/mensProducts';
import { womensProducts } from '../data/womensProducts';
import toast from 'react-hot-toast';
import SizeGuideModal from '../components/products/SizeGuideModal';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { addToCart } = useCart();

  const product = [...mensProducts, ...womensProducts].find(p => p.id === id);
  const gender = product?.category.toLowerCase().includes('men') ? 'mens' : 'womens';

  const productImages = product ? [
    product.image,
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35',
    'https://images.unsplash.com/photo-1614252369475-531eba835eb1',
    'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176',
    'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4'
  ] : [];

  useEffect(() => {
    if (!product) {
      navigate('/404');
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    setIsLoading(true);
    try {
      await addToCart(product, selectedSize);
      toast.success('Added to cart successfully');
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Mobile Image Gallery */}
          <div className="md:hidden w-full">
            <div className="relative aspect-square mb-4">
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={previousImage}
                  className="p-2 bg-white rounded-full shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 bg-white rounded-full shadow-lg"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {productImages.length}
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 ${
                    currentImageIndex === index ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Thumbnail Navigation */}
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-24 flex flex-col items-center gap-4">
              <button
                onClick={previousImage}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-20 relative ${
                      currentImageIndex === index ? 'ring-2 ring-black' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={nextImage}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Image - Desktop */}
          <div className="hidden md:block md:col-span-6">
            <div className="relative h-[600px]">
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={previousImage}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {productImages.length}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <div className="mb-8">
                <h1 className="text-2xl font-serif mb-2">{product.name}</h1>
                <p className="text-xl font-medium">₹{product.price.toLocaleString()}</p>
                <p className="text-gray-600 mt-4">{product.description}</p>
              </div>

              <div className="mb-8">
                <p className="text-sm mb-2">BLACK | {product.id}</p>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-medium">SELECT SIZE</p>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs underline hover:text-gray-600"
                  >
                    SIZE GUIDE
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || isLoading}
                className="w-full bg-black text-white py-4 mb-4 hover:bg-gray-900 disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Adding...' : 'ADD TO CART'}
              </button>

              {/* Product Details */}
              <div className="space-y-4 text-sm">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-4 border-t border-gray-200">
                    <span>COMPOSITION, CARE & ORIGIN</span>
                    <ChevronRight className="h-4 w-4 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="py-4">
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">COMPOSITION</h4>
                      <p className="text-gray-600">
                        OUTER SHELL<br />
                        70% lyocell<br />
                        30% wool
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">CARE</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>Machine wash at max. 30ºC/86ºF with short spin cycle</li>
                        <li>Do not use bleach</li>
                        <li>Iron at max 110ºC/230ºF</li>
                        <li>Do not dry clean</li>
                        <li>Do not tumble dry</li>
                      </ul>
                    </div>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer py-4 border-t border-gray-200">
                    <span>SHIPPING, EXCHANGES AND RETURNS</span>
                    <ChevronRight className="h-4 w-4 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="py-4">
                    <p className="text-gray-600">
                      Free standard shipping on orders over ₹2999.<br />
                      Easy returns within 30 days.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={gender as 'mens' | 'womens'}
      />
    </div>
  );
}