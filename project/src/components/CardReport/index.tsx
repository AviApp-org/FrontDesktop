import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { 
  EggOutlined, 
  AlertOutlined, 
  RiseOutlined, 
  FallOutlined,
  PieChartOutlined 
} from '@ant-design/icons';
import { DailyReportData } from '../../@types/DailyReportData';

interface ReportCardsProps {
  dailyReport: DailyReportData;
}

export const ReportCards: React.FC<ReportCardsProps> = ({ dailyReport }) => {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;
  const formatNumber = (value: number) => value.toLocaleString('pt-BR');

  return (
    <Row gutter={[16, 16]} className="mb-6">
      {/* Produção de Ovos */}
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Ovos Coletados"
            value={dailyReport.totalEggsCollected}
            formatter={(value) => formatNumber(Number(value))}
            prefix={<EggOutlined style={{ color: '#52c41a' }} />}
            valueStyle={{ color: '#52c41a' }}
          />
          <div className="mt-2">
            <small className="text-gray-500">
              Produção: {formatPercentage(dailyReport.production)}
            </small>
          </div>
        </Card>
      </Col>

      {/* Aves Vivas */}
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Aves Vivas"
            value={dailyReport.totalBirds}
            formatter={(value) => formatNumber(Number(value))}
            prefix={<RiseOutlined style={{ color: '#1890ff' }} />}
            valueStyle={{ color: '#1890ff' }}
          />
          <div className="mt-2">
            <small className="text-gray-500">
              Galinhas: {formatNumber(dailyReport.currentChickens)} | 
              Galos: {formatNumber(dailyReport.currentRoosters)}
            </small>
          </div>
        </Card>
      </Col>

      {/* Mortalidade */}
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Mortalidade"
            value={dailyReport.mortality}
            formatter={(value) => formatPercentage(Number(value))}
            prefix={<AlertOutlined style={{ color: dailyReport.mortality > 0.05 ? '#ff4d4f' : '#faad14' }} />}
            valueStyle={{ color: dailyReport.mortality > 0.05 ? '#ff4d4f' : '#faad14' }}
          />
          <div className="mt-2">
            <small className="text-gray-500">
              Mortes: {formatNumber(dailyReport.totalDeadBirds)}
            </small>
          </div>
        </Card>
      </Col>

      {/* Proporção Galinha/Galo */}
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Proporção G/G"
            value={dailyReport.chickenRoosterProportion}
            formatter={(value) => `${Number(value).toFixed(1)}:1`}
            prefix={<PieChartOutlined style={{ color: '#722ed1' }} />}
            valueStyle={{ color: '#722ed1' }}
          />
          <div className="mt-2">
            <small className="text-gray-500">
              Galinha por Galo
            </small>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
