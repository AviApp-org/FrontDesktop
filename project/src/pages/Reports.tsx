import React from 'react';
import { useReports } from '../hooks/useReports';
import { ReportFilters } from '../components/Reports/ReportFilters';
import { ResumoGeral } from '../components/Reports/ResumoGeral';
import { Aviario } from '../components/Reports/Aviario';
import { formatDateForDisplay } from '../utils/formatDate';

const Reports: React.FC = () => {
  const {
    reportType,
    selectedDate,
    batchId,
    loading,
    reportData,
    error,
    setSelectedDate,
    setBatchId,
    handleReportTypeChange,
    fetchReport,
    toggleAviario,
    isAviaryExpanded,
  } = useReports();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📊 Relatório {reportType} 
        {selectedDate && ` - ${formatDateForDisplay(selectedDate)}`}
      </h1>

      {/* Filtros */}
      <ReportFilters
        reportType={reportType}
        selectedDate={selectedDate}
        batchId={batchId}
        loading={loading}
        onReportTypeChange={handleReportTypeChange}
        onDateChange={setSelectedDate}
        onBatchChange={setBatchId}
        onSearch={fetchReport}
      />

      {/* Erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">❌ {error}</p>
          <button 
            onClick={fetchReport}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏳</div>
          <h3 className="text-xl font-semibold text-gray-600">
            Carregando relatório...
          </h3>
        </div>
      )}

      {/* ✅ Relatório Diário */}
      {reportData && !loading && reportType === 'Diário' && (
        <>
          <ResumoGeral summary={reportData} />
          
          {/* ✅ Lista de Aviários - Simples e direto */}
          <div className="mb-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                <h2 className="text-xl font-semibold text-gray-800">
                  🏠 Aviários ({reportData.aviaryReports?.length || 0})
                </h2>
              </div>
              
              <div className="p-6">
                {reportData.aviaryReports && reportData.aviaryReports.length > 0 ? (
                  <div className="space-y-4">
                    {reportData.aviaryReports.map((aviary: any, index: number) => {
                      const isExpanded = isAviaryExpanded(index);
                      
                      return (
                        <Aviario
                          key={index}
                          aviary={aviary}
                          open={isExpanded}
                          toggle={() => toggleAviario(index)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Nenhum aviário encontrado para esta data.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Estado vazio */}
      {!selectedDate && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Selecione uma data
          </h3>
          <p className="text-gray-500">
            Escolha uma data para visualizar o relatório.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;
