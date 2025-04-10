import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ShoppingBag, User, MessageCircle } from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export default function ProfileDropdown({ isOpen, onClose, username }: ProfileDropdownProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="font-medium">{username}</p>
          </div>
          
          <div className="py-2">
            <button className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50">
              <ShoppingBag className="h-5 w-5 text-gray-500" />
              <span>Order History</span>
            </button>
            <button className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50">
              <User className="h-5 w-5 text-gray-500" />
              <span>Profile Settings</span>
            </button>
            <button className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50">
              <MessageCircle className="h-5 w-5 text-gray-500" />
              <span>Customer Care</span>
            </button>
          </div>
          
          <div className="border-t border-gray-100 pt-2">
            <button className="w-full px-4 py-2 text-left flex items-center space-x-3 text-red-600 hover:bg-gray-50">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}