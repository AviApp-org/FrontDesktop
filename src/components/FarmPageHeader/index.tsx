import React from 'react';
import { Plus } from 'lucide-react';

interface FarmHeaderProps {
  onNewFarm: () => void;
}

export const FarmHeader: React.FC<FarmHeaderProps> = ({ onNewFarm }) => (
  <div className="mb-6 bg-white rounded-2xl shadow p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
      <h1 className="text-2xl font-bold text-gray-900">Lista de Granjas</h1>
      <button
        onClick={onNewFarm}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white font-medium rounded px-4 h-10 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Cadastrar Granja
      </button>
    </div>
    <p className="text-sm text-gray-500">
      Gerencie suas granjas cadastradas de forma eficiente
    </p>
  </div>
);

export default FarmHeader;
