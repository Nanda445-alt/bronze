import { toast } from 'react-hot-toast';

interface PaymentDetails {
  amount: number;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
}

export async function verifyPayment(details: PaymentDetails): Promise<boolean> {
  // Simulate payment verification
  const loadingToast = toast.loading('Processing payment...');
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Card payment validation
    if (details.cardNumber) {
      if (!isValidCard(details.cardNumber)) {
        throw new Error('Invalid card number');
      }
      if (!isValidExpiry(details.expiryDate!)) {
        throw new Error('Invalid expiry date');
      }
      if (!isValidCVV(details.cvv!)) {
        throw new Error('Invalid CVV');
      }
    }

    // UPI payment validation
    if (details.upiId && !isValidUPI(details.upiId)) {
      throw new Error('Invalid UPI ID');
    }

    toast.dismiss(loadingToast);
    toast.success('Payment successful!');
    return true;
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error(error instanceof Error ? error.message : 'Payment failed');
    return false;
  }
}

function isValidCard(cardNumber: string): boolean {
  // Basic card validation (Luhn algorithm)
  const sanitized = cardNumber.replace(/\D/g, '');
  if (sanitized.length !== 16) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

function isValidExpiry(expiry: string): boolean {
  const [month, year] = expiry.split('/').map(num => parseInt(num.trim()));
  if (!month || !year) return false;
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  return (
    month >= 1 && month <= 12 &&
    year >= currentYear &&
    (year > currentYear || month >= currentMonth)
  );
}

function isValidCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv);
}

function isValidUPI(upiId: string): boolean {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/i.test(upiId);
}