import React from 'react';
import Button from '../Button';
import { PageHeaderProps } from './types'; 

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
      </div>
      {action && (
        <Button 
          variant={action.variant || 'primary'} 
          onClick={action.onClick}
        >
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
