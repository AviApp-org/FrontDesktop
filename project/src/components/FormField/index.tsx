import React from 'react';
import { FormFieldProps } from './types';


const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  children,
  className = ""
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;
