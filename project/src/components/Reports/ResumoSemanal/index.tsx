import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

interface ResumoSemanalProps {
  reportData: any;
  reportType: 'Semanal' | 'Mensal';
  currentDateIndex: number;
  totalDays: number;
}

export const ResumoSemanal: React.FC<ResumoSemanalProps> = ({ 
  reportData, 
  reportType, 
  currentDateIndex, 
  totalDays 
}) => {
  const periodText = reportType === 'Semanal' ? 'Semana' : 'Mês';
  const daysText = reportType === 'Semanal' ? '7 dias' : '30 dias';
  
  // Dados consolidados simulados baseados no dia atual
  const consolidatedData = {
    averageProduction: reportData.production * 0.95,
    averageMortality: reportData.mortality * 1.1,
    maleFemaleProportion: reportData.chickenRoosterProportion || 0,
    totalEggs: reportData.totalEggsCollected * (reportType === 'Semanal' ? 7 : 30),
  };

  return (
    <Card 
      title={`📊 Resumo Geral da ${periodText} (${daysText})`}
      className="mb-6 shadow-lg border-l-4 border-l-blue-500"
    >
      <Row gutter={[16, 16]} justify="center">
        <Col xs={12} sm={6} md={6}>
          <Card className="text-center bg-blue-50 border border-blue-200">
            <Statistic
              title="📈 % de Produção"
              value={consolidatedData.averageProduction}
              suffix="%"
              precision={1}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6}>
          <Card className="text-center bg-blue-50 border border-blue-200">
            <Statistic
              title="💀 % de Mortalidade"
              value={consolidatedData.averageMortality}
              suffix="%"
              precision={2}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6}>
          <Card className="text-center bg-blue-50 border border-blue-200">
            <Statistic
              title="⚖️ Relação Macho e Fêmea"
              value={consolidatedData.maleFemaleProportion}
              precision={2}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6}>
          <Card className="text-center bg-blue-50 border border-blue-200">
            <Statistic
              title="🥚 Total de Ovos"
              value={consolidatedData.totalEggs}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <div className="text-sm text-blue-700 text-center">
          📊 Resumo consolidado da {periodText.toLowerCase()} • 
          Dia {currentDateIndex + 1} de {totalDays} • 
          Use as setas para navegar entre os dias
        </div>
      </div>
    </Card>
  );
};
