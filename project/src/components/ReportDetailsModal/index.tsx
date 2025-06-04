import React from 'react';
import { Modal, Descriptions, Table, Row, Col, Statistic, Card, Tag } from 'antd';
import { DailyReportData } from '../../@types/DailyReportData';
import { WeeklyReportData } from '../../@types/WeeklyReportData';
import { ColumnsType } from 'antd/es/table';
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
    const eggTypeColumns: ColumnsType<any> = [
      {
        title: 'Tipo de Ovo',
        dataIndex: 'type',
        key: 'type',
        render: (type: string) => {
          const typeLabels: Record<string, string> = {
            TOTAL: 'Total',
            CRACKED: 'Rachados',
            DIRTY_NEST: 'Sujos do Ninho',
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
        title: 'Quantidade',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (value: number) => value?.toLocaleString('pt-BR') || '0',
      },
      {
        title: 'Percentual',
        dataIndex: 'percentage',
        key: 'percentage',
        render: (value: number) => `${(value || 0).toFixed(2)}%`,
      },
    ];

    const aviaryColumns: ColumnsType<any> = [
      {
        title: 'Aviário',
        dataIndex: 'aviaryName',
        key: 'aviaryName',
      },
      {
        title: 'Ovos Coletados',
        dataIndex: 'eggsCollected',
        key: 'eggsCollected',
        render: (value: number) => value?.toLocaleString('pt-BR') || '0',
      },
      {
        title: 'Mortes',
        dataIndex: 'deaths',
        key: 'deaths',
        render: (value: number) => value?.toLocaleString('pt-BR') || '0',
      },
      {
        title: 'Temperatura (°C)',
        dataIndex: 'temperature',
        key: 'temperature',
        render: (temp: { min: number; max: number }) => 
          temp ? `${temp.min}° - ${temp.max}°` : 'N/A',
      },
    ];

    return (
      <div>
        {/* Estatísticas        {/* Estatísticas Gerais */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Statistic
              title="Total de Ovos"
              value={dailyReport.totalEggsCollected || 0}
              formatter={(value) => value?.toLocaleString('pt-BR')}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Aves Vivas"
              value={dailyReport.totalBirds || 0}
              formatter={(value) => value?.toLocaleString('pt-BR')}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Produção"
              value={dailyReport.production || 0}
              precision={2}
              suffix="%"
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Mortalidade"
              value={dailyReport.mortality || 0}
              precision={2}
              suffix="%"
              valueStyle={{ 
                color: (dailyReport.mortality || 0) > 5 ? '#cf1322' : 
                       (dailyReport.mortality || 0) > 2 ? '#fa8c16' : '#3f8600' 
              }}
            />
          </Col>
        </Row>

        {/* Detalhes por Aviário */}
        {dailyReport.aviaryReports && dailyReport.aviaryReports.length > 0 && (
          <Card title="Relatórios por Aviário" className="mb-4">
            <Table
              columns={aviaryColumns}
              dataSource={dailyReport.aviaryReports}
              pagination={false}
              size="small"
              rowKey="aviaryName"
            />
          </Card>
        )}

        {/* Distribuição de Ovos por Tipo */}
        {dailyReport.quantityByEggType && dailyReport.quantityByEggType.length > 0 && (
          <Card title="Distribuição de Ovos por Tipo" className="mb-4">
            <Table
              columns={eggTypeColumns}
              dataSource={dailyReport.quantityByEggType.map((item, index) => ({
                ...item,
                percentage: dailyReport.percentageByEggType?.[index]?.percentage || 0
              }))}
              pagination={false}
              size="small"
              rowKey="type"
            />
          </Card>
        )}

        {/* Informações Adicionais */}
        <Descriptions title="Informações Detalhadas" bordered size="small">
          <Descriptions.Item label="Galinhas Atuais">
            {(dailyReport.currentChickens || 0).toLocaleString('pt-BR')}
          </Descriptions.Item>
          <Descriptions.Item label="Galos Atuais">
            {(dailyReport.currentRoosters || 0).toLocaleString('pt-BR')}
          </Descriptions.Item>
          <Descriptions.Item label="Mortes de Galinhas">
            {(dailyReport.totalDeadChickens || 0).toLocaleString('pt-BR')}
          </Descriptions.Item>
          <Descriptions.Item label="Mortes de Galos">
            {(dailyReport.totalDeadRoosters || 0).toLocaleString('pt-BR')}
          </Descriptions.Item>
          <Descriptions.Item label="Total de Mortes">
            {(dailyReport.totalDeadBirds || 0).toLocaleString('pt-BR')}
          </Descriptions.Item>
          <Descriptions.Item label="Proporção Galinha/Galo">
            {(dailyReport.chickenRoosterProportion || 0).toFixed(2)}:1
          </Descriptions.Item>
          <Descriptions.Item label="Mortalidade Galinhas">
            {(dailyReport.chickenMortality || 0).toFixed(2)}%
          </Descriptions.Item>
          <Descriptions.Item label="Mortalidade Galos">
            {(dailyReport.roosterMortality || 0).toFixed(2)}%
          </Descriptions.Item>
          <Descriptions.Item label="Ovos Descartados">
            {(dailyReport.dumpEggs || 0).toLocaleString('pt-BR')}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  // Renderizar relatório semanal
  const renderWeeklyReport = (weeklyReport: WeeklyReportData) => {
    const dailyColumns: ColumnsType<DailyReportData> = [
      {
        title: 'Data',
        dataIndex: 'date',
        key: 'date',
        render: (date: string) => new Date(date).toLocaleDateString('pt-BR'),
      },
      {
        title: 'Ovos Coletados',
        dataIndex: 'totalEggsCollected',
        key: 'totalEggsCollected',
        render: (value: number) => (value || 0).toLocaleString('pt-BR'),
      },
      {
        title: 'Produção (%)',
        dataIndex: 'production',
        key: 'production',
        render: (value: number) => `${(value || 0).toFixed(2)}%`,
      },
      {
        title: 'Mortalidade (%)',
        dataIndex: 'mortality',
        key: 'mortality',
        render: (value: number) => {
          const mortality = value || 0;
          return (
            <Tag color={mortality > 5 ? 'red' : mortality > 2 ? 'orange' : 'green'}>
              {mortality.toFixed(2)}%
            </Tag>
          );
        },
      },
      {
        title: 'Aves Vivas',
        dataIndex: 'totalBirds',
        key: 'totalBirds',
        render: (value: number) => (value || 0).toLocaleString('pt-BR'),
      },
    ];

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
      <div>
        {/* Estatísticas da Semana */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Statistic
              title="Total de Ovos (Semana)"
              value={totalEggs}
              formatter={(value) => value?.toLocaleString('pt-BR')}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Média de Aves"
              value={avgBirds}
              formatter={(value) => value?.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Produção Média"
              value={avgProduction}
              precision={2}
              suffix="%"
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Mortalidade Média"
              value={avgMortality}
              precision={2}
              suffix="%"
              valueStyle={{ 
                color: avgMortality > 5 ? '#cf1322' : 
                       avgMortality > 2 ? '#fa8c16' : '#3f8600' 
              }}
            />
          </Col>
        </Row>

        {/* Informações do Período */}
        <Descriptions title="Informações do Período" bordered size="small" className="mb-4">
          <Descriptions.Item label="Lote">
            {weeklyReport.batch || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Data Início">
            {new Date(weeklyReport.startDate).toLocaleDateString('pt-BR')}
          </Descriptions.Item>
          <Descriptions.Item label="Data Fim">
            {new Date(weeklyReport.endDate).toLocaleDateString('pt-BR')}
          </Descriptions.Item>
          <Descriptions.Item label="Dias de Relatório">
            {dailyReports.length}
          </Descriptions.Item>
          <Descriptions.Item label="Média Ovos/Dia">
            {dailyReports.length > 0 ? (totalEggs / dailyReports.length).toLocaleString('pt-BR', { maximumFractionDigits: 0 }) : '0'}
          </Descriptions.Item>
        </Descriptions>

        {/* Relatórios Diários da Semana */}
        <Card title="Relatórios Diários da Semana">
          <Table
            columns={dailyColumns}
            dataSource={dailyReports}
            pagination={false}
            size="small"
            rowKey="date"
            scroll={{ x: 600 }}
          />
        </Card>
      </div>
    );
  };

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <span>
            {isDailyReport ? 'Detalhes do Relatório Diário' : 'Detalhes do Relatório Semanal'}
          </span>
          <Tag color="blue">
            {isDailyReport 
              ? new Date((report as DailyReportData).date).toLocaleDateString('pt-BR')
              : `${new Date((report as WeeklyReportData).startDate).toLocaleDateString('pt-BR')} - ${new Date((report as WeeklyReportData).endDate).toLocaleDateString('pt-BR')}`
            }
          </Tag>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
      style={{ top: 20 }}
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      {isDailyReport 
        ? renderDailyReport(report as DailyReportData)
        : renderWeeklyReport(report as WeeklyReportData)
      }
    </Modal>
  );
};

