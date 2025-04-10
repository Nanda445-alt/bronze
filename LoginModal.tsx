import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup';
type Step = 'initial' | 'verification' | 'details';

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [step, setStep] = useState<Step>('initial');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    firstName: '',
    lastName: '',
    verificationCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Successfully logged in');
      onClose();
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupInitial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const phoneRegex = /^\+?[1-9]\d{9,14}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error('Please enter a valid phone number');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('verification');
      toast.success('Verification code sent to your phone');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.verificationCode.length !== 6) {
        throw new Error('Please enter a valid verification code');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('details');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        throw new Error('Please enter your full name');
      }

      await login(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });

      toast.success('Account created successfully');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('New verification code sent');
    } catch (error) {
      toast.error('Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  const handleClose = () => {
    onClose();
    setStep('initial');
    setMode('login');
    setFormData({
      email: '',
      password: '',
      phone: '',
      firstName: '',
      lastName: '',
      verificationCode: ''
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={handleClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative bg-white p-8 rounded-lg max-w-md w-full mx-4"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-8">
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => {
                  setMode('login');
                  setStep('initial');
                }}
                className={`px-6 py-2 font-serif text-lg transition-colors ${
                  mode === 'login'
                    ? 'text-gold-600 border-b-2 border-gold-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMode('signup');
                  setStep('initial');
                }}
                className={`px-6 py-2 font-serif text-lg transition-colors ${
                  mode === 'signup'
                    ? 'text-gold-600 border-b-2 border-gold-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gray-900 text-white py-3 ${
                  isLoading ? 'opacity-75 cursor-wait' : 'hover:bg-gray-800'
                } transition-colors`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          )}

          {mode === 'signup' && step === 'initial' && (
            <form onSubmit={handleSignupInitial} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gray-900 text-white py-3 ${
                  isLoading ? 'opacity-75 cursor-wait' : 'hover:bg-gray-800'
                } transition-colors`}
              >
                {isLoading ? 'Sending Code...' : 'Continue'}
              </button>
            </form>
          )}

          {mode === 'signup' && step === 'verification' && (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                We've sent a verification code to {formData.phone}
              </p>
              <div>
                <input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 focus:outline-none text-center text-2xl tracking-wider"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gray-900 text-white py-3 ${
                  isLoading ? 'opacity-75 cursor-wait' : 'hover:bg-gray-800'
                } transition-colors`}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="w-full text-sm text-gray-600 hover:text-gray-800"
              >
                {isResending ? 'Resending...' : 'Resend Code'}
              </button>
            </form>
          )}

          {mode === 'signup' && step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gray-900 text-white py-3 ${
                  isLoading ? 'opacity-75 cursor-wait' : 'hover:bg-gray-800'
                } transition-colors`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}