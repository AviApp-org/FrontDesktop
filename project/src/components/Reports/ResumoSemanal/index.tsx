import React from 'react';
import { Card } from 'antd';
import { ResumoSemanalProps } from './types';
import { CardSummary } from '../CardSummary';

export const ResumoSemanal: React.FC<ResumoSemanalProps> = ({ summary, type }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        📈 Resumo {type} - {summary.period}
      </h2>
      
      {/* Informações do período */}
      <Card className="mb-4">
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold mb-2">📅 Período Analisado</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">{summary.totalDays}</div>
              <div className="text-sm text-gray-600">Dias com dados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{summary.totalEggs.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total de ovos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{summary.totalDeaths.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total de mortes</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Médias diárias */}
      <h3 className="text-lg font-semibold mb-3">📊 Médias Diárias</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <CardSummary 
          label="🥚 Ovos/dia" 
          value={summary.avgEggsPerDay.toFixed(0)} 
        />
        <CardSummary 
          label="🐔 Galinhas (média)" 
          value={summary.avgChickens.toFixed(0)} 
        />
        <CardSummary 
          label="🐓 Galos (média)" 
          value={summary.avgRoosters.toFixed(0)} 
        />
        <CardSummary 
          label="⚰️ Mortes/dia" 
          value={summary.avgDeathsPerDay.toFixed(1)} 
        />
        <CardSummary 
          label="📈 Produção média" 
          value={`${summary.avgProduction.toFixed(1)}%`} 
        />
        <CardSummary 
          label="💀 Mortalidade média" 
          value={`${summary.avgMortality.toFixed(2)}%`} 
        />
      </div>
    </div>
  );
};
