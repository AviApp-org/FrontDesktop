import React from 'react';
import { FarmFormProps } from './types';

export const FarmForm: React.FC<FarmFormProps> = ({
  formData,
  formErrors,
  isSubmitting,
  clients,
  onInputChange,
  onSubmit
}) => {
  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  const handleSelectChange = (name: string) => (value: string) => {
    onInputChange({ target: { name, value } });
  };

  return (
    <form onSubmit={handleFinish} className="space-y-6">
      <div className="border border-gray-200 rounded-md p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Dados da Granja</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-sm text-gray-700 mb-1">
            Nome da Granja
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={onInputChange}
            disabled={isSubmitting}
            placeholder="Digite o nome da granja"
            className={`w-full px-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none`}
          />
          {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="clientId" className="block font-medium text-sm text-gray-700 mb-1">
            Cliente
          </label>
          <select
            id="clientId"
            name="clientId"
            value={formData.clientId}
            onChange={(e) => handleSelectChange('clientId')(e.target.value)}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${formErrors.clientId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none`}
          >
            <option value="">Selecione o cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          {formErrors.clientId && <p className="text-red-500 text-sm mt-1">{formErrors.clientId}</p>}
        </div>
      </div>

      <div className="border border-gray-200 rounded-md p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Endereço</h2>

        {[
          { name: 'cep', label: 'CEP', maxLength: 8 },
          { name: 'street', label: 'Rua' },
          { name: 'number', label: 'Número' },
          { name: 'neighborhood', label: 'Bairro' },
          { name: 'city', label: 'Cidade' }
        ].map(({ name, label, maxLength }) => (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block font-medium text-sm text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type="text"
              maxLength={maxLength}
              value={formData[name as keyof typeof formData] as string}
              onChange={onInputChange}
              disabled={isSubmitting}
              placeholder={`Digite ${label.toLowerCase()}`}
              className={`w-full px-3 py-2 border ${formErrors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none`}
            />
            {formErrors[name] && <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>}
          </div>
        ))}

        <div className="mb-4">
          <label htmlFor="state" className="block font-medium text-sm text-gray-700 mb-1">
            Estado
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={(e) => handleSelectChange('state')(e.target.value)}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none`}
          >
            <option value="">Selecione o estado</option>
            {[
              'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
              'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
            ].map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
          {formErrors.state && <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>}
        </div>
      </div>

      {formErrors.submit && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {formErrors.submit}
        </div>
      )}

      {formErrors.clients && (
        <div className="bg-yellow-100 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          {formErrors.clients}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar Granja'}
        </button>
      </div>
    </form>
  );
};
