import React from 'react';

interface Farm {
  id: string;
  name: string;
  managerName: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface FarmTableCardProps {
  farms: Farm[];
  isLoading: boolean;
  isError: boolean;
}

const FarmTableCard: React.FC<FarmTableCardProps> = ({ farms, isLoading, isError }) => (
  <div className="w-full mb-6 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="font-bold px-4 py-3 w-[12.5%]">Nome</th>
            <th className="font-bold px-4 py-3 w-[12.5%]">Responsável</th>
            <th className="font-bold px-4 py-3 w-[12.5%]">CEP</th>
            <th className="font-bold px-4 py-3 w-[12.5%]">Rua</th>
            <th className="font-bold px-4 py-3 w-[12.5%]">Número</th>
            <th className="font-bold px-4 py-3 w-[12.5%]">Bairro</th>
            <th className="font-bold px-4 py-3 w-[12.5%]">Cidade</th>
            <th className="font-bold px-4 py-3 w-[12.5%]">Estado</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
                  Carregando granjas...
                </div>
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-red-600">
                Erro ao carregar granjas.
              </td>
            </tr>
          ) : farms.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-600">
                Nenhuma granja cadastrada.
              </td>
            </tr>
          ) : (
            farms.map((farm) => (
              <tr key={farm.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 w-[12.5%]">{farm.name}</td>
                <td className="px-4 py-3 w-[12.5%]">{farm.managerName}</td>
                <td className="px-4 py-3 w-[12.5%]">{farm.cep}</td>
                <td className="px-4 py-3 w-[12.5%]">{farm.street}</td>
                <td className="px-4 py-3 w-[12.5%]">{farm.number}</td>
                <td className="px-4 py-3 w-[12.5%]">{farm.neighborhood}</td>
                <td className="px-4 py-3 w-[12.5%]">{farm.city}</td>
                <td className="px-4 py-3 w-[12.5%]">{farm.state}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default FarmTableCard;
