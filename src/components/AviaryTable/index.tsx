import React from 'react';
import { Plus } from 'lucide-react';
import { AviaryTableProps } from './types';
import Button from '../Button';


export const AviaryTable: React.FC<AviaryTableProps> = ({
  batch,
  aviariesData,
  isLoadingAviaries,
  onCreateAviary,
  onEditAviary,
  onDeleteAviary
}) => {
  const batchAviaries = aviariesData?.filter(aviary => {
    return String(aviary.batchId) === String(batch.id);
  }) || [];

  const isBatchInactive = batch.status === 'INACTIVE';
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Aviários do Lote</h3>
        <Button
          variant='primary'
          onClick={onCreateAviary}
          disabled={isBatchInactive}
          title={isBatchInactive ? 'Não é possível criar aviários em lotes inativos' : ''}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Aviário
        </Button>
      </div>

      {isLoadingAviaries ? (
        <div className="p-4 text-center text-gray-500">Carregando aviários...</div>
      ) : batchAviaries.length === 0 ? (
        <div className="p-4 text-center text-gray-500">Nenhum aviário encontrado para este lote.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Galos Iniciais
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Galinhas Iniciais
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Galos Atuais
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Galinhas Atuais
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batchAviaries.map((aviary) => (
                <tr key={aviary.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {aviary.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {aviary.initialAmountOfRoosters}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {aviary.initialAmountOfChickens}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {aviary.currentAmountOfRooster ?? aviary.initialAmountOfRoosters}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {aviary.currentAmountOfChickens ?? aviary.initialAmountOfChickens}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEditAviary(aviary)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDeleteAviary(String(aviary.id))}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
