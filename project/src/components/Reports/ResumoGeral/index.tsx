import React from 'react';
import { Card } from 'antd';
import { ReportData } from '../../../@types/reportTypes';

interface ResumoGeralProps {
  summary: ReportData;
}

export const ResumoGeral: React.FC<ResumoGeralProps> = ({ summary }) => {
  return (
    <Card title="📊 Resumo Geral do Dia" className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Produção de Ovos */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.totalEggsCollected?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">🥚 Ovos Coletados</div>
        </div>

        {/* Produção % */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.production?.toFixed(1) || 0}%
          </div>
          <div className="text-sm text-gray-600">📈 Produção</div>
        </div>

        {/* Aves Vivas */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.totalBirds?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">🐦 Aves Vivas</div>
        </div>

        {/* Fêmeas */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.currentChickens?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">🐔 Fêmeas</div>
        </div>

        {/* Machos */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.currentRoosters?.toLocaleString() || 0}
          </div>
          <div className="text-sm text-gray-600">🐓 Machos</div>
        </div>

        {/* ✅ Relação Macho/Fêmea */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.chickenRoosterProportion?.toFixed(1) || 0}:1
          </div>
          <div className="text-sm text-gray-600">⚖️ Relação M/F</div>
        </div>
      </div>

      {/* Detalhes de Mortalidade */}
      {(summary.totalDeadBirds > 0) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-3 text-gray-700">📋 Mortalidade do Dia</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded border border-gray-200">
              <div className="text-lg font-bold text-gray-700">
                {summary.totalDeadChickens?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600">🐔 Fêmeas Mortas</div>
            </div>
            <div className="text-center p-3 bg-white rounded border border-gray-200">
              <div className="text-lg font-bold text-gray-700">
                {summary.totalDeadRoosters?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600">🐓 Machos Mortos</div>
            </div>
            <div className="text-center p-3 bg-white rounded border border-gray-200">
              <div className="text-lg font-bold text-gray-700">
                {summary.totalDeadBirds?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-600">🐦 Total de Mortes</div>
            </div>
            <div className="text-center p-3 bg-white rounded border border-gray-200">
              <div className="text-lg font-bold text-gray-700">
                {summary.mortality?.toFixed(2) || 0}%
              </div>
              <div className="text-sm text-gray-600">💀 Taxa Mortalidade</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
