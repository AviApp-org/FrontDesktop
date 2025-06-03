import React from 'react';
import { Alert } from 'antd';
import { ReportFilters } from '../components/ReportFilters';
import { ReportsList } from '../components/ReportsList';
import { ReportDetailsModal } from '../components/ReportDetailsModal';
import { useReportsManagement } from '../hooks/useReportsManagement';
import { ReportModalProps, ReportCardProps } from '../components/TypesReport/types';

const ReportsPage: React.FC = () => {
  const {
    filters,
    dailyReports,
    weeklyReports,
    selectedReport,
    isLoading,
    error,
    batches,
    aviaries,
    handleFilterChange,
    handleSearch,
    handleReportSelect,
    handleCloseModal,
    exportReport,
  } = useReportsManagement();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Relatórios de Produção
          </h1>
          <p className="text-gray-600">
            Visualize e analise os dados de produção da sua granja
          </p>
        </div>

        {error && (
          <Alert
            message="Erro ao carregar dados"
            description={error}
            type="error"
            showIcon
            closable
            className="mb-6"
          />
        )}

        <ReportFilters
          filters={filters}
          batches={batches}
          aviaries={aviaries}
          isLoading={isLoading}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        <ReportsList
          type={filters.type}
          dailyReports={dailyReports}
          weeklyReports={weeklyReports}
          isLoading={isLoading}
          onReportSelect={handleReportSelect}
          onExport={exportReport}
        />

        {selectedReport && (
          <ReportDetailsModal
            report={selectedReport}
            type={filters.type}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
