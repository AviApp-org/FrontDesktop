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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4">
          <h3 className="text-lg font-semibold text-white">
            {batch ? 'Editar Lote' : 'Novo Lote'}
          </h3>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Lote *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={batch?.name}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: LOTE001"
                  required
                  disabled={isSubmitting}
                />
                {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Início *</label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={batch?.startDate ? formatDateForInput(batch.startDate) : ''}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition ${
                    formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  disabled={isSubmitting}
                />
                {formErrors.startDate && <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select
                  name="status"
                  defaultValue={batch?.status || 'ACTIVE'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  required
                  disabled={isSubmitting}
                >
                  <option value="ACTIVE">Ativo</option>
                  <option value="COMPLETED">Concluído</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-teal-700 transition ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </span>
                  ) : batch ? 'Salvar Alterações' : 'Criar Lote'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};