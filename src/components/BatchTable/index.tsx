import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { BatchTableProps } from './types';
import { toast } from 'react-toastify';

const translateStatus = (status: string) => {
  const translations = { ACTIVE: 'ATIVO', INACTIVE: 'INATIVO', COMPLETED: 'CONCLUÍDO' };
  return translations[status as keyof typeof translations] || status;
};

const getStatusClasses = (status: string) => {
  const classes = {
    ACTIVE: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
    INACTIVE: 'bg-red-100 text-red-800',
  };
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800';
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
  children,
}) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data de Início
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {batches.length > 0 ? (
            batches.map((batch) => {
              const isBatchInactive = batch.status === 'INACTIVE';
              const isEditDisabled = isActivating || isDeactivating || isSubmitting || isBatchInactive;

              return (
                <React.Fragment key={batch.id}>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => onToggleExpansion(String(batch.id))}
                          className="mr-3 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Toggle detalhes"
                        >
                          {expandedBatches.includes(String(batch.id)) ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronUp className="w-5 h-5" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{batch.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(batch.startDate)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(batch.status)}`}>
                        {translateStatus(batch.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => {
                            if (isBatchInactive) {
                              toast.error('Ative o lote para habilitar a edição');
                              return;
                            }
                            onEdit(batch);
                          }}
                          className={`flex items-center gap-1 ${
                            isEditDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
                          }`}
                          disabled={isEditDisabled}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar
                        </button>

                        <button
                          onClick={() => onAction(batch.status === 'ACTIVE' ? 'deactivate' : 'activate', String(batch.id))}
                          className={`flex items-center gap-1 ${
                            batch.status === 'ACTIVE'
                              ? 'text-red-600 hover:text-red-800'
                              : 'text-green-600 hover:text-green-800'
                          }`}
                          disabled={isActivating || isDeactivating || isSubmitting}
                        >
                          {batch.status === 'ACTIVE' ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                              Desativar
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Ativar
                            </>
                          )}
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
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="font-medium">Nenhum lote encontrado</p>
                  <p className="text-sm">Cadastre um novo lote para começar</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);