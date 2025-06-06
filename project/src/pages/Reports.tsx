import React from 'react';
import { useReports } from '../hooks/useReports';
import { ReportFilters } from '../components/Reports/ReportFilters';
import { DateNavigation } from '../components/Reports/DateNavigation';
import { ResumoGeral } from '../components/Reports/ResumoGeral';
import { ResumoSemanal } from '../components/Reports/ResumoSemanal'; // ✅ Import
import { Aviario } from '../components/Reports/Aviario';
import { EmptyStateNoDate, EmptyStateNoAviaries, LoadingState } from '../components/Reports/EmptyStates';
import { normalizeAviaryData, isValidAviaryData } from '../utils/aviaryUtils';

const Reports: React.FC = () => {
  const {
    reportType,
    selectedDate,
    batchId,
    loading,
    reportData,
    error,
    currentDate,
    currentDateIndex,
    dateRange,
    canGoPrevious,
    canGoNext,
    setSelectedDate,
    setBatchId,
    handleReportTypeChange,
    fetchReport,
    toggleAviario,
    isAviaryExpanded,
    goToPreviousDay,
    goToNextDay,
    goToSpecificDay,
    formatDateForDisplay,
  } = useReports();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📊 Relatório {reportType} 
        {currentDate && ` - ${formatDateForDisplay(currentDate)}`}
      </h1>

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

      {reportData && dateRange.length > 1 && (
        <DateNavigation
          reportType={reportType}
          currentDate={currentDate}
          currentDateIndex={currentDateIndex}
          dateRange={dateRange}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          onPrevious={goToPreviousDay}
          onNext={goToNextDay}
          onGoToDay={goToSpecificDay}
          formatDateForDisplay={formatDateForDisplay}
        />
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">❌ {error}</p>
          <button onClick={fetchReport} className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Tentar Novamente
          </button>
        </div>
      )}

      {loading && <LoadingState reportType={reportType} />}
      {!selectedDate && !loading && <EmptyStateNoDate reportType={reportType} />}

      {reportData && !loading && (
        <>
          {/* ✅ RESUMO CONSOLIDADO usando ResumoSemanal */}
          {reportType !== 'Diário' && (
            <ResumoSemanal
              reportData={reportData}
              reportType={reportType}
              currentDateIndex={currentDateIndex}
              totalDays={dateRange.length}
            />
          )}
          
          {/* Resumo Geral do Dia */}
          <ResumoGeral summary={reportData} />
          
          {/* Lista de Aviários */}
          <div className="mb-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                <h2 className="text-xl font-semibold text-gray-800">
                  🏠 Aviários do Lote {batchId}
                  {reportType !== 'Diário' && (
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      ({reportType} - Dia {currentDateIndex + 1})
                    </span>
                  )}
                </h2>
              </div>
              
              <div className="p-6">
                {(() => {
                  const aviaries = reportData.aviaryReports || [];
                  const validAviaries = aviaries
                    .filter(isValidAviaryData)
                    .map(normalizeAviaryData);
                  
                  if (validAviaries.length === 0) {
                    return (
                      <EmptyStateNoAviaries 
                        hasReportData={true}
                        totalEggs={reportData.totalEggsCollected || 0}
                        totalDeaths={reportData.totalDeadBirds || 0}
                      />
                    );
                  }
                  
                  return (
                    <div className="space-y-4">
                      {validAviaries.map((aviary, index) => (
                        <Aviario
                          key={`${aviary.aviaryId}-${index}`}
                          aviary={aviary}
                          open={isAviaryExpanded(index)}
                          toggle={() => toggleAviario(index)}
                        />
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
