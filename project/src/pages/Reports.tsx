import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Report } from '@/@types/report';
import PageHeader from '@/components/Header';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import ReportTypeSelector from '@/components/ReportTypeSelector';
import ReportFilters from '@/components/ReportFilters';
import ReportCard from '@/components/ReportCard';
import StatCard from '@/components/StatCard';
import Button from '@/components/Button';

function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    showMaisRecente: false,
    showMaisAntigo: false,
    showUltimoVisualizado: false
  });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportType, setReportType] = useState<'detalhado' | 'diario' | 'semanal'>('detalhado');

  const mockReports: Report[] = [
    {
      id: 'AV001',
      date: '20/03/2025',
      statistics: {
        liveBirds: { total: 4000, male: 2000, female: 2000 },
        waterConsumption: { total: 1000, dailyAverage: 142.85, temperature: 25 },
        eggs: { total: 1800, damaged: 50, dirty: 30, good: 1720 },
        mortality: 0.5
      }
    },
    {
      id: 'AV002',
      date: '19/03/2025',
      statistics: {
        liveBirds: { total: 3950, male: 1975, female: 1975 },
        waterConsumption: { total: 980, dailyAverage: 140, temperature: 24 },
        eggs: { total: 1750, damaged: 45, dirty: 25, good: 1680 },
        mortality: 0.8
      }
    }
  ];

  const filteredReports = mockReports.filter(
    report =>
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.date.includes(searchTerm)
  );

  const handleFilterChange = (filterKey: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const renderDetailedView = () => (
    <div className="divide-y">
      {filteredReports.map((report, index) => (
        <div key={index} className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-900 font-medium">{report.id}</span>
            <span className="text-gray-500">{report.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setSelectedReport(report)} variant='primary'>
              Visualizar
            </Button>
            <Button variant='ghost' className="btn-icon">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCardView = () => (
    <div className="grid-cards">
      {filteredReports.map((report, index) => (
        <ReportCard
          key={index}
          report={report.statistics}
          reportType={reportType}
          onView={() => setSelectedReport(report)}
        />
      ))}
    </div>
  );

  return (
    <div>
      <PageHeader title="Relatórios" />

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <ReportTypeSelector
            selectedType={reportType}
            onTypeChange={setReportType}
          />
          <ReportFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Card>

        <Card>
          {reportType === 'detalhado' ? renderDetailedView() : renderCardView()}
        </Card>
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={!!selectedReport?.statistics}
        onClose={() => setSelectedReport(null)}
        title={`Detalhes do Relatório - ${selectedReport?.date}`}
        size="large"
      >
        {selectedReport?.statistics && (
          <div className="space-y-6">
            {/* Aves Vivas */}
            <div className="border-b pb-6">
              <h4 className="section-title">Quantidade de Aves Vivas</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  label="Total"
                  value={selectedReport.statistics.liveBirds.total.toLocaleString()}
                  sublabel="100%"
                  variant="highlighted"
                />
                <StatCard
                  label="Machos"
                  value={selectedReport.statistics.liveBirds.male.toLocaleString()}
                  sublabel={`${((selectedReport.statistics.liveBirds.male / selectedReport.statistics.liveBirds.total) * 100).toFixed(1)}%`}
                />
                <StatCard
                  label="Fêmeas"
                  value={selectedReport.statistics.liveBirds.female.toLocaleString()}
                  sublabel={`${((selectedReport.statistics.liveBirds.female / selectedReport.statistics.liveBirds.total) * 100).toFixed(1)}%`}
                />
              </div>
            </div>

            {/* Consumo de Água */}
            <div className="border-b pb-6">
              <h4 className="section-title">Consumo de Água</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  label="Consumo Total"
                  value={`${selectedReport.statistics.waterConsumption.total} L`}
                  sublabel={`Litros por ave: ${(selectedReport.statistics.waterConsumption.total / selectedReport.statistics.liveBirds.total).toFixed(2)}`}
                  variant="highlighted"
                />
                <StatCard
                  label="Média Diária"
                  value={`${selectedReport.statistics.waterConsumption.dailyAverage} L`}
                  sublabel="Por dia"
                />
                <StatCard
                  label="Temperatura Média"
                  value={`${selectedReport.statistics.waterConsumption.temperature}°C`}
                  sublabel="Ambiente"
                />
              </div>
            </div>

            {/* Produção de Ovos */}
            <div>
              <h4 className="section-title">Produção de Ovos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                  label="Produção Total"
                  value={selectedReport.statistics.eggs.total.toLocaleString()}
                  sublabel="100%"
                  variant="highlighted"
                />
                <StatCard
                  label="Ovos Danificados"
                  value={selectedReport.statistics.eggs.damaged.toLocaleString()}
                  sublabel={`${((selectedReport.statistics.eggs.damaged / selectedReport.statistics.eggs.total) * 100).toFixed(1)}%`}
                />
                <StatCard
                  label="Ovos Sujos"
                  value={selectedReport.statistics.eggs.dirty.toLocaleString()}
                  sublabel={`${((selectedReport.statistics.eggs.dirty / selectedReport.statistics.eggs.total) * 100).toFixed(1)}%`}
                />
                <StatCard
                  label="Ovos em Bom Estado"
                  value={selectedReport.statistics.eggs.good.toLocaleString()}
                  sublabel={`${((selectedReport.statistics.eggs.good / selectedReport.statistics.eggs.total) * 100).toFixed(1)}%`}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Reports;
