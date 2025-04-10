import React from 'react';
import { SortOption } from '../../types/filters';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="border border-gray-200 p-2 rounded-md"
    >
      <option value="newest">Newest First</option>
      <option value="priceHighToLow">Price: High to Low</option>
      <option value="priceLowToHigh">Price: Low to High</option>
      <option value="popularity">Popularity</option>
    </select>
  );
}