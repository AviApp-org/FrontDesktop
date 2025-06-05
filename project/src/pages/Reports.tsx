import React from 'react';
import { useReports } from '../hooks/useReports';
import { formatDateForDisplay } from '../utils/reportUtils';

// Componentes
import { ReportFilters } from '../components/Reports/ReportFilters';
import { LoadingState } from '../components/Reports/LoadingState';
import { ErrorState } from '../components/Reports/ErrorState';
import { EmptyStateNoDate, EmptyStateWaiting } from '../components/Reports/EmptyStates';
import { ResumoGeral } from '../components/Reports/ResumoGeral';
import { ResumoSemanal } from '../components/Reports/ResumoSemanal';
import { DistribuicaoOvos } from '../components/Reports/DistribuicaoOvos';
import { Aviario } from '../components/Reports/Aviario';

const Reports: React.FC = () => {
  const {
    reportType,
    selectedDate,
    batchId,
    loading,
    reportData,
    summaryData,
    error,
    openAviaries,
    setSelectedDate,
    setBatchId,
    handleReportTypeChange,
    fetchReport,
    toggleAviario,
  } = useReports();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
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

      {/* Conteúdo do Relatório DIÁRIO */}
      {reportData && !loading && reportType === 'Diário' && (
        <>
          <ResumoGeral summary={reportData} />
          <DistribuicaoOvos eggTypes={reportData.percentageByEggType} />
          <div className="space-y-4">
            {reportData.aviaryReports.map((aviary) => (
              <Aviario
                key={aviary.aviaryId}
                aviary={aviary}
                open={!!openAviaries[aviary.aviaryId]}
                toggle={() => toggleAviario(aviary.aviaryId)}
              />
            ))}
          </div>
        </>
      )}

      {/* Conteúdo do Relatório SEMANAL/MENSAL */}
      {summaryData && !loading && (reportType === 'Semanal' || reportType === 'Mensal') && (
        <>
          <ResumoSemanal summary={summaryData} type={reportType} />
          <DistribuicaoOvos eggTypes={summaryData.eggTypesAverage} />
        </>
      )}

      {/* Estados vazios */}
      {!selectedDate && !loading && <EmptyStateNoDate reportType={reportType} />}
      
      {selectedDate && !reportData && !summaryData && !loading && !error && (
        <EmptyStateWaiting selectedDate={selectedDate} />
      )}
    </div>
  );
};

export default Reports;
