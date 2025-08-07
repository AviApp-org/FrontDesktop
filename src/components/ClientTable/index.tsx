import React from 'react';
import { ClientTableProps } from './types';
import { formatCNPJ, formatPhone } from '../../utils/validators';

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  isLoading,
  isError,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="border border-gray-300 rounded shadow-sm w-full">
        <div className="p-6 flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-6 w-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="text-blue-600">Carregando clientes...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border border-gray-300 rounded shadow-sm w-full">
        <div className="p-6 flex justify-center">
          <span className="text-red-600">
            Erro ao carregar clientes. Por favor, tente novamente mais tarde.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded shadow-sm w-full overflow-x-auto">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">E-mail</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">CNPJ</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Telefone</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center space-x-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-semibold">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-800">{client.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{client.email}</td>
                <td className="px-4 py-3 text-gray-700">{formatCNPJ(client.cnpj)}</td>
                <td className="px-4 py-3 text-gray-700">{formatPhone(client.phone)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${client.status === 'ACTIVE'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                      }`}
                  >
                    {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  {/* Visualizar */}
                  <button
                    title="Visualizar detalhes"
                    className="text-blue-700 hover:text-blue-900"
                    onClick={() => {
                      /* implement if needed */
                    }}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>

                  {/* Editar */}
                  <button
                    title="Editar"
                    className="text-blue-700 hover:text-blue-900"
                    onClick={() => onEdit(client)}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-7-7l7 7m0 0v6m0-6h-6"
                      />
                    </svg>
                  </button>

                  {/* Excluir */}
                  <button
                    title="Excluir"
                    className="text-blue-700 hover:text-blue-900"
                    onClick={() => onDelete(client.id)}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                Nenhum cliente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
