import React from 'react';
import { ClientModalProps } from './types';

export const ClientModal: React.FC<ClientModalProps> = ({
  open,
  editingId,
  formData,
  formErrors,
  isSubmitting,
  onClose,
  onSubmit,
  onInputChange
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {editingId ? 'Editar Cliente' : 'Adicionar Cliente'}
        </h2>

        {formErrors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {formErrors.submit}
          </div>
        )}

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
            />
            {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
            />
            {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ *</label>
            <input
              type="text"
              name="cnpj"
              maxLength={14}
              placeholder="Digite apenas números"
              value={formData.cnpj}
              onChange={onInputChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border ${
                formErrors.cnpj ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
            />
            {formErrors.cnpj && <p className="text-sm text-red-500">{formErrors.cnpj}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
            <input
              type="text"
              name="phone"
              maxLength={11}
              placeholder="Digite apenas números"
              value={formData.phone}
              onChange={onInputChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border ${
                formErrors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600`}
            />
            {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={onInputChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : editingId ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
