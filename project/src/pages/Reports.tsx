import React, { useState } from 'react';
import { Search, Download, Plus, X } from 'lucide-react';

interface Report {
  id: string;
  date: string;
  statistics?: ReportStatistics;
}

interface ReportStatistics {
  liveBirds: {
    male: number;
    female: number;
    total: number;
  };
  eggs: {
    total: number;
    cracked: number;
    dirtyNest: number;
    small: number;
    incubatable: number;
    broken: number;
    deformed: number;
    thinShell: number;
    eliminated: number;
    market: number;
  };
}

function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMaisRecente, setShowMaisRecente] = useState(false);
  const [showMaisAntigo, setShowMaisAntigo] = useState(false);
  const [showUltimoVisualizado, setShowUltimoVisualizado] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const [reports] = useState<Report[]>([
    {
      id: 'N do relatório',
      date: '12-09-2023',
      statistics: {
        liveBirds: {
          male: 1200,
          female: 2800,
          total: 4000
        },
        eggs: {
          total: 3500,
          cracked: 50,
          dirtyNest: 75,
          small: 30,
          incubatable: 3000,
          broken: 25,
          deformed: 40,
          thinShell: 35,
          eliminated: 45,
          market: 200
        }
      }
    },
    { id: 'N do relatório', date: '12-10-2023' },
    { id: 'N do relatório', date: '12-11-2023' },
    { id: 'N do relatório', date: '12-12-2023' },
    { id: 'N do relatório', date: '12-01-2024' },
    { id: 'N do relatório', date: '12-02-2024' },
    { id: 'N do relatório', date: '12-03-2024' },
  ]);

  const filteredReports = reports.filter(report =>
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.date.includes(searchTerm)
  );

  const calculatePercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Relatórios</h2>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700 mb-2">Filtrar por</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => setShowMaisRecente(!showMaisRecente)}
              className="flex items-center space-x-2 w-full text-left"
            >
              <Plus className={`h-4 w-4 ${showMaisRecente ? 'transform rotate-45' : ''}`} />
              <span className="text-gray-700">Mais recente</span>
            </button>

            <button
              onClick={() => setShowMaisAntigo(!showMaisAntigo)}
              className="flex items-center space-x-2 w-full text-left"
            >
              <Plus className={`h-4 w-4 ${showMaisAntigo ? 'transform rotate-45' : ''}`} />
              <span className="text-gray-700">Mais antigo</span>
            </button>

            <button
              onClick={() => setShowUltimoVisualizado(!showUltimoVisualizado)}
              className="flex items-center space-x-2 w-full text-left"
            >
              <Plus className={`h-4 w-4 ${showUltimoVisualizado ? 'transform rotate-45' : ''}`} />
              <span className="text-gray-700">Último visualizado</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow">
        {filteredReports.map((report, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 font-medium">{report.id}</span>
              <span className="text-gray-500">{report.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setSelectedReport(report)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Visualizar
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedReport && selectedReport.statistics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Detalhes do Relatório - {selectedReport.date}
                </h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Live Birds Section */}
                <div className="border-b pb-6">
                  <h4 className="text-lg font-semibold mb-4">Quantidade de Aves Vivas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Machos</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.liveBirds.male.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.liveBirds.male,
                          selectedReport.statistics.liveBirds.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Fêmeas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.liveBirds.female.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.liveBirds.female,
                          selectedReport.statistics.liveBirds.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.liveBirds.total.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">100%</p>
                    </div>
                  </div>
                </div>

                {/* Egg Production Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Produção de Ovos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-gray-600">Produção Total</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.total.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">100%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Ovos Trincados</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.cracked.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.eggs.cracked,
                          selectedReport.statistics.eggs.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Ovos Sujos de Ninho</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.dirtyNest.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.eggs.dirtyNest,
                          selectedReport.statistics.eggs.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Ovos Pequenos</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.small.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.eggs.small,
                          selectedReport.statistics.eggs.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Ovos Incubáveis</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.incubatable.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.eggs.incubatable,
                          selectedReport.statistics.eggs.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Ovos Quebrados</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.broken.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.eggs.broken,
                          selectedReport.statistics.eggs.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Ovos Deformados</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.deformed.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.eggs.deformed,
                          selectedReport.statistics.eggs.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Ovos Casca Fina</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.thinShell.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.eggs.thinShell,
                          selectedReport.statistics.eggs.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Eliminados</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.eliminated.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.eggs.eliminated,
                          selectedReport.statistics.eggs.total
                        )}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">Ovos para Mercado</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedReport.statistics.eggs.market.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculatePercentage(
                          selectedReport.statistics.eggs.market,
                          selectedReport.statistics.eggs.total
                        )}%
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