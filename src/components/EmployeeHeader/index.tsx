import React from 'react';
import { EmployeeHeaderProps } from './types';

export const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({
  searchTerm,
  totalEmployees,
  onSearch,
  onAddEmployee
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      {/* Total de funcionários */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-4 shadow-md w-full md:w-auto">
        <p className="text-2xl font-bold text-white">{totalEmployees}</p>
        <p className="text-sm text-white/90">Total de Funcionários</p>
      </div>

      {/* Barra de busca e botão */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar funcionários por nome, CPF ou telefone..."
            value={searchTerm}
            onChange={onSearch}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
          <span className="absolute right-3 top-3 text-gray-400">🔍</span>
        </div>

        <button
          onClick={onAddEmployee}
          className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-green-700 hover:to-teal-700 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>+</span>
          <span>Adicionar Funcionário</span>
        </button>
      </div>
    </div>
  );
};