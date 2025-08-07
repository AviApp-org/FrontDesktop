import React, { useState } from 'react';
import { FarmModalProps } from './types';

const FarmModal: React.FC<FarmModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    managerName: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call your API or parent handler here
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Cadastrar Granja</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Responsável"
            name="managerName"
            value={form.managerName}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="CEP"
            name="cep"
            value={form.cep}
            onChange={handleChange}
            required
            maxLength={8}
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Rua"
            name="street"
            value={form.street}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Número"
            name="number"
            value={form.number}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Bairro"
            name="neighborhood"
            value={form.neighborhood}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Cidade"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Estado"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded bg-green-600 text-white hover:bg-green-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmModal;
