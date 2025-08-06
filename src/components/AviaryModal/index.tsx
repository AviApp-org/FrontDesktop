import React from 'react';
import { CreateAviaryData } from '../../@types/CreateAviaryData';
import { AviaryModalProps } from './types';

export const AviaryModal: React.FC<AviaryModalProps> = ({
  isOpen,
  aviary,
  selectedBatch,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
          <h3 className="text-lg font-semibold text-white">
            {aviary ? 'Editar Aviário' : 'Novo Aviário'}
          </h3>
        </div>

        <div className="p-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const aviaryData: CreateAviaryData = {
              name: formData.get('name') as string,
              initialAmountOfRoosters: Number(formData.get('initialAmountOfRoosters')),
              initialAmountOfChickens: Number(formData.get('initialAmountOfChickens')),
              batchId: Number(selectedBatch?.id)
            };
            onSubmit(aviaryData);
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Aviário *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={aviary?.name}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  placeholder="Ex: AVIÁRIO A1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade de Galos *</label>
                <input
                  type="number"
                  name="initialAmountOfRoosters"
                  defaultValue={aviary?.initialAmountOfRoosters}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  placeholder="0"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade de Galinhas *</label>
                <input
                  type="number"
                  name="initialAmountOfChickens"
                  defaultValue={aviary?.initialAmountOfChickens}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  placeholder="0"
                  required
                  min="0"
                />
              </div>

              {selectedBatch && (
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">Lote associado:</span> {selectedBatch.name}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition"
                >
                  {aviary ? 'Salvar Alterações' : 'Criar Aviário'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};