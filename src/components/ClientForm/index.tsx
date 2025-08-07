import React from 'react';
import { ClientStatus } from '../../@types/enums/enumClientStatus';
import { ClientFormProps } from './types';

export const ClientForm: React.FC<ClientFormProps> = ({
  formData,
  formErrors,
  isSubmitting,
  onInputChange,
  onSubmit
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={onInputChange}
          disabled={isSubmitting}
          placeholder="Digite o nome do cliente"
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
            formErrors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-green-600'
          }`}
        />
        {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          disabled={isSubmitting}
          placeholder="Digite o e-mail do cliente"
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
            formErrors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-green-600'
          }`}
        />
        {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CNPJ</label>
        <input
          name="cnpj"
          type="text"
          maxLength={14}
          value={formData.cnpj}
          onChange={onInputChange}
          disabled={isSubmitting}
          placeholder="Digite apenas os números do CNPJ"
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
            formErrors.cnpj
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-green-600'
          }`}
        />
        {formErrors.cnpj && <p className="mt-1 text-sm text-red-600">{formErrors.cnpj}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          name="phone"
          type="text"
          value={formData.phone}
          onChange={onInputChange}
          disabled={isSubmitting}
          placeholder="Digite o telefone do cliente"
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
            formErrors.phone
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-green-600'
          }`}
        />
        {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={(e) =>
            onInputChange({ target: { name: 'status', value: e.target.value } })
          }
          disabled={isSubmitting}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
            formErrors.status
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-green-600'
          }`}
        >
          <option value="">Selecione o status</option>
          <option value={ClientStatus.ACTIVE}>Ativo</option>
          <option value={ClientStatus.INACTIVE}>Inativo</option>
        </select>
        {formErrors.status && <p className="mt-1 text-sm text-red-600">{formErrors.status}</p>}
      </div>

      {formErrors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {formErrors.submit}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-md px-4 py-2 font-medium text-white shadow-sm transition ${
            isSubmitting
              ? 'bg-green-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar Cliente'}
        </button>
      </div>
    </form>
  );
};
