import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import { 
  DownOutlined, 
  UpOutlined,
  UserOutlined,        // ✅ Novo ícone para Galinhas
  ManOutlined,         // ✅ Novo ícone para Galos
  FallOutlined,
  StarOutlined,        // ✅ Novo ícone para Total Produzido
  RiseOutlined,
  TrophyOutlined,      // ✅ Novo ícone para Ovos Incubáveis
  ShoppingOutlined,
  DeleteOutlined,
  BulbOutlined         // ✅ Novo ícone para Ovos Eliminados
} from '@ant-design/icons';
import { translateEggType } from '../../../@types/reportTypes';
import { AviaryData } from '@/@types/AviaryData'; // ajuste o caminho conforme sua estrutura

interface AviarioProps {
  aviary: AviaryData & {
    aviaryName?: string;
    aviaryId?: number;
    totalEggsCollected?: number;
    totalDeadChickens?: number;
    totalDeadRoosters?: number;
    chickenMortality?: number;
    roosterMortality?: number;
    mortality?: number;
    production?: number;
    incubateEggs?: number;
    marketEggs?: number;
    dumpEggs?: number;
    quantityByEggType?: {
      type: string;
      quantity: number;
    }[];
    currentChickens?: number;
    currentRoosters?: number;
  };
  open: boolean;
  toggle: () => void;
}


export const Aviario: React.FC<AviarioProps> = ({ aviary, open, toggle }) => {
  const aviaryName = aviary.aviaryName || aviary.name || `Aviário ${aviary.aviaryId}`;

  // Dados de mortalidade
  const mortalityData = {
    totalChickens: aviary.currentChickens || 0,
    totalRoosters: aviary.currentRoosters || 0,
    deadFemales: aviary.totalDeadChickens || 0,
    deadMales: aviary.totalDeadRoosters || 0,
    femaleMortality: aviary.chickenMortality || 0,
    maleMortality: aviary.roosterMortality || 0,
    generalMortality: aviary.mortality || 0,
  };

  // Dados de produção
  const productionData = {
    totalProduced: aviary.totalEggsCollected || 0,
    productionPercentage: aviary.production || 0,
    incubatableEggs: aviary.incubateEggs || 0,
    marketEggs: aviary.marketEggs || 0,
    eliminatedEggs: aviary.dumpEggs || 0,
  };

  // Dados da tabela de ovos com porcentagem
  const eggData = aviary.quantityByEggType || [];
  const totalEggs = eggData.reduce((sum: number, egg: any) => sum + (egg.quantity || 0), 0);
  
  const eggColumns = [
    {
      title: 'Tipo de Ovo',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => translateEggType(type),
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center' as const,
    },
    {
      title: 'Porcentagem',
      dataIndex: 'quantity',
      key: 'percentage',
      align: 'center' as const,
      render: (quantity: number) => {
        const percentage = totalEggs > 0 ? ((quantity / totalEggs) * 100).toFixed(1) : '0.0';
        return `${percentage}%`;
      },
    },
  ];

  return (
    <Card className="mb-4 shadow-sm border border-gray-200">
      <div 
        className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded"
        onClick={toggle}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          🏠 {aviaryName}
        </h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            🥚 {productionData.totalProduced} ovos • 
            💀 {mortalityData.generalMortality.toFixed(1)}% mortalidade
          </span>
          {open ? (
            <UpOutlined className="text-gray-500" />
          ) : (
            <DownOutlined className="text-gray-500" />
          )}
        </div>
      </div>

      {open && (
        <div className="mt-4 space-y-6">
          {/* 📊 TABELA DE OVOS - PRIMEIRO */}
          <Card 
            title={
              <div className="flex items-center">
                <BulbOutlined className="mr-2 text-orange-500" />
                <span className="text-lg font-semibold">📊 Detalhamento dos Ovos</span>
              </div>
            }
            className="border border-gray-200"
          >
            <Table
              dataSource={eggData}
              columns={eggColumns}
              pagination={false}
              size="small"
              rowKey="type"
              className="border border-gray-100 rounded"
            />
          </Card>

          {/* 🥚 CARD DE PRODUÇÃO - SEGUNDO (ACIMA DA MORTALIDADE) */}
          <Card 
            title={
              <div className="flex items-center">
                <RiseOutlined className="mr-2 text-green-500" />
                <span className="text-lg font-semibold">🥚 Produção</span>
              </div>
            }
            className="border border-gray-200"
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <StarOutlined className="text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">Total Produzido</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.totalProduced}
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <RiseOutlined className="text-green-500 mr-1" />
                    <span className="text-sm font-medium">% da Produção</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.productionPercentage.toFixed(1)}%
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <TrophyOutlined className="text-blue-500 mr-1" />
                    <span className="text-sm font-medium">Ovos Incubáveis</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.incubatableEggs}
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <ShoppingOutlined className="text-green-500 mr-1" />
                    <span className="text-sm font-medium">Ovos Mercado</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.marketEggs}
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <DeleteOutlined className="text-red-500 mr-1" />
                    <span className="text-sm font-medium">Ovos Eliminados</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {productionData.eliminatedEggs}
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

          {/* 💀 CARD DE MORTALIDADE - TERCEIRO (ABAIXO DA PRODUÇÃO) */}
          <Card 
            title={
              <div className="flex items-center">
                <FallOutlined className="mr-2 text-red-500" />
                <span className="text-lg font-semibold">💀 Mortalidade</span>
              </div>
            }
            className="border border-gray-200"
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <UserOutlined className="text-pink-500 mr-1" />
                    <span className="text-sm font-medium">Galinhas</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.totalChickens}
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <ManOutlined className="text-blue-500 mr-1" />
                    <span className="text-sm font-medium">Galos</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.totalRoosters}
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <FallOutlined className="text-red-500 mr-1" />
                    <span className="text-sm font-medium">Fêmeas Mortas</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.deadFemales}
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <FallOutlined className="text-red-500 mr-1" />
                    <span className="text-sm font-medium">Machos Mortos</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.deadMales}
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <FallOutlined className="text-red-500 mr-1" />
                    <span className="text-sm font-medium">Mortalidade Fêmeas</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.femaleMortality.toFixed(1)}%
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <FallOutlined className="text-red-500 mr-1" />
                    <span className="text-sm font-medium">Mortalidade Machos</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.maleMortality.toFixed(1)}%
                  </div>
                </Card>
              </Col>

              <Col xs={12} sm={8} md={6}>
                <Card className="text-center bg-white border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <FallOutlined className="text-red-500 mr-1" />
                    <span className="text-sm font-medium">Mortalidade Geral</span>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {mortalityData.generalMortality.toFixed(1)}%
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      )}
    </Card>
  );
};
