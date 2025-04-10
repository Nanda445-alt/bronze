import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Newsletter from './components/Newsletter';
import LoadingSpinner from './components/common/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen">
              <Header />
              <Suspense fallback={<LoadingSpinner />}>
                <AppRoutes />
              </Suspense>
              <Newsletter />
              <Toaster position="top-right" />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;