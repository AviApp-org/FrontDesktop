import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AviaryTableProps } from './types';
import { toast } from 'react-toastify';

export const AviaryTable: React.FC<AviaryTableProps> = ({
  batch,
  aviariesData,
  isLoadingAviaries,
  onCreateAviary,
  onEditAviary,
  onDeleteAviary
}) => {
  const batchAviaries = aviariesData?.filter(aviary => String(aviary.batchId) === String(batch.id)) || [];
  const isBatchInactive = batch.status === 'INACTIVE';

  const handleCreateAviary = () => {
    if (isBatchInactive) {
      toast.error('Ative o lote antes de criar um aviário');
      return;
    }
    onCreateAviary();
  };

  return (
    <div className="mt-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Aviários do Lote {batch.name}</h3>
          <button
            onClick={handleCreateAviary}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isBatchInactive
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            title={isBatchInactive ? 'Ative o lote para criar aviários' : ''}
          >
            <Plus className="w-4 h-4" />
            Novo Aviário
          </button>
        </div>

        {isLoadingAviaries ? (
          <div className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-5 h-5 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              <span>Carregando aviários...</span>
            </div>
          </div>
        ) : batchAviaries.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            <div className="flex flex-col items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p>Nenhum aviário encontrado para este lote</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Galos</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Galinhas</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {batchAviaries.map((aviary) => {
                  const totalBirds =
                    (aviary.currentAmountOfRooster ?? aviary.initialAmountOfRoosters) +
                    (aviary.currentAmountOfChickens ?? aviary.initialAmountOfChickens);

                  return (
                    <tr key={aviary.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{aviary.name}</div>
                            <div className="text-xs text-gray-500">Aviário</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                        {aviary.currentAmountOfRooster ?? aviary.initialAmountOfRoosters}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                        {aviary.currentAmountOfChickens ?? aviary.initialAmountOfChickens}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {totalBirds} aves
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => onEditAviary(aviary)}
                            className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                          >
                            <Pencil className="w-4 h-4" />
                            <span className="hidden sm:inline">Editar</span>
                          </button>
                          <button
                            onClick={() => onDeleteAviary(String(aviary.id))}
                            className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Excluir</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};