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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-4">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Aviários do Lote</h3>
        <button
          onClick={handleCreateAviary}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
            isBatchInactive 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700'
          }`}
          title={isBatchInactive ? 'Ative o lote para criar aviários' : ''}
        >
          <Plus className="w-4 h-4" />
          Novo Aviário
        </button>
      </div>

      {isLoadingAviaries ? (
        <div className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <div className="w-5 h-5 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <span>Carregando aviários...</span>
          </div>
        </div>
      ) : batchAviaries.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <div className="flex flex-col items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Galos Iniciais</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Galinhas Iniciais</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Galos Atuais</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Galinhas Atuais</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batchAviaries.map((aviary) => (
                <tr key={aviary.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{aviary.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">{aviary.initialAmountOfRoosters}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">{aviary.initialAmountOfChickens}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">{aviary.currentAmountOfRooster ?? aviary.initialAmountOfRoosters}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">{aviary.currentAmountOfChickens ?? aviary.initialAmountOfChickens}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => onEditAviary(aviary)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => onDeleteAviary(String(aviary.id))}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-4 h-4" />
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