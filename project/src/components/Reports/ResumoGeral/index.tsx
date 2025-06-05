import React from 'react';
import { CardSummary } from '../CardSummary';
import { ResumoGeralProps } from './types';


export const ResumoGeral: React.FC<ResumoGeralProps> = ({ summary }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">📈 Resumo Geral</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <CardSummary label="🥚 Ovos coletados" value={summary.totalEggsCollected.toLocaleString()} />
        <CardSummary label="🐔 Galinhas" value={summary.currentChickens.toLocaleString()} />
        <CardSummary label="🐓 Galos" value={summary.currentRoosters.toLocaleString()} />
        <CardSummary label="⚰️ Mortes totais" value={summary.totalDeadBirds.toLocaleString()} />
        <CardSummary label="📊 Produção" value={`${summary.production.toFixed(1)}%`} />
      </div>
    </div>
  );
};
