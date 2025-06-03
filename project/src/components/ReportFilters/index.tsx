import React from 'react';
import { Card, Form, Select, DatePicker, Button, Row, Col } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { ReportFiltersProps } from './types';

const { Option } = Select;
const { RangePicker } = DatePicker;



export const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  batches,
  aviaries,
  isLoading,
  onFilterChange,
  onSearch
}) => {
  return (
    <Card className="mb-6 shadow-sm">
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Tipo de Relatório">
              <Select
                value={filters.type}
                onChange={(value) => onFilterChange({ type: value })}
                placeholder="Selecione o tipo"
              >
                <Option value="daily">Relatório Diário</Option>
                <Option value="weekly">Relatório Semanal</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Lote">
              <Select
                value={filters.batchId}
                onChange={(value) => onFilterChange({ batchId: value })}
                placeholder="Selecione o lote"
              >
                {batches.map(batch => (
                  <Option key={batch.id} value={Number(batch.id)}>
                    {batch.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label={filters.type === 'daily' ? 'Período' : 'Data de Início da Semana'}>
              {filters.type === 'daily' ? (
                <RangePicker
                  value={[
                    dayjs(filters.startDate),
                    dayjs(filters.endDate)
                  ]}
                  onChange={(dates) => {
                    if (dates) {
                      onFilterChange({
                        startDate: dates[0]?.format('YYYY-MM-DD') || '',
                        endDate: dates[1]?.format('YYYY-MM-DD') || ''
                      });
                    }
                  }}
                  format="DD/MM/YYYY"
                  placeholder={['Data inicial', 'Data final']}
                  style={{ width: '100%' }}
                />
              ) : (
                <DatePicker
                  value={dayjs(filters.startDate)}
                  onChange={(date) => {
                    if (date) {
                      const dateStr = date.format('YYYY-MM-DD');
                      onFilterChange({
                        startDate: dateStr,
                        endDate: dateStr
                      });
                    }
                  }}
                  format="DD/MM/YYYY"
                  placeholder="Selecione a data"
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label=" " style={{ visibility: 'hidden' }}>
              <div className="flex space-x-2">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={onSearch}
                  loading={isLoading}
                  block
                >
                  Buscar
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>

        {/* Filtro de aviário apenas para relatórios diários */}
        {filters.type === 'daily' && (
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Aviário (Opcional)">
                <Select
                  value={filters.aviaryId}
                  onChange={(value) => onFilterChange({ aviaryId: value })}
                  placeholder="Todos os aviários"
                  allowClear
                >
                  {aviaries.map(aviary => (
                    <Option key={aviary.id} value={Number(aviary.id)}>
                      {aviary.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label=" " style={{ visibility: 'hidden' }}>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    onFilterChange({
                      startDate: dayjs().format('YYYY-MM-DD'),
                      endDate: dayjs().format('YYYY-MM-DD'),
                      batchId: batches[0]?.id ? Number(batches[0].id) : 1,
                      aviaryId: undefined
                    });
                  }}
                >
                  Limpar Filtros
                </Button>
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  );
};
