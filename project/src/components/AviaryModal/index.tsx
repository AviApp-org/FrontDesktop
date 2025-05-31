import React from 'react';
import { CreateAviaryData } from '../../@types/CreateAviaryData';
import { AviaryModalProps } from './types';


export const AviaryModal: React.FC<AviaryModalProps> = ({
  isOpen,
  aviary,
  selectedBatch, // ✅ Receber selectedBatch
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {aviary ? 'Editar Aviário' : 'Novo Aviário'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
            ×
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            
            // ✅ Criar objeto com tipo correto
            const aviaryData: CreateAviaryData = {
              name: formData.get('name') as string,
              initialAmountOfRoosters: Number(formData.get('initialAmountOfRoosters')),
              initialAmountOfChickens: Number(formData.get('initialAmountOfChickens')),
              batchId: Number(selectedBatch?.id), // ✅ Converter para number
            };

            console.log('🔍 Dados do aviário sendo enviados:', aviaryData);
            onSubmit(aviaryData);
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Aviário
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={aviary?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Ex: AVIÁRIO A1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade Inicial de Galos
                </label>
                <input
                  type="number"
                  name="initialAmountOfRoosters"
                  defaultValue={aviary?.initialAmountOfRoosters}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="0"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade Inicial de Galinhas
                </label>
                <input
                  type="number"
                  name="initialAmountOfChickens"
                  defaultValue={aviary?.initialAmountOfChickens}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="0"
                  required
                  min="0"
                />
              </div>

              {/* ✅ Mostrar qual lote está sendo usado */}
              {selectedBatch && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Lote:</strong> {selectedBatch.id}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  {aviary ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
