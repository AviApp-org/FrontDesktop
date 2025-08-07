import React from 'react';
import { DailyReportData } from '../../../@types/DailyReportData'; 

interface ResumoGeralProps {
  summary: DailyReportData;
}

export const ResumoGeral: React.FC<ResumoGeralProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">📊</span> Resumo Geral do Dia
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Produção de Ovos */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-gray-800">
            {summary.totalEggsCollected?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
            <span className="mr-1">🥚</span> Ovos Coletados
          </div>
        </div>

        {/* Produção % */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-gray-800">
            {summary.production?.toFixed(1) || 0}%
          </div>
          <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
            <span className="mr-1">📈</span> Produção
          </div>
        </div>

        {/* Aves Vivas */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-gray-800">
            {summary.totalBirds?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
            <span className="mr-1">🐦</span> Aves Vivas
          </div>
        </div>

        {/* Fêmeas */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-gray-800">
            {summary.currentChickens?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
            <span className="mr-1">🐔</span> Fêmeas
          </div>
        </div>

        {/* Machos */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-gray-800">
            {summary.currentRoosters?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
            <span className="mr-1">🐓</span> Machos
          </div>
        </div>

        {/* Relação Macho/Fêmea */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-gray-800">
            {summary.chickenRoosterProportion?.toFixed(1) || 0}:1
          </div>
          <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
            <span className="mr-1">⚖️</span> Relação M/F
          </div>
        </div>
      </div>

      {/* Detalhes de Mortalidade */}
      {(summary.totalDeadBirds > 0) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
            <span className="mr-2">📋</span> Mortalidade do Dia
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="text-lg font-bold text-gray-800">
                {summary.totalDeadChickens?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                <span className="mr-1">🐔</span> Fêmeas Mortas
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="text-lg font-bold text-gray-800">
                {summary.totalDeadRoosters?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                <span className="mr-1">🐓</span> Machos Mortos
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="text-lg font-bold text-gray-800">
                {summary.totalDeadBirds?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                <span className="mr-1">🐦</span> Total de Mortes
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="text-lg font-bold text-gray-800">
                {summary.mortality?.toFixed(2) || 0}%
              </div>
              <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
                <span className="mr-1">💀</span> Taxa Mortalidade
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};