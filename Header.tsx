import React, { useState, useEffect, useCallback } from 'react';
import { Search, ShoppingBag, User, Heart, Package, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import LoginModal from './auth/LoginModal';
import ProfileDropdown from './auth/ProfileDropdown';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToCollections = (e: React.MouseEvent) => {
    e.preventDefault();
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#collections');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <Link 
                to="/collection/womens" 
                className="text-sm font-serif hover:text-burgundy-600 transition-colors"
              >
                Women
              </Link>
              <Link 
                to="/collection/mens" 
                className="text-sm font-serif hover:text-burgundy-600 transition-colors"
              >
                Men
              </Link>
              {location.pathname === '/' && (
                <a 
                  href="#collections" 
                  onClick={scrollToCollections}
                  className="text-sm font-serif hover:text-burgundy-600 transition-colors"
                >
                  Collections
                </a>
              )}
            </div>

            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-serif font-bold tracking-wider"
              aria-label="BRONZE Home"
            >
              BRONZE
            </Link>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-burgundy-600 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/wishlist" 
                    className="hover:text-burgundy-600 transition-colors hidden sm:block"
                    aria-label="Wishlist"
                  >
                    <Heart className="h-5 w-5" />
                  </Link>
                  <Link 
                    to="/orders" 
                    className="hover:text-burgundy-600 transition-colors hidden sm:block"
                    aria-label="Orders"
                  >
                    <Package className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="hover:text-burgundy-600 transition-colors"
                    aria-label="Profile"
                  >
                    <User className="h-5 w-5" />
                  </button>
                  <ProfileDropdown
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    username={user?.firstName || 'User'}
                  />
                </>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="text-sm font-serif hover:text-burgundy-600 hidden sm:block"
                >
                  LOG IN
                </button>
              )}
              
              <Link 
                to="/cart" 
                className="hover:text-burgundy-600 transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
          } overflow-hidden bg-white shadow-lg`}
        >
          <div className="px-4 py-2 space-y-4">
            <Link 
              to="/collection/womens" 
              className="block py-2 text-sm font-serif hover:text-burgundy-600"
            >
              Women
            </Link>
            <Link 
              to="/collection/mens" 
              className="block py-2 text-sm font-serif hover:text-burgundy-600"
            >
              Men
            </Link>
            {location.pathname === '/' && (
              <a 
                href="#collections" 
                onClick={scrollToCollections}
                className="block py-2 text-sm font-serif hover:text-burgundy-600"
              >
                Collections
              </a>
            )}
            {isAuthenticated && (
              <>
                <Link 
                  to="/wishlist" 
                  className="block py-2 text-sm font-serif hover:text-burgundy-600"
                >
                  Wishlist
                </Link>
                <Link 
                  to="/orders" 
                  className="block py-2 text-sm font-serif hover:text-burgundy-600"
                >
                  Orders
                </Link>
              </>
            )}
          </div>
        </div>

        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>
      
      <div className="h-20" />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}