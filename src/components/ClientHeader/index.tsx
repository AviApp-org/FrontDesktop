import React from 'react';

interface ClientHeaderProps {
  searchTerm: string;
  totalClients: number;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddClient: () => void;
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({
  searchTerm,
  totalClients,
  onSearch,
  onAddClient,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header com busca e botão */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Campo de busca */}
          <div className="flex items-center w-full md:w-2/3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={onSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                {/* Ícone de busca */}
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                  />
                </svg>
              </div>
            </div>

            {/* Botão de filtros */}
            <button
              type="button"
              className="ml-2 p-2 rounded-md hover:bg-gray-100 transition"
              title="Filtros avançados"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
            </button>
          </div>

          {/* Botão novo cliente */}
          <button
            onClick={onAddClient}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition"
          >
            {/* Ícone de adicionar */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Card com total de clientes */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl shadow-sm px-6 py-4">
        <div>
          <p className="text-2xl font-bold text-blue-700">{totalClients}</p>
          <p className="text-sm text-blue-900">Total de Clientes</p>
        </div>
      </div>
    </div>
  );
};
