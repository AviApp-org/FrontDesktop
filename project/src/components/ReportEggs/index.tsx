import React from 'react';
import { Card, Row, Col, Progress, Table } from 'antd';
import { DailyReportData } from '../../@types/DailyReportData';

interface EggDistributionProps {
  dailyReport: DailyReportData;
}

export const EggDistribution: React.FC<EggDistributionProps> = ({ dailyReport }) => {
  const formatNumber = (value: number) => value.toLocaleString('pt-BR');
  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  // Tradução dos tipos de ovos
  const eggTypeTranslations: Record<string, string> = {
    'CLEAN': 'Limpos',
    'CRACKED': 'Rachados',
    'DOUBLE_YOLK': 'Gema Dupla',
    'DIRTY': 'Sujos',
    'BROKEN': 'Quebrados',
    'SMALL': 'Pequenos',
    'DEFORMED': 'Deformados'
  };

  // Cores para cada tipo de ovo
  const eggTypeColors: Record<string, string> = {
    'CLEAN': '#52c41a',
    'CRACKED': '#faad14',
    'DOUBLE_YOLK': '#1890ff',
    'DIRTY': '#8c8c8c',
    'BROKEN': '#ff4d4f',
    'SMALL': '#722ed1',
    'DEFORMED': '#fa541c'
  };

  const columns = [
    {
      title: 'Tipo de Ovo',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <span style={{ color: eggTypeColors[type] || '#000' }}>
          {eggTypeTranslations[type] || type}
        </span>
      ),
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value: number) => formatNumber(value),
      align: 'right' as const,
    },
    {
      title: 'Percentual',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (value: number, record: any) => {
        const percentage = dailyReport.percentageByEggType.find(p => p.type === record.type)?.percentage || 0;
        return (
          <div style={{ minWidth: 120 }}>
            <Progress 
              percent={percentage} 
              size="small" 
              strokeColor={eggTypeColors[record.type] || '#1890ff'}
              format={() => formatPercentage(percentage)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Row gutter={[16, 16]} className="mb-6">
      {/* Resumo de Destino dos Ovos */}
      <Col xs={24} md={8}>
        <Card title="Destino dos Ovos" size="small">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>🥚 Incubáveis:</span>
              <span className="font-semibold text-green-600">
                {formatNumber(dailyReport.hatchableEggs)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>🛒 Mercado:</span>
              <span className="font-semibold text-blue-600">
                {formatNumber(dailyReport.marketEggs)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>🗑️ Descarte:</span>
              <span className="font-semibold text-red-600">
                {formatNumber(dailyReport.dumpEggs)}
              </span>
            </div>
          </div>
        </Card>
      </Col>

      {/* Tabela de Distribuição */}
      <Col xs={24} md={16}>
        <Card title="Distribuição por Tipo" size="small">
          <Table
            dataSource={dailyReport.quantityByEggType}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="type"
          />
        </Card>
      </Col>
    </Row>
  );
};
