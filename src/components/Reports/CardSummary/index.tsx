import React from 'react';
import { CardSummaryProps } from './types';


export const CardSummary: React.FC<CardSummaryProps> = ({ label, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center border">
      <div className="text-2xl font-bold text-blue-600">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
};
