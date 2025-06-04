import React from 'react';
import { Spin } from 'antd';
import {LoadingOverlayProps} from './types';

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show,
  message = "Carregando..."
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};
