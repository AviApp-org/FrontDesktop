import React from 'react';
import { Form, Select, DatePicker, Button, Card, Row, Col } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from '../../utils/dayjs';
import 'dayjs/locale/pt-br';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ReportFiltersProps } from './types';

// Configurar dayjs com todos os plugins necessários
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.locale('pt-br');

const { Option } = Select;

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  batches,
  aviaries,
  isLoading,
  onFilterChange,
  onSearch
}) => {
  const [form] = Form.useForm();

  const handleTypeChange = (type: 'daily' | 'weekly') => {
    console.log('🔄 Mudando tipo de relatório para:', type);
    onFilterChange({ type });
  };

  const handleBatchChange = (batchId: number) => {
    console.log('🔄 Mudando lote para:', batchId);
    onFilterChange({ batchId, aviaryId: undefined }); // Reset aviaryId quando mudar o lote
  };

  const handleAviaryChange = (aviaryId: number | undefined) => {
    console.log('🔄 Mudando aviário para:', aviaryId);
    onFilterChange({ aviaryId });
  };

  const handleSingleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const dateStr = date.format('YYYY-MM-DD');
      console.log('🔄 Mudando data para:', dateStr);
      onFilterChange({
        startDate: dateStr,
        endDate: dateStr
      });
    } else {
      console.log('🔄 Limpando data');
      onFilterChange({
        startDate: '',
        endDate: ''
      });
    }
  };

  const handleReset = () => {
    console.log('🔄 Resetando filtros');
    form.resetFields();
    
    const defaultBatchId = batches.length > 0 ? Number(batches[0].id) : 1;
    const today = dayjs().format('YYYY-MM-DD');
    
    onFilterChange({
      type: 'daily',
      startDate: today,
      endDate: today,
      batchId: defaultBatchId,
      aviaryId: undefined
    });
  };

  // Filtrar aviários baseado no lote selecionado
  const filteredAviaries = aviaries.filter(aviary => 
    aviary.batchId === filters.batchId
  );

  return (
    <Card className="mb-6" title="Filtros de Relatório">
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          {/* Tipo de Relatório */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Tipo de Relatório">
              <Select
                value={filters.type}
                onChange={handleTypeChange}
                loading={isLoading}
                placeholder="Selecione o tipo"
              >
                <Option value="daily">Diário</Option>
                <Option value="weekly">Semanal</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Lote */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Lote">
              <Select
                value={filters.batchId}
                onChange={handleBatchChange}
                loading={isLoading}
                placeholder="Selecione um lote"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase())
                }
              >
                {batches.map((batch) => (
                  <Option key={batch.id} value={Number(batch.id)}>
                    {batch.name} (ID: {batch.id})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Aviário (Opcional) */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Aviário (Opcional)">
              <Select
                value={filters.aviaryId}
                onChange={handleAviaryChange}
                loading={isLoading}
                placeholder="Todos os aviários"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    ?.toLowerCase()
                    ?.includes(input.toLowerCase())
                }
              >
                {filteredAviaries.map((aviary) => (
                  <Option key={aviary.id} value={Number(aviary.id)}>
                    {aviary.name} (ID: {aviary.id})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Data */}
          <Col xs={24} sm={12} md={6}>
            <Form.Item label={filters.type === 'daily' ? 'Data' : 'Data de Início'}>
              <DatePicker
                value={filters.startDate ? dayjs(filters.startDate) : null}
                onChange={handleSingleDateChange}
                format="DD/MM/YYYY"
                placeholder={filters.type === 'daily' ? 'Selecione a data' : 'Data de início da semana'}
                style={{ width: '100%' }}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Botões de Ação */}
        <Row>
          <Col span={24}>
            <div className="flex gap-2">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={onSearch}
                loading={isLoading}
                disabled={!filters.batchId || !filters.startDate}
              >
                Buscar Relatórios
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
                disabled={isLoading}
              >
                Limpar Filtros
              </Button>
            </div>
          </Col>
        </Row>

        {/* Informações de Debug (remover em produção) */}
        {process.env.NODE_ENV === 'development' && (
          <Row className="mt-4">
            <Col span={24}>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <strong>Debug:</strong> Lote: {filters.batchId}, Data: {filters.startDate}, 
                Aviários disponíveis: {filteredAviaries.length}, 
                Endpoint: /daily-report/{filters.batchId}/{filters.startDate ? dayjs(filters.startDate).format('DD-MM-YYYY') : 'N/A'}
              </div>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};
