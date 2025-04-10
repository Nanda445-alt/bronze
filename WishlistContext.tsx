import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types/product';
import toast from 'react-hot-toast';

interface WishlistState {
  items: Product[];
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string };

const WishlistContext = createContext<{
  state: WishlistState;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
} | null>(null);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    default:
      return state;
  }
};

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] }, () => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state));
  }, [state]);

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast.success('Added to wishlist');
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      state,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}