import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { BatchTableProps } from './types';

const translateStatus = (status: string) => {
  const translations = { ACTIVE: 'ATIVO', INACTIVE: 'INATIVO' };
  return translations[status as keyof typeof translations] || status;
};

const getStatusClasses = (status: string) => {
  const classes = {
    ACTIVE: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
    default: 'bg-red-100 text-red-800'
  };
  return classes[status as keyof typeof classes] || classes.default;
};


export const BatchTable: React.FC<BatchTableProps> = ({
  batches,
  expandedBatches,
  isActivating,
  isDeactivating,
  isSubmitting,
  onToggleExpansion,
  onEdit,
  onAction,
  children

}) => (
  <div className="bg-white rounded-xl overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">Lista de Lotes e Aviários</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left align-middle text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left align-middle text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Início</th>
            <th className="px-6 py-3 text-left align-middle text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right align-middle text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {batches.map((batch) => (
            <React.Fragment key={batch.id}>
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <div className="flex items-center">
                    <button
                      onClick={() => onToggleExpansion(String(batch.id))}
                      className="mr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {expandedBatches.includes(String(batch.id)) ? 
                        <ChevronDown className="w-5 h-5" /> : 
                        <ChevronUp className="w-5 h-5" />
                      }
                    </button>
                    <span className="text-sm font-medium text-gray-900">{batch.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle text-sm text-gray-500">
                  {formatDate(batch.startDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(batch.status)}`}>
                    {translateStatus(batch.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(batch)}
                      className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                      disabled={isActivating || isDeactivating || isSubmitting}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onAction(batch.status === 'ACTIVE' ? 'deactivate' : 'activate', String(batch.id))}
                      className={`transition-colors duration-200 ${
                        batch.status === 'ACTIVE' 
                          ? 'text-red-600 hover:text-red-900' 
                          : 'text-green-600 hover:text-green-900'
                      }`}
                      disabled={isActivating || isDeactivating || isSubmitting}
                    >
                      {batch.status === 'ACTIVE' ? 'Desativar' : 'Ativar'}
                    </button>
                  </div>
                </td>
              </tr>
              {expandedBatches.includes(String(batch.id)) && children && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 bg-gray-50">
                    {children(batch)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
