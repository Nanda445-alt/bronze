import React from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order } from '../types/order';

// Mock orders data - in a real app, this would come from an API
const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        productId: '1',
        name: 'Classic Oxford Shirt',
        price: 195,
        quantity: 1,
        size: 'M',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf'
      }
    ],
    total: 195,
    status: 'delivered',
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    paymentMethod: 'card',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-03'),
    trackingNumber: 'TRK123456789'
  }
];

const statusIcons = {
  pending: Package,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: Package
};

const statusColors = {
  pending: 'text-yellow-500',
  processing: 'text-blue-500',
  shipped: 'text-purple-500',
  delivered: 'text-green-500',
  cancelled: 'text-red-500'
};

export default function OrdersPage() {
  if (mockOrders.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Package className="h-16 w-16 mx-auto mb-6 text-gray-300" />
          <h1 className="text-3xl font-serif mb-4">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">
            When you place an order, it will appear here.
          </p>
          <Link
            to="/collection/mens"
            className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-serif mb-8">My Orders</h1>

        <div className="space-y-6">
          {mockOrders.map((order) => {
            const StatusIcon = statusIcons[order.status];
            const statusColor = statusColors[order.status];

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order #{order.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        Placed on {order.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 ${statusColor}`}>
                      <StatusIcon className="h-5 w-5" />
                      <span className="text-sm font-medium capitalize">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 py-4 border-t border-gray-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Size: {item.size} · Quantity: {item.quantity}
                        </p>
                        <p className="text-sm">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-medium">Total: ₹{order.total.toLocaleString()}</p>
                      {order.trackingNumber && (
                        <p className="text-sm text-gray-500">
                          Tracking: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                    <button className="text-gold-600 hover:text-gold-700 flex items-center gap-1">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}