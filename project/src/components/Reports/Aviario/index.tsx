import React from 'react';
import { Card } from 'antd';
import { AviaryReport, translateEggType } from '../../../@types/reportTypes';

interface AviarioProps {
  aviary: AviaryReport;
  open: boolean;
  toggle: () => void;
}

export const Aviario: React.FC<AviarioProps> = ({ aviary, open, toggle }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow border border-gray-200">
      <button
        onClick={toggle}
        className="w-full text-left font-semibold text-lg hover:text-blue-600 transition"
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-700">
            🏠 {aviary.name} - 
            Ovos: {aviary.totalEggsCollected?.toLocaleString() || 0}, 
            Mortes: {aviary.totalDeadBirds?.toLocaleString() || 0}, 
            Produção: {(aviary.production * 100)?.toFixed(1) || 0}%
          </span>
          <span className="text-2xl text-gray-500">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="mt-6 space-y-6">
          
          {/* ✅ Tabela de Ovos - Dados diretos do backend */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
              <h4 className="font-semibold text-gray-700">🥚 Ovos Coletados</h4>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Tipo</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-700">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aviary.quantityByEggType?.map((egg, index) => (
                      <tr key={egg.type} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-3 text-gray-700">
                          {translateEggType(egg.type)}
                        </td>
                        <td className="py-2 px-3 text-center font-medium text-gray-700">
                          {egg.quantity.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300 bg-gray-100">
                      <td className="py-2 px-3 font-bold text-gray-800">Total</td>
                      <td className="py-2 px-3 text-center font-bold text-gray-800">
                        {aviary.totalEggsCollected?.toLocaleString() || 0}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* ✅ Cards com dados do plantel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-gray-700">{aviary.currentChickens}</div>
              <div className="text-sm text-gray-600">🐔 Fêmeas</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-gray-700">{aviary.currentRoosters}</div>
              <div className="text-sm text-gray-600">🐓 Machos</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-red-600">{aviary.totalDeadChickens}</div>
              <div className="text-sm text-gray-600">💀 Fêmeas Mortas</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-red-600">{aviary.totalDeadRoosters}</div>
              <div className="text-sm text-gray-600">💀 Machos Mortos</div>
            </div>
          </div>

          {/* ✅ Indicadores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xl font-bold text-blue-700">
                {(aviary.production * 100)?.toFixed(1)}%
              </div>
              <div className="text-sm text-blue-600">📈 Produção</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xl font-bold text-red-700">
                {(aviary.mortality * 100)?.toFixed(2)}%
              </div>
              <div className="text-sm text-red-600">💀 Mortalidade</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xl font-bold text-green-700">{aviary.marketEggs}</div>
              <div className="text-sm text-green-600">🥚 Ovos Mercado</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
