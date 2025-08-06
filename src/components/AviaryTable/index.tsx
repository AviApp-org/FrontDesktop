import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AviaryTableProps } from './types';
import Button from '../Button';
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
      toast.error('Ative o lote antes de criar um aviário', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }
    onCreateAviary();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Aviários do Lote</h3>
        <Button
          variant="primary"
          onClick={handleCreateAviary}
          title={isBatchInactive ? 'Ative o lote para criar aviários' : ''}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Aviário
        </Button>
      </div>

      {isLoadingAviaries ? (
        <div className="p-6 text-center text-gray-500">Carregando aviários...</div>
      ) : batchAviaries.length === 0 ? (
        <div className="p-6 text-center text-gray-500">Nenhum aviário encontrado para este lote.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Nome</th>
                <th className="px-6 py-3 text-center">Galos Iniciais</th>
                <th className="px-6 py-3 text-center">Galinhas Iniciais</th>
                <th className="px-6 py-3 text-center">Galos Atuais</th>
                <th className="px-6 py-3 text-center">Galinhas Atuais</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batchAviaries.map((aviary) => (
                <tr key={aviary.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{aviary.name}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{aviary.initialAmountOfRoosters}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{aviary.initialAmountOfChickens}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{aviary.currentAmountOfRooster ?? aviary.initialAmountOfRoosters}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{aviary.currentAmountOfChickens ?? aviary.initialAmountOfChickens}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEditAviary(aviary)}
                        className="flex items-center gap-1 px-2 py-1 text-green-700 hover:text-white hover:bg-green-600 border border-green-600 rounded-md transition"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => onDeleteAviary(String(aviary.id))}
                        className="flex items-center gap-1 px-2 py-1 text-red-600 hover:text-white hover:bg-red-500 border border-red-500 rounded-md transition"
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
