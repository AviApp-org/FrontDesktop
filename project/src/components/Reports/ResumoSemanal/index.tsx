import React from 'react';
import { Card } from 'antd';
import { SummaryData } from '../../../@types/reportTypes';

interface ResumoSemanalProps {
  summary: SummaryData;
  type: 'Semanal' | 'Mensal';
}

export const ResumoSemanal: React.FC<ResumoSemanalProps> = ({ summary, type }) => {
  return (
    <Card title={`📊 Resumo ${type} - ${summary.period}`} className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Período */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">{summary.totalDays}</div>
          <div className="text-sm text-gray-600">📅 Dias</div>
        </div>

        {/* Total de Ovos */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.totalEggs.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">🥚 Total Ovos</div>
        </div>

        {/* Média Diária de Ovos */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.avgEggsPerDay.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">🥚 Média/Dia</div>
        </div>

        {/* Produção Média */}
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.avgProduction.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">📈 Produção Média</div>
        </div>
      </div>

      {/* Dados de Plantel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.avgChickens.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">🐔 Fêmeas Médias</div>
        </div>

        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.avgRoosters.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">🐓 Machos Médios</div>
        </div>

        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.totalDeaths.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">💀 Total Mortes</div>
        </div>

        <div className="text-center p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-gray-700">
            {summary.avgMortality.toFixed(2)}%
          </div>
          <div className="text-sm text-gray-600">💀 Mortalidade Média</div>
        </div>
      </div>
    </Card>
  );
};
