import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { ErrorAlertProps } from './types';
import Button from '../Button';

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose, className = '' }) => {
  return (
    <div className={`bg-red-50 border-l-4 border-red-400 p-4 rounded-lg flex items-center ${className}`}>
      <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
      <p className="text-red-700 flex-1">{message}</p>
      {onClose && (
        <Button
          onClick={onClose}
          variant='destructive'
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ErrorAlert;
