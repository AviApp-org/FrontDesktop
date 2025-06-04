import React from 'react';
import { SelectProps } from './types';


const Select: React.FC<SelectProps> = ({ 
  options, 
  error, 
  placeholder,
  className = '', 
  ...props 
}) => {
  return (
    <select
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
