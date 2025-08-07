import React from 'react';
import { translateEggType } from '../../../@types/reportTypes';
import { AviaryData } from '@/@types/AviaryData';
import { 
  ChevronDown, 
  ChevronUp,
  ShoppingCart,// Substitui ShoppingCartIcon
  LightbulbIcon,
  TrendingUpIcon,
  StarIcon,
  TrophyIcon,
  TrashIcon,
  TrendingDownIcon,
  UserIcon,
  User2
} from 'lucide-react';

interface AviarioProps {
  aviary: AviaryData & {
    aviaryName?: string;
    aviaryId?: number;
    totalEggsCollected?: number;
    totalDeadChickens?: number;
    totalDeadRoosters?: number;
    chickenMortality?: number;
    roosterMortality?: number;
    mortality?: number;
    production?: number;
    hatchableEggs?: number;
    marketEggs?: number;
    dumpEggs?: number;
    quantityByEggType?: {
      type: string;
      quantity: number;
    }[];
    currentChickens?: number;
    currentRoosters?: number;
  };
  open: boolean;
  toggle: () => void;
}

export const Aviario: React.FC<AviarioProps> = ({ aviary, open, toggle }) => {
  const aviaryName = aviary.aviaryName || aviary.name || `Aviário ${aviary.aviaryId}`;

  // Dados de mortalidade
  const mortalityData = {
    totalChickens: aviary.currentChickens || 0,
    totalRoosters: aviary.currentRoosters || 0,
    deadFemales: aviary.totalDeadChickens || 0,
    deadMales: aviary.totalDeadRoosters || 0,
    femaleMortality: aviary.chickenMortality || 0,
    maleMortality: aviary.roosterMortality || 0,
    generalMortality: aviary.mortality || 0,
  };

  // Dados de produção
  const productionData = {
    totalProduced: aviary.totalEggsCollected || 0,
    productionPercentage: aviary.production || 0,
    hatchableEggs: aviary.hatchableEggs || 0,
    marketEggs: aviary.marketEggs || 0,
    eliminatedEggs: aviary.dumpEggs || 0,
  };

  // Dados da tabela de ovos com porcentagem
  const eggData = aviary.quantityByEggType || [];
  const totalEggs = eggData.reduce((sum: number, egg: any) => sum + (egg.quantity || 0), 0);
  
  const renderEggTable = () => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Ovo
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Porcentagem
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {eggData.map((egg, index) => {
              const percentage = totalEggs > 0 ? ((egg.quantity / totalEggs) * 100).toFixed(1) : '0.0';
              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {translateEggType(egg.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {egg.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {percentage}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="mb-4 bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div 
        className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50"
        onClick={toggle}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          <span role="img" aria-label="house">🏠</span> {aviaryName}
        </h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            <span role="img" aria-label="egg">🥚</span> {productionData.totalProduced} ovos • 
            <span role="img" aria-label="skull">💀</span> {mortalityData.generalMortality.toFixed(1)}% mortalidade
          </span>
          {open ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      {open && (
        <div className="p-4 space-y-6 border-t border-gray-200">
          {/* 📊 TABELA DE OVOS - PRIMEIRO */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <LightbulbIcon className="h-5 w-5 mr-2 text-orange-500" />
                <span className="text-lg font-semibold">📊 Detalhamento dos Ovos</span>
              </div>
            </div>
            <div className="p-4">
              {renderEggTable()}
            </div>
          </div>

          {/* 🥚 CARD DE PRODUÇÃO - SEGUNDO (ACIMA DA MORTALIDADE) */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <TrendingUpIcon className="h-5 w-5 mr-2 text-green-500" />
                <span className="text-lg font-semibold">🥚 Produção</span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Total Produzido */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">Total Produzido</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.totalProduced}
                  </div>
                </div>

                {/* % da Produção */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUpIcon className="h-5 w-5 text-green-500 mr-1" />
                    <span className="text-sm font-medium">% da Produção</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.productionPercentage.toFixed(1)}%
                  </div>
                </div>

                {/* Ovos Incubáveis */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrophyIcon className="h-5 w-5 text-blue-500 mr-1" />
                    <span className="text-sm font-medium">Ovos Incubáveis</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.hatchableEggs}
                  </div>
                </div>

                {/* Ovos Mercado */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <ShoppingCart className="h-5 w-5 text-green-500 mr-1" />
                    <span className="text-sm font-medium">Ovos Mercado</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.marketEggs}
                  </div>
                </div>

                {/* Ovos Eliminados */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrashIcon className="h-5 w-5 text-red-500 mr-1" />
                    <span className="text-sm font-medium">Ovos Eliminados</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.eliminatedEggs}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 💀 CARD DE MORTALIDADE - TERCEIRO (ABAIXO DA PRODUÇÃO) */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <TrendingDownIcon className="h-5 w-5 mr-2 text-red-500" />
                <span className="text-lg font-semibold">💀 Mortalidade</span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Galinhas */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <UserIcon className="h-5 w-5 text-pink-500 mr-1" />
                    <span className="text-sm font-medium">Galinhas</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.totalChickens}
                  </div>
                </div>

                {/* Galos */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <User2 className="h-5 w-5 text-blue-500 mr-1" />
                    <span className="text-sm font-medium">Galos</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.totalRoosters}
                  </div>
                </div>

                {/* Fêmeas Mortas */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDownIcon className="h-5 w-5 text-red-500 mr-1" />
                    <span className="text-sm font-medium">Fêmeas Mortas</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.deadFemales}
                  </div>
                </div>

                {/* Machos Mortos */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDownIcon className="h-5 w-5 text-red-500 mr-1" />
                    <span className="text-sm font-medium">Machos Mortos</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.deadMales}
                  </div>
                </div>

                {/* Mortalidade Fêmeas */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDownIcon className="h-5 w-5 text-red-500 mr-1" />
                    <span className="text-sm font-medium">Mortalidade Fêmeas</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.femaleMortality.toFixed(1)}%
                  </div>
                </div>

                {/* Mortalidade Machos */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDownIcon className="h-5 w-5 text-red-500 mr-1" />
                    <span className="text-sm font-medium">Mortalidade Machos</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.maleMortality.toFixed(1)}%
                  </div>
                </div>

                {/* Mortalidade Geral */}
                <div className="bg-white p-4 rounded border border-gray-100 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDownIcon className="h-5 w-5 text-red-500 mr-1" />
                    <span className="text-sm font-medium">Mortalidade Geral</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.generalMortality.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};