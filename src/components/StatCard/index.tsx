import React from 'react';
import { StatCardProps } from './types';


const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  sublabel, 
  variant = 'default' 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'highlighted':
        return 'stat-card-highlighted';
      case 'success':
        return 'stat-card stat-value-success';
      case 'danger':
        return 'stat-card stat-value-danger';
      case 'info':
        return 'stat-card stat-value-info';
      default:
        return 'stat-card';
    }
  };

  return (
    <div className={getVariantClasses()}>
      <p className="text-gray-600">{label}</p>
      <p className="stat-value">{value}</p>
      {sublabel && <p className="stat-label">{sublabel}</p>}
    </div>
  );
};

export default StatCard;
