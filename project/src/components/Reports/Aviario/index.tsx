import React from 'react';
import { Card } from 'antd';
import { AviaryReport } from '../../../@types/reportTypes';
import { getAviaryId, getAviaryName } from '../../../utils/aviaryUtils';
import { createCompleteEggTable } from '../../../utils/eggTypesUtils';

interface AviarioProps {
  aviary: AviaryReport;
  open: boolean;
  toggle: () => void;
}

export const Aviario: React.FC<AviarioProps> = ({ aviary, open, toggle }) => {
  const aviaryId = getAviaryId(aviary);
  const aviaryName = getAviaryName(aviary);
  
  // ✅ Criar tabela completa de ovos
  const eggTable = createCompleteEggTable(aviary.eggCollections);

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow border border-gray-200">
      <button
        onClick={toggle}
        className="w-full text-left font-semibold text-lg hover:text-blue-600 transition"
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-700">
            🏠 {aviaryName} - 
            Ovos: {aviary.totalEggsCollected?.toLocaleString() || 0}, 
            Mortes: {aviary.totalDeadBirds?.toLocaleString() || 0}, 
            Produção: {aviary.production?.toFixed(1) || 0}%
          </span>
          <span className="text-2xl text-gray-500">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="mt-6 space-y-6">
          
          {/* ✅ Tabela de Ovos Coletados */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
              <h4 className="font-semibold text-gray-700">🥚 Ovos Coletados no Dia</h4>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Tipo de Ovo</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-700">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eggTable.map((egg, index) => (
                      <tr key={egg.type} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-3 text-gray-700">{egg.translatedType}</td>
                        <td className="py-2 px-3 text-center font-medium text-gray-700">
                          {egg.quantity.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300 bg-gray-100">
                      <td className="py-2 px-3 font-bold text-gray-800">Total Geral</td>
                      <td className="py-2 px-3 text-center font-bold text-gray-800">
                        {aviary.totalEggsCollected?.toLocaleString() || 0}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* ✅ Informações do Plantel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-gray-700">{aviary.currentChickens}</div>
              <div className="text-sm text-gray-600">🐔 Fêmeas Atuais</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-gray-700">{aviary.currentRoosters}</div>
              <div className="text-sm text-gray-600">🐓 Machos Atuais</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-gray-700">{aviary.totalDeadChickens}</div>
              <div className="text-sm text-gray-600">🐔 Fêmeas Mortas</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-gray-700">{aviary.totalDeadRoosters}</div>
              <div className="text-sm text-gray-600">🐓 Machos Mortos</div>
            </div>
          </div>

          {/* ✅ Indicadores de Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-gray-700">
                {aviary.mortality?.toFixed(2) || 0}%
              </div>
              <div className="text-sm text-gray-600">💀 Taxa de Mortalidade</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-xl font-bold text-gray-700">
                {aviary.production?.toFixed(1) || 0}%
              </div>
              <div className="text-sm text-gray-600">📈 Produção Total</div>
            </div>
          </div>

          {/* Dados Ambientais (se disponíveis) */}
          {(aviary.waterQuantity || aviary.temperature) && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-3">🌡️ Dados Ambientais</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aviary.waterQuantity && (
                  <div className="text-center p-3 bg-white rounded border border-gray-200">
                    <div className="text-lg font-bold text-gray-700">{aviary.waterQuantity}L</div>
                    <div className="text-sm text-gray-600">💧 Água Consumida</div>
                  </div>
                )}
                {aviary.temperature && (
                  <div className="text-center p-3 bg-white rounded border border-gray-200">
                                        <div className="text-lg font-bold text-gray-700">
                      {aviary.temperature.min}° - {aviary.temperature.max}°C
                    </div>
                    <div className="text-sm text-gray-600">🌡️ Temperatura (Min - Max)</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

