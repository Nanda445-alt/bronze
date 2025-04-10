import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Lazy loaded components
const HomePage = React.lazy(() => import('../pages/HomePage'));
const CollectionPage = React.lazy(() => import('../pages/CollectionPage'));
const ProductDetailPage = React.lazy(() => import('../pages/ProductDetailPage'));
const CartPage = React.lazy(() => import('../pages/CartPage'));
const CheckoutPage = React.lazy(() => import('../pages/CheckoutPage'));
const OrderConfirmationPage = React.lazy(() => import('../pages/OrderConfirmationPage'));
const WishlistPage = React.lazy(() => import('../pages/WishlistPage'));
const OrdersPage = React.lazy(() => import('../pages/OrdersPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* Collection & Product Routes */}
      <Route path="/collection/:gender" element={<CollectionPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      
      {/* User Account Routes */}
      <Route 
        path="/wishlist" 
        element={
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Cart & Checkout Routes */}
      <Route path="/cart" element={<CartPage />} />
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/order-confirmation" 
        element={
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        } 
      />

      {/* Legacy Route Redirects */}
      <Route path="/mens" element={<Navigate to="/collection/mens" replace />} />
      <Route path="/womens" element={<Navigate to="/collection/womens" replace />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}