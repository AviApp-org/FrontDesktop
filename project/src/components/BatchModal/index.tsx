import React from 'react';
import { BatchModalProps } from './types';

export const BatchModal: React.FC<BatchModalProps> = ({
  isOpen,
  batch,
  isSubmitting,
  formErrors,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  const formatDateForInput = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const formatDateForSubmit = (dateValue: string) => {
    const [year, month, day] = dateValue.split('-');
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {batch ? 'Editar Lote' : 'Novo Lote'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const dateValue = formData.get('startDate') as string;
            const data = {
              name: formData.get('name') as string,
              startDate: formatDateForSubmit(dateValue),
              status: formData.get('status') as string || 'ACTIVE',
            };
            onSubmit(data);
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Lote</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={batch?.name}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: LOTE001"
                  required
                  disabled={isSubmitting}
                />
                {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={batch?.startDate ? formatDateForInput(batch.startDate) : ''}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  disabled={isSubmitting}
                />
                {formErrors.startDate && <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={batch?.status || 'ACTIVE'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                  disabled={isSubmitting}
                >
                  <option value="ACTIVE">Ativo</option>
                  <option value="COMPLETED">Concluído</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processando...' : (batch ? 'Salvar' : 'Criar')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
