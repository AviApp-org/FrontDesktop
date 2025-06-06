import React from 'react';
import { Card, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ReportFiltersProps } from './types';
const { Option } = Select;



export const ReportFilters: React.FC<ReportFiltersProps> = ({
  reportType,
  selectedDate,
  batchId,
  loading,
  onReportTypeChange,
  onDateChange,
  onBatchChange,
  onSearch
}) => {
  const getDateLabel = () => {
    if (reportType === 'Semanal') {
      return '📅 Data de Início da Semana';
    }
    if (reportType === 'Mensal') {
      return '📅 Data de Início do Mês';
    }
    return '📅 Data';
  };

  const getSearchButtonText = () => {
    if (reportType === 'Semanal') {
      return 'Buscar Semana (7 dias)';
    }
    if (reportType === 'Mensal') {
      return 'Buscar Mês (30 dias)';
    }
    return 'Buscar Relatório';
  };

  return (
    <Card className="mb-6" title="Filtros de Relatório">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Tipo de Relatório */}
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Relatório</label>
          <Select
            value={reportType}
            onChange={onReportTypeChange}
            style={{ width: 120 }}
          >
            <Option value="Diário">📅 Diário</Option>
            <Option value="Semanal">📊 Semanal</Option>
            <Option value="Mensal">📈 Mensal</Option>
          </Select>
        </div>

        {/* Lote */}
        <div>
          <label className="block text-sm font-medium mb-1">Lote</label>
          <Select
            value={batchId}
            onChange={onBatchChange}
            style={{ width: 100 }}
          >
            <Option value="36">Lote 36</Option>
            <Option value="1">Lote 1</Option>
          </Select>
        </div>

        {/* Data */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {getDateLabel()}
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            style={{ width: '150px' }}
          />
        </div>

        {/* Botão de Busca */}
        <div style={{ paddingTop: '24px' }}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={onSearch}
            loading={loading}
            disabled={!selectedDate}
          >
            {getSearchButtonText()}
          </Button>
        </div>
      </div>

      {/* Informações adicionais */}
      {selectedDate && reportType !== 'Diário' && (
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <div className="text-sm text-blue-800">
            <strong>ℹ️ Como funciona:</strong>
            <ul className="mt-1 ml-4 list-disc">
              <li>
                {reportType === 'Semanal' 
                  ? 'Mostra 7 dias consecutivos a partir da data selecionada'
                  : 'Mostra 30 dias consecutivos a partir da data selecionada'
                }
              </li>
              <li>Use as setas para navegar entre os dias</li>
              <li>Clique nos pontos para ir diretamente para um dia específico</li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};
