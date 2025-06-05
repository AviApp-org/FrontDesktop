import React from 'react';
import { Button, Card, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ReportFiltersProps } from './types';
import { formatDateForDisplay } from '../../../utils/reportUtils';

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
  return (
    <Card className="mb-6">
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Relatório</label>
          <Select
            value={reportType}
            onChange={onReportTypeChange}
            style={{ width: 120 }}
          >
            <Option value="Diário">Diário</Option>
            <Option value="Semanal">Semanal</Option>
            <Option value="Mensal">Mensal</Option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Lote</label>
          <Select
            value={batchId}
            onChange={onBatchChange}
            style={{ width: 100 }}
          >
            <Option value={36}>Lote 36</Option>
            <Option value={1}>Lote 1</Option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            📅 Data {reportType === 'Semanal' ? '(início da semana)' : reportType === 'Mensal' ? '(início do mês)' : ''}
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            style={{ width: '150px' }}
          />
        </div>

        <div style={{ paddingTop: '24px' }}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={onSearch}
            loading={loading}
            disabled={!selectedDate}
          >
            Buscar Relatório
          </Button>
        </div>
      </div>

      {/* Debug Info */}
      {selectedDate && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Debug:</strong> Lote {batchId} | Tipo: {reportType} | 
          Data: {formatDateForDisplay(selectedDate)} | 
          Status: {loading ? 'Carregando...' : 'Aguardando'}
        </div>
      )}
    </Card>
  );
};
