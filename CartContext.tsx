import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types/product';
import toast from 'react-hot-toast';

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product, size: string, quantity?: number) => Promise<void>;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => Promise<void>;
  clearCart: () => void;
} | null>(null);

// Simulated inventory check - in production, this would call an API
const checkInventory = async (productId: string, size: string, quantity: number): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return true; // For demo purposes, always return true
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        item => item.id === product.id && item.selectedSize === size
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const newItems = state.items.map(item =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: newQuantity }
            : item
        );

        return {
          ...state,
          items: newItems,
          total: state.total + (product.price * quantity),
          itemCount: calculateItemCount(newItems)
        };
      }

      const newItems = [...state.items, { ...product, quantity, selectedSize: size }];
      return {
        ...state,
        items: newItems,
        total: state.total + (product.price * quantity),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'REMOVE_ITEM': {
      const { id, size } = action.payload;
      const item = state.items.find(item => item.id === id && item.selectedSize === size);
      if (!item) return state;

      const newItems = state.items.filter(
        item => !(item.id === id && item.selectedSize === size)
      );

      return {
        ...state,
        items: newItems,
        total: state.total - (item.price * item.quantity),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, size, quantity } = action.payload;
      const item = state.items.find(item => item.id === id && item.selectedSize === size);
      if (!item) return state;

      const quantityDiff = quantity - item.quantity;
      const newItems = state.items.map(item =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity }
          : item
      );

      return {
        ...state,
        items: newItems,
        total: state.total + (item.price * quantityDiff),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    default:
      return state;
  }
};

let toastId: string | undefined;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 }, () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0, itemCount: 0 };
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = async (product: Product, size: string, quantity = 1) => {
    try {
      const hasStock = await checkInventory(product.id, size, quantity);
      if (!hasStock) {
        toast.error('Sorry, this item is out of stock');
        return;
      }

      // Dismiss any existing toast before showing a new one
      if (toastId) {
        toast.dismiss(toastId);
      }

      dispatch({ type: 'ADD_ITEM', payload: { product, size, quantity } });
      
      // Show new toast and store its ID
      toastId = toast.success('Added to cart', {
        duration: 2000,
        style: {
          background: '#1B1B3A',
          color: '#fff',
          borderRadius: '8px',
        },
      });
    } catch (error) {
      toast.error('Failed to add item to cart');
      throw error;
    }
  };

  const removeFromCart = (id: string, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
    toast.success('Item removed from cart');
  };

  const updateQuantity = async (id: string, size: string, quantity: number) => {
    try {
      const hasStock = await checkInventory(id, size, quantity);
      if (!hasStock) {
        toast.error('Requested quantity not available');
        return;
      }

      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
    } catch (error) {
      toast.error('Failed to update quantity');
      throw error;
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider value={{ 
      state, 
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}