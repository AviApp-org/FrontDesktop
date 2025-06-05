import React from 'react';
import { Card } from 'antd';
import { translateEggType } from '../../../@types/reportTypes';
import { AviarioProps } from './types';

export const Aviario: React.FC<AviarioProps> = ({ aviary, open, toggle }) => {
  return (
    <Card className="mb-4">
      <button
        onClick={toggle}
        className="w-full text-left font-semibold text-lg hover:text-blue-600 transition"
      >
        <div className="flex justify-between items-center">
          <span>
            🏠 {aviary.aviaryName || `Aviário ${aviary.aviaryId}`} - 
            Ovos: {aviary.totalEggsCollected.toLocaleString()}, 
            Mortes: {aviary.totalDeadBirds.toLocaleString()}, 
            Produção: {aviary.production.toFixed(1)}%
          </span>
          <span>{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {/* Resumo do Aviário */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{aviary.currentChickens}</div>
              <div className="text-sm text-gray-600">🐔 Galinhas</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{aviary.currentRoosters}</div>
              <div className="text-sm text-gray-600">🐓 Galos</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{aviary.production.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">📈 Produção</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{aviary.mortality.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">💀 Mortalidade</div>
            </div>
          </div>

          {/* Coletas de Ovos */}
          {aviary.eggCollections && aviary.eggCollections.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">🥚 Coletas de Ovos</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Hora</th>
                      <th className="border border-gray-300 p-2">Tipo</th>
                      <th className="border border-gray-300 p-2">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aviary.eggCollections.map((collection, i) =>
                      collection.eggDetails.map((egg, j) => (
                        <tr key={`${i}-${j}`} className="text-center">
                          <td className="border border-gray-300 p-2">{collection.collectionTime}</td>
                          <td className="border border-gray-300 p-2">{translateEggType(egg.type)}</td>
                          <td className="border border-gray-300 p-2">{egg.quantity.toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Registros de Mortes */}
          {aviary.deathRecords && aviary.deathRecords.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">💀 Registros de Mortes</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Hora</th>
                      <th className="border border-gray-300 p-2">Galinhas</th>
                      <th className="border border-gray-300 p-2">Galos</th>
                      <th className="border border-gray-300 p-2">Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aviary.deathRecords.map((death, i) => (
                      <tr key={i} className="text-center">
                        <td className="border border-gray-300 p-2">{death.recordTime}</td>
                        <td className="border border-gray-300 p-2">{death.deadChickens.toLocaleString()}</td>
                        <td className="border border-gray-300 p-2">{death.deadRoosters.toLocaleString()}</td>
                        <td className="border border-gray-300 p-2">{death.observations || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Caso não tenha dados */}
          {(!aviary.eggCollections || aviary.eggCollections.length === 0) && 
           (!aviary.deathRecords || aviary.deathRecords.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📋</div>
              <p>Nenhum registro detalhado disponível para este aviário</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
