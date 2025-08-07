import React from 'react';

interface ResumoSemanalProps {
  reportData: any;
  reportType: 'Semanal' | 'Mensal';
  currentDateIndex: number;
  totalDays: number;
}

export const ResumoSemanal: React.FC<ResumoSemanalProps> = ({ 
  reportData, 
  reportType, 
  currentDateIndex, 
  totalDays 
}) => {
  const periodText = reportType === 'Semanal' ? 'Semana' : 'Mês';
  const daysText = reportType === 'Semanal' ? '7 dias' : '30 dias';
  
  // Dados consolidados simulados baseados no dia atual
  const consolidatedData = {
    averageProduction: reportData.production * 0.95,
    averageMortality: reportData.mortality * 1.1,
    maleFemaleProportion: reportData.chickenRoosterProportion || 0,
    totalEggs: reportData.totalEggsCollected * (reportType === 'Semanal' ? 7 : 30),
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg border-l-4 border-l-blue-500 p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">📊</span> Resumo Geral da {periodText} ({daysText})
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Produção */}
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-gray-600 flex items-center justify-center mb-2">
            <span className="mr-1">📈</span> % de Produção
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {consolidatedData.averageProduction.toFixed(1)}%
          </div>
        </div>

        {/* Mortalidade */}
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-gray-600 flex items-center justify-center mb-2">
            <span className="mr-1">💀</span> % de Mortalidade
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {consolidatedData.averageMortality.toFixed(2)}%
          </div>
        </div>

        {/* Relação Macho/Fêmea */}
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-gray-600 flex items-center justify-center mb-2">
            <span className="mr-1">⚖️</span> Relação Macho e Fêmea
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {consolidatedData.maleFemaleProportion.toFixed(2)}
          </div>
        </div>

        {/* Total de Ovos */}
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-gray-600 flex items-center justify-center mb-2">
            <span className="mr-1">🥚</span> Total de Ovos
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {consolidatedData.totalEggs.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <div className="text-sm text-blue-700 text-center flex flex-wrap justify-center items-center gap-1">
          <span>📊 Resumo consolidado da {periodText.toLowerCase()}</span>
          <span>•</span>
          <span>Dia {currentDateIndex + 1} de {totalDays}</span>
          <span>•</span>
          <span>Use as setas para navegar entre os dias</span>
        </div>
      </div>
    </div>
  );
};