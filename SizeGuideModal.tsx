import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: 'mens' | 'womens';
}

interface SizeTableRow {
  size: string;
  chest: string;
  waist: string;
  hip: string;
  [key: string]: string;
}

const mensSizes: SizeTableRow[] = [
  { size: 'S', chest: '34-35"', waist: '28-29"', hip: '38-39"', sleeve: '32"' },
  { size: 'M', chest: '36-37"', waist: '30-31"', hip: '40-41"', sleeve: '32.5"' },
  { size: 'L', chest: '38-39"', waist: '32-33"', hip: '42-43"', sleeve: '33"' },
  { size: 'XL', chest: '40-41"', waist: '34-35"', hip: '44-45"', sleeve: '33.5"' }
];

const womensSizes: SizeTableRow[] = [
  { size: 'S', chest: '32-33"', waist: '26-27"', hip: '36-37"' },
  { size: 'M', chest: '34-35"', waist: '28-29"', hip: '38-39"' },
  { size: 'L', chest: '36-37"', waist: '30-31"', hip: '40-41"' },
  { size: 'XL', chest: '38-39"', waist: '32-33"', hip: '42-43"' }
];

export default function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  const sizes = category === 'mens' ? mensSizes : womensSizes;
  const columns = category === 'mens' 
    ? ['SIZE', 'CHEST', 'WAIST', 'HIP', 'SLEEVE']
    : ['SIZE', 'CHEST', 'WAIST', 'HIP'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative bg-white p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-8">
            <h2 className="text-xl mb-2">SIZE GUIDE</h2>
            <p className="text-sm text-gray-600">All measurements are in inches</p>
          </div>

          {/* How to Measure Guide */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-4">HOW TO MEASURE</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">CHEST</h4>
                <p className="text-gray-600">Measure around the fullest part of your chest, keeping the measuring tape horizontal.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">WAIST</h4>
                <p className="text-gray-600">Measure around your natural waistline, keeping the tape comfortably loose.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">HIP</h4>
                <p className="text-gray-600">Measure around the fullest part of your hips, keeping the tape horizontal.</p>
              </div>
            </div>
          </div>

          {/* Size Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  {columns.map((column) => (
                    <th key={column} className="py-4 px-4 text-left font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.map((row) => (
                  <tr key={row.size} className="border-b border-gray-200">
                    {columns.map((column) => (
                      <td key={column} className="py-4 px-4">
                        {row[column.toLowerCase()]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-sm text-gray-600">
            <p className="mb-4">
              These measurements serve as a guide. Actual measurements may vary by style.
            </p>
            <p>
              If you're between sizes, order the smaller size for a tighter fit or the larger size for a looser fit.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}