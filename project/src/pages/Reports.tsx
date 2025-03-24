import React, { useState } from 'react';
import { Search, Download, Plus, X, Calendar } from 'lucide-react';
import { Report } from '../types/interfaces/report';

function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMaisRecente, setShowMaisRecente] = useState(false);
  const [showMaisAntigo, setShowMaisAntigo] = useState(false);
  const [showUltimoVisualizado, setShowUltimoVisualizado] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportType, setReportType] = useState<'detalhado' | 'diario' | 'semanal'>('detalhado');

  const mockReports: Report[] = [
    {
      id: 'AV001',
      date: '20/03/2025',
      statistics: {
        liveBirds: {
          total: 4000,
          male: 2000,
          female: 2000
        },
        waterConsumption: {
          total: 1000,
          dailyAverage: 142.85,
          temperature: 25
        },
        eggs: {
          total: 1800,
          damaged: 50,
          dirty: 30,
          good: 1720
        },
        mortality: 0.5
      }
    },
    {
      id: 'AV002',
      date: '19/03/2025',
      statistics: {
        liveBirds: {
          total: 3950,
          male: 1975,
          female: 1975
        },
        waterConsumption: {
          total: 980,
          dailyAverage: 140,
          temperature: 24
        },
        eggs: {
          total: 1750,
          damaged: 45,
          dirty: 25,
          good: 1680
        },
        mortality: 0.8
      }
    }
  ];

  const filteredReports = mockReports.filter(
    report =>
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) || report.date.includes(searchTerm)
  );

  const calculateRatio = (male: number, female: number) => {
    return `${(male / female).toFixed(2)}:1`;
  };

  const renderReportCard = (report: Report) => {
    if (!report.statistics) return null;

    return (
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h4 className="card-title">{report.id}</h4>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">{report.date}</p>
        </div>

        {reportType === 'diario' ? (
          <div className="space-y-4">
            <div className="stat-card">
              <p className="text-gray-600">Produção Total</p>
              <p className="stat-value-success">{report.statistics.eggs.total}%</p>
            </div>
            <div className="stat-card">
              <p className="text-gray-600">Taxa de Mortalidade</p>
              <p className="stat-value-danger">{report.statistics.mortality}%</p>
            </div>
            <div className="stat-card">
              <p className="text-gray-600">Razão Macho/Fêmea</p>
              <p className="stat-value-info">
                {calculateRatio(
                  report.statistics.liveBirds.male,
                  report.statistics.liveBirds.female
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="stat-card">
              <p className="text-gray-600">Produção Total</p>
              <p className="stat-value-success">{report.statistics.eggs.total * 7}%</p>
            </div>
            <div className="stat-card">
              <p className="text-gray-600">Taxa de Mortalidade</p>
              <p className="stat-value-danger">{report.statistics.mortality}%</p>
            </div>
            <div className="stat-card">
              <p className="text-gray-600">Razão Macho/Fêmea</p>
              <p className="stat-value-info">
                {calculateRatio(
                  report.statistics.liveBirds.male,
                  report.statistics.liveBirds.female
                )}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={() => setSelectedReport(report)} className="btn-primary">
            Visualizar
          </button>
          <button className="btn-icon">
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  return (

    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Relatóridos</h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Report Type Selector Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex space-x-4 mb-6">
            {['detalhado', 'diario', 'semanal'].map(type => (
              <button
                key={type}
                onClick={() => setReportType(type as typeof reportType)}
                className={`btn-${reportType === type ? 'primary' : 'secondary'}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input-search"
            />
          </div>

          <div className="filter-section">
            <h3 className="section-title">Filtrar por</h3>
            {[
              { state: showMaisRecente, setState: setShowMaisRecente, label: 'Mais recente' },
              { state: showMaisAntigo, setState: setShowMaisAntigo, label: 'Mais antigo' },
              {
                state: showUltimoVisualizado,
                setState: setShowUltimoVisualizado,
                label: 'Último visualizado',
              },
            ].map(({ state, setState, label }) => (
              <button key={label} onClick={() => setState(!state)} className="filter-button">
                <Plus className={`h-4 w-4 ${state ? 'transform rotate-45' : ''}`} />
                <span className="text-gray-700">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reports List Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          {reportType === 'detalhado' ? (
            <div className="divide-y">
              {filteredReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-900 font-medium">{report.id}</span>
                    <span className="text-gray-500">{report.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setSelectedReport(report)} className="btn-primary">
                      Visualizar
                    </button>
                    <button className="btn-icon">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid-cards">
              {filteredReports.map((report, index) => (
                <React.Fragment key={index}>{renderReportCard(report)}</React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedReport?.statistics && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="section-title mb-0">Detalhes do Relatório - {selectedReport.date}</h3>
              <button onClick={() => setSelectedReport(null)} className="btn-icon">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="modal-body">
              <div className="space-y-6">
                {/* Live Birds Section */}
                <div className="border-b pb-6">
                  <h4 className="section-title">Quantidade de Aves Vivas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="stat-card-highlighted">
                      <p className="text-green-700 font-medium">Total</p>
                      <p className="text-3xl font-bold text-green-800">
                        {selectedReport.statistics.liveBirds.total.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600 font-medium">100%</p>
                    </div>
                    <div className="stat-card">
                      <p className="text-gray-600">Machos</p>
                      <p className="stat-value">
                        {selectedReport.statistics.liveBirds.male.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {((selectedReport.statistics.liveBirds.male /
                          selectedReport.statistics.liveBirds.total) *
                          100).toFixed(1)}
                        %
                      </p>
                    </div>
                    <div className="stat-card">
                      <p className="text-gray-600">Fêmeas</p>
                      <p className="stat-value">
                        {selectedReport.statistics.liveBirds.female.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {((selectedReport.statistics.liveBirds.female /
                          selectedReport.statistics.liveBirds.total) *
                          100).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>
                </div>

                {/* Water Consumption Section */}
                <div className="border-b pb-6">
                  <h4 className="section-title">Consumo de Água</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="stat-card-highlighted">
                      <p className="text-green-700 font-medium">Consumo Total</p>
                      <p className="text-3xl font-bold text-green-800">
                        {selectedReport.statistics.waterConsumption.total} L
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        Litros por ave:{' '}
                        {(
                          selectedReport.statistics.waterConsumption.total /
                          selectedReport.statistics.liveBirds.total
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="stat-card">
                      <p className="text-gray-600">Média Diária</p>
                      <p className="stat-value">
                        {selectedReport.statistics.waterConsumption.dailyAverage} L
                      </p>
                      <p className="stat-label">Por dia</p>
                    </div>
                    <div className="stat-card">
                      <p className="text-gray-600">Temperatura Média</p>
                      <p className="stat-value">
                        {selectedReport.statistics.waterConsumption.temperature}°C
                      </p>
                      <p className="stat-label">Ambiente</p>
                    </div>
                  </div>
                </div>

                {/* Egg Production Section */}
                <div>
                  <h4 className="section-title">Produção de Ovos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="stat-card-highlighted">
                      <p className="text-green-700 font-medium">Produção Total</p>
                      <p className="text-3xl font-bold text-green-800">
                        {selectedReport.statistics.eggs.total.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600 font-medium">100%</p>
                    </div>
                    
                    <div className="stat-card">
                      <p className="text-gray-600">Ovos Incubaveis</p>
                      <p className="stat-value">
                        {selectedReport.statistics.eggs.damaged.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {((selectedReport.statistics.eggs.damaged /
                          selectedReport.statistics.eggs.total) *
                          100).toFixed(1)}
                        %
                      </p>
                    </div>

                    <div className="stat-card">
                      <p className="text-gray-600">Ovos Danificados</p>
                      <p className="stat-value">
                        {selectedReport.statistics.eggs.damaged.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {((selectedReport.statistics.eggs.damaged /
                          selectedReport.statistics.eggs.total) *
                          100).toFixed(1)}
                        %
                      </p>
                    </div>

                    <div className="stat-card">
                      <p className="text-gray-600">Ovos Sujos</p>
                      <p className="stat-value">
                        {selectedReport.statistics.eggs.dirty.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {((selectedReport.statistics.eggs.dirty /
                          selectedReport.statistics.eggs.total) *
                          100).toFixed(1)}
                        %
                      </p>
                    </div>
                    <div className="stat-card">
                      <p className="text-gray-600">Ovos em Bom Estado</p>
                      <p className="stat-value">
                        {selectedReport.statistics.eggs.good.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {((selectedReport.statistics.eggs.good /
                          selectedReport.statistics.eggs.total) *
                          100).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Reports;