import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import { verifyPayment } from '../utils/payment';
import toast from 'react-hot-toast';

type PaymentMethod = 'card' | 'upi';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Verify payment based on selected method
      const paymentDetails = {
        amount: state.total,
        ...(paymentMethod === 'card' ? {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        } : {
          upiId: formData.upiId
        })
      };

      const isPaymentSuccessful = await verifyPayment(paymentDetails);
      
      if (isPaymentSuccessful) {
        // Process order
        await new Promise(resolve => setTimeout(resolve, 1000));
        clearCart();
        navigate('/order-confirmation', {
          state: { email: formData.email }
        });
      }
    } catch (error) {
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <h1 className="text-2xl font-serif">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Shipping Address</h2>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                />
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Payment Method</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`px-4 py-3 border ${
                      paymentMethod === 'card'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    Credit/Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`px-4 py-3 border ${
                      paymentMethod === 'upi'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    UPI Payment
                  </button>
                </div>
              </div>

              {/* Payment Details */}
              {paymentMethod === 'card' ? (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Card Details</h2>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="Card Number"
                    required={paymentMethod === 'card'}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required={paymentMethod === 'card'}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                    />
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="CVV"
                      required={paymentMethod === 'card'}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">UPI Payment</h2>
                  <div className="bg-gray-50 p-6 text-center">
                    <QrCode className="h-32 w-32 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">
                      Scan QR code or enter UPI ID
                    </p>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="Enter UPI ID (e.g., name@upi)"
                      required={paymentMethod === 'upi'}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-black text-white py-4 font-serif
                  ${isProcessing ? 'opacity-75 cursor-wait' : 'hover:bg-gray-900'}`}
              >
                {isProcessing ? 'Processing...' : `Pay ₹${state.total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-8">
            <h2 className="text-xl font-serif mb-6">Order Summary</h2>
            <div className="space-y-4">
              {state.items.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold mt-4">
                  <span>Total</span>
                  <span>₹{state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}