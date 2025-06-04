import React from 'react';
import { SuccessMessageProps } from './types';

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  show,
  message = "Cliente cadastrado com sucesso!",
  onClose
}) => {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-center">
        <span className="text-green-400 mr-2 text-lg">✅</span>
        <span className="text-green-800">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-green-600 hover:text-green-800 text-lg font-bold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
