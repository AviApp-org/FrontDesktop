import React from 'react';
import { EmployeeHeaderProps } from './types';

export const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({
  searchTerm,
  totalEmployees,
  onSearch,
  onAddEmployee
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Barra de busca e botão */}
      <div className="border border-gray-200 rounded p-4 bg-white shadow-sm flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center w-full md:w-2/3">
          <input
            type="text"
            placeholder="Buscar funcionários..."
            value={searchTerm}
            onChange={onSearch}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button
            className="ml-2 text-gray-500 hover:text-gray-700 transition"
            title="Filtros avançados"
          >
            🔍
          </button>
        </div>

        <button
          onClick={onAddEmployee}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition"
        >
          ➕ Adicionar Funcionário
        </button>
      </div>

      {/* Total de funcionários */}
      <div className="border border-blue-200 bg-blue-50 rounded p-4 shadow-sm">
        <p className="text-xl font-semibold text-blue-700">{totalEmployees}</p>
        <p className="text-sm text-blue-900">Total de Funcionários</p>
      </div>
    </div>
  );
};
