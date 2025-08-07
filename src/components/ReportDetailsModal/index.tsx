import React from 'react';
import { DailyReportData } from '../../@types/DailyReportData';
import { WeeklyReportData } from '../../@types/WeeklyReportData';
import { ReportDetailsModalProps } from './types';

export const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  visible,
  report,
  onClose
}) => {
  if (!report) return null;

  const isDailyReport = 'aviaryReports' in report;

  // Renderizar relatório diário
  const renderDailyReport = (dailyReport: DailyReportData) => {
    const eggTypeColumns = [
      {
        header: 'Tipo de Ovo',
        accessor: 'type',
        render: (type: string) => {
          const typeLabels: Record<string, string> = {
            TOTAL: 'Total',
            CRACKED: 'Rachados',
            NEST_DIRTY: 'Sujos de Ninho',
            SMALL: 'Pequenos',
            INCUBATABLE: 'Incubáveis',
            DOUBLE_YOLK: 'Gema Dupla',
            BROKEN: 'Quebrados',
            DEFORMED: 'Deformados',
            THIN_SHELL: 'Casca Fina',
            ELIMINATED: 'Eliminados',
            MARKET: 'Mercado'
          };
          return typeLabels[type] || type;
        }
      },
      {
        header: 'Quantidade',
        accessor: 'quantity',
        render: (value: number) => value?.toLocaleString('pt-BR') || '0',
      },
      {
        header: 'Percentual',
        accessor: 'percentage',
        render: (value: number) => `${(value || 0).toFixed(2)}%`,
      },
    ];

    const aviaryColumns = [
      {
        header: 'Aviário',
        accessor: 'aviaryName',
      },
      {
        header: 'Ovos Coletados',
        accessor: 'eggsCollected',
        render: (value: number) => value?.toLocaleString('pt-BR') || '0',
      },
      {
        header: 'Mortes',
        accessor: 'deaths',
        render: (value: number) => value?.toLocaleString('pt-BR') || '0',
      },
      {
        header: 'Temperatura (°C)',
        accessor: 'temperature',
        render: (temp: { min: number; max: number }) => 
          temp ? `${temp.min}° - ${temp.max}°` : 'N/A',
      },
    ];

    const renderTable = (columns: any[], data: any[], rowKey: string) => {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th 
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, rowIndex) => (
                <tr key={item[rowKey] || rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {column.render ? column.render(item[column.accessor], item) : item[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total de Ovos</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {(dailyReport.totalEggsCollected || 0).toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Aves Vivas</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {(dailyReport.totalBirds || 0).toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Produção</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {(dailyReport.production || 0).toFixed(2)}%
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Mortalidade</h3>
            <p 
              className={`mt-1 text-2xl font-semibold ${
                (dailyReport.mortality || 0) > 5 ? 'text-red-600' : 
                (dailyReport.mortality || 0) > 2 ? 'text-yellow-600' : 'text-green-600'
              }`}
            >
              {(dailyReport.mortality || 0).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Detalhes por Aviário */}
        {dailyReport.aviaryReports && dailyReport.aviaryReports.length > 0 && (
          <div className="bg-white rounded-lg shadow mb-4 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Relatórios por Aviário</h3>
            {renderTable(aviaryColumns, dailyReport.aviaryReports, 'aviaryName')}
          </div>
        )}

        {/* Distribuição de Ovos por Tipo */}
        {dailyReport.quantityByEggType && dailyReport.quantityByEggType.length > 0 && (
          <div className="bg-white rounded-lg shadow mb-4 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Distribuição de Ovos por Tipo</h3>
            {renderTable(
              eggTypeColumns, 
              dailyReport.quantityByEggType.map((item, index) => ({
                ...item,
                percentage: dailyReport.percentageByEggType?.[index]?.percentage || 0
              })), 
              'type'
            )}
          </div>
        )}

        {/* Informações Adicionais */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h3 className="text-lg font-medium text-gray-900 p-4 border-b">Informações Detalhadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div>
              <p className="text-sm text-gray-500">Galinhas Atuais</p>
              <p className="text-sm font-medium">{(dailyReport.currentChickens || 0).toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Galos Atuais</p>
              <p className="text-sm font-medium">{(dailyReport.currentRoosters || 0).toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mortes de Galinhas</p>
              <p className="text-sm font-medium">{(dailyReport.totalDeadChickens || 0).toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mortes de Galos</p>
              <p className="text-sm font-medium">{(dailyReport.totalDeadRoosters || 0).toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Mortes</p>
              <p className="text-sm font-medium">{(dailyReport.totalDeadBirds || 0).toLocaleString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Proporção Galinha/Galo</p>
              <p className="text-sm font-medium">{(dailyReport.chickenRoosterProportion || 0).toFixed(2)}:1</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mortalidade Galinhas</p>
              <p className="text-sm font-medium">{(dailyReport.chickenMortality || 0).toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mortalidade Galos</p>
              <p className="text-sm font-medium">{(dailyReport.roosterMortality || 0).toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ovos Descartados</p>
              <p className="text-sm font-medium">{(dailyReport.dumpEggs || 0).toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar relatório semanal
  const renderWeeklyReport = (weeklyReport: WeeklyReportData) => {
    const dailyColumns = [
      {
        header: 'Data',
        accessor: 'date',
        render: (date: string) => new Date(date).toLocaleDateString('pt-BR'),
      },
      {
        header: 'Ovos Coletados',
        accessor: 'totalEggsCollected',
        render: (value: number) => (value || 0).toLocaleString('pt-BR'),
      },
      {
        header: 'Produção (%)',
        accessor: 'production',
        render: (value: number) => `${(value || 0).toFixed(2)}%`,
      },
      {
        header: 'Mortalidade (%)',
        accessor: 'mortality',
        render: (value: number) => {
          const mortality = value || 0;
          const colorClass = mortality > 5 ? 'bg-red-100 text-red-800' : 
                            mortality > 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
          return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
              {mortality.toFixed(2)}%
            </span>
          );
        },
      },
      {
        header: 'Aves Vivas',
        accessor: 'totalBirds',
        render: (value: number) => (value || 0).toLocaleString('pt-BR'),
      },
    ];

    const renderTable = (columns: any[], data: any[], rowKey: string) => {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th 
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, rowIndex) => (
                <tr key={item[rowKey] || rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {column.render ? column.render(item[column.accessor], item) : item[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    // Calcular estatísticas da semana
    const dailyReports = weeklyReport.dailyReports || [];
    const totalEggs = dailyReports.reduce((sum, report) => sum + (report.totalEggsCollected || 0), 0);
    const avgProduction = dailyReports.length > 0 
      ? dailyReports.reduce((sum, report) => sum + (report.production || 0), 0) / dailyReports.length 
      : 0;
    const avgMortality = dailyReports.length > 0 
      ? dailyReports.reduce((sum, report) => sum + (report.mortality || 0), 0) / dailyReports.length 
      : 0;
    const avgBirds = dailyReports.length > 0 
      ? dailyReports.reduce((sum, report) => sum + (report.totalBirds || 0), 0) / dailyReports.length 
      : 0;

    return (
      <div className="space-y-6">
        {/* Estatísticas da Semana */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total de Ovos (Semana)</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {totalEggs.toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Média de Aves</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {avgBirds.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Produção Média</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {avgProduction.toFixed(2)}%
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Mortalidade Média</h3>
            <p 
              className={`mt-1 text-2xl font-semibold ${
                avgMortality > 5 ? 'text-red-600' : 
                avgMortality > 2 ? 'text-yellow-600' : 'text-green-600'
              }`}
            >
              {avgMortality.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Informações do Período */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
          <h3 className="text-lg font-medium text-gray-900 p-4 border-b">Informações do Período</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div>
              <p className="text-sm text-gray-500">Lote</p>
              <p className="text-sm font-medium">{weeklyReport.batch || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Data Início</p>
              <p className="text-sm font-medium">{new Date(weeklyReport.startDate).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Data Fim</p>
              <p className="text-sm font-medium">{new Date(weeklyReport.endDate).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dias de Relatório</p>
              <p className="text-sm font-medium">{dailyReports.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Média Ovos/Dia</p>
              <p className="text-sm font-medium">
                {dailyReports.length > 0 ? (totalEggs / dailyReports.length).toLocaleString('pt-BR', { maximumFractionDigits: 0 }) : '0'}
              </p>
            </div>
          </div>
        </div>

        {/* Relatórios Diários da Semana */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Relatórios Diários da Semana</h3>
          {renderTable(dailyColumns, dailyReports, 'date')}
        </div>
      </div>
    );
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {isDailyReport ? 'Detalhes do Relatório Diário' : 'Detalhes do Relatório Semanal'}
                </h3>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {isDailyReport 
                  ? new Date((report as DailyReportData).date).toLocaleDateString('pt-BR')
                  : `${new Date((report as WeeklyReportData).startDate).toLocaleDateString('pt-BR')} - ${new Date((report as WeeklyReportData).endDate).toLocaleDateString('pt-BR')}`
                }
              </span>
            </div>
            <div className="mt-4 max-h-[70vh] overflow-y-auto">
              {isDailyReport 
                ? renderDailyReport(report as DailyReportData)
                : renderWeeklyReport(report as WeeklyReportData)
              }
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};