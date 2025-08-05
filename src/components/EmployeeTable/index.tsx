import React from 'react';
import { EmployeeData } from '../../@types/EmployeeData';
import { EmployeeRole } from '../../@types/enums/enumEmployeeRole';
import { formatDate } from '../../utils/formatDate';

interface EmployeeTableProps {
  employees: EmployeeData[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (employee: EmployeeData) => void;
  onDelete: (id: number) => void;
}

const getRoleLabel = (role: EmployeeRole): string => {
  const roleLabels = {
    [EmployeeRole.MANAGER]: 'Gerente',
    [EmployeeRole.WORKER]: 'Colaborador',
  };
  return roleLabels[role] || role;
};

const getRoleColor = (role: EmployeeRole): string => {
  const roleColors = {
    [EmployeeRole.MANAGER]: 'text-red-600 border-red-600',
    [EmployeeRole.WORKER]: 'text-green-600 border-green-600',
  };
  return roleColors[role] || 'text-gray-600 border-gray-300';
};

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  isLoading,
  isError,
  onEdit,
  onDelete
}) => {
  if (isLoading) {
    return (
      <div className="border border-gray-200 rounded p-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-700">Carregando funcionários...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border border-gray-200 rounded p-6 text-center text-red-600 font-medium">
        Erro ao carregar funcionários. Por favor, tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="font-semibold px-4 py-2">Nome</th>
            <th className="font-semibold px-4 py-2">CPF</th>
            <th className="font-semibold px-4 py-2">Data Nascimento</th>
            <th className="font-semibold px-4 py-2">Telefone</th>
            <th className="font-semibold px-4 py-2">Cargo</th>
            <th className="font-semibold px-4 py-2 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 border-t">
                <td className="px-4 py-3 font-medium">{employee.name}</td>
                <td className="px-4 py-3 text-gray-600">{employee.cpf}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(employee.birthDate)}</td>
                <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 border rounded-full ${getRoleColor(employee.role)}`}>
                    {getRoleLabel(employee.role)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="text-green-600 hover:text-green-800 transition"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => employee.id && onDelete(employee.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-6">
                Nenhum funcionário encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
