import React from 'react';
import { StatusBadgeProps } from './types';

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'default',
  size = 'medium'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSizeClasses = () => {
    return size === 'small' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';
  };

  return (
    <span className={`inline-flex font-semibold rounded-full ${getVariantClasses()} ${getSizeClasses()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
