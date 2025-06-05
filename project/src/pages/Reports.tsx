import React from 'react';
import { useReports } from '../hooks/useReports';
import { ReportFilters } from '../components/Reports/ReportFilters';
import { ResumoGeral } from '../components/Reports/ResumoGeral';
import { ResumoSemanal } from '../components/Reports/ResumoSemanal';
import { Aviario } from '../components/Reports/Aviario';
import { 
  EmptyStateNoDate, 
  EmptyStateWaiting, 
  EmptyStateNoData,
  EmptyStateNoAviaries,
  ErrorState, 
  LoadingState 
} from '../components/Reports/EmptyStates';
import { formatDateForDisplay } from '../utils/formatDate';

const Reports: React.FC = () => {
  const {
    reportType,
    selectedDate,
    batchId,
    loading,
    reportData,
    summaryData,
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
        {selectedDate && (reportType === 'Diário' ? ` - ${formatDateForDisplay(selectedDate)}` : 
         reportType === 'Semanal' ? ` - Semana de ${formatDateForDisplay(selectedDate)}` :
         ` - Mês de ${formatDateForDisplay(selectedDate)}`)}
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

      {/* Estados de erro */}
      {error && <ErrorState error={error} onRetry={fetchReport} />}

      {/* Loading */}
      {loading && <LoadingState reportType={reportType} />}

      {/* ✅ Conteúdo do Relatório DIÁRIO */}
      {reportData && !loading && reportType === 'Diário' && (
        <>
          <ResumoGeral summary={reportData} />
          
          {/* ✅ Lista de Aviários - Sempre mostrar seção */}
          <div className="mb-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                <h2 className="text-xl font-semibold text-gray-800">
                  🏠 Aviários ({reportData.aviaryReports?.length || 0})
                </h2>
              </div>
              
              <div className="p-6">
                {/* ✅ Verificar se há aviários válidos */}
                {reportData.aviaryReports && reportData.aviaryReports.length > 0 ? (
                  <div className="space-y-4">
                    {reportData.aviaryReports.map((aviary) => {
                      // ✅ Usar ID mais flexível
                      const aviaryId = aviary.aviaryId || aviary.id || Math.random();
                      const isExpanded = isAviaryExpanded(aviaryId);
                      
                      return (
                        <Aviario
                          key={String(aviaryId)}
                          aviary={aviary}
                          open={isExpanded}
                          toggle={() => toggleAviario(aviaryId)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  /* ✅ Estado vazio para aviários */
                  <EmptyStateNoAviaries 
                    hasReportData={true}
                    totalEggs={reportData.totalEggsCollected || 0}
                    totalDeaths={reportData.totalDeadBirds || 0}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Conteúdo do Relatório SEMANAL/MENSAL */}
      {summaryData && !loading && (reportType === 'Semanal' || reportType === 'Mensal') && (
        <ResumoSemanal summary={summaryData} type={reportType} />
      )}

      {/* ✅ Estados vazios melhorados */}
      {!selectedDate && !loading && <EmptyStateNoDate reportType={reportType} />}
      
      {selectedDate && !reportData && !summaryData && !loading && !error && (
        <EmptyStateWaiting selectedDate={selectedDate} />
      )}
      
      {/* ✅ Estado quando não há dados mas não há erro */}
      {selectedDate && !reportData && !summaryData && !loading && !error && (
        <EmptyStateNoData 
          selectedDate={selectedDate} 
          batchId={batchId} 
          onRetry={fetchReport} 
        />
      )}
    </div>
  );
};

export default Reports;
