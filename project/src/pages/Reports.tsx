import React, { useState } from 'react';
import { Button, Alert, Spin, Card, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import api from '../config/axios';


const { Option } = Select;

interface EggDetail {
  type: string;
  quantity: number;
}

interface AviaryReport {
  aviaryId: number;
  aviaryName: string;
  totalEggsCollected: number;
  totalDeadBirds: number;
  totalDeadChickens: number;
  totalDeadRoosters: number;
  currentChickens: number;
  currentRoosters: number;
  production: number;
  mortality: number;
  eggCollections: Array<{
    collectionTime: string;
    eggDetails: EggDetail[];
  }>;
  deathRecords: Array<{
    recordTime: string;
    deadChickens: number;
    deadRoosters: number;
    observations?: string;
  }>;
}

interface ReportData {
  date: string;
  aviaryReports: AviaryReport[];
  totalEggsCollected: number;
  totalDeadBirds: number;
  totalDeadChickens: number;
  totalDeadRoosters: number;
  currentChickens: number;
  currentRoosters: number;
  totalBirds: number;
  production: number;
  mortality: number;
  quantityByEggType: EggDetail[];
  percentageByEggType: Array<{ type: string; percentage: number }>;
}

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<'Diário' | 'Semanal' | 'Mensal'>('Diário');
  const [selectedDate, setSelectedDate] = useState<string>('2025-06-04'); // Formato YYYY-MM-DD
  const [batchId, setBatchId] = useState<number>(36);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openAviaries, setOpenAviaries] = useState<{ [key: number]: boolean }>({});

  // Função para formatar data de YYYY-MM-DD para DD-MM-YYYY
  const formatDateForAPI = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Função para formatar data para exibição DD/MM/YYYY
  const formatDateForDisplay = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Função para buscar o relatório
  const fetchReport = async () => {
    if (!selectedDate) {
      setError('Por favor, selecione uma data');
      return;
    }

    setLoading(true);
    setError(null);
    setReportData(null);

    try {
      const formattedDate = formatDateForAPI(selectedDate);
      const endpoint = `/api/daily-report/${batchId}/${formattedDate}`;
      
      console.log('🔍 Buscando relatório:', { 
        batchId, 
        originalDate: selectedDate,
        formattedDate, 
        endpoint 
      });

      const response = await api.get(endpoint);
      console.log('✅ Dados recebidos:', response.data);
      
      setReportData(response.data);
      
    } catch (err: any) {
      console.error('❌ Erro ao buscar relatório:', err);
      
      let errorMessage = 'Erro ao buscar relatório';
      if (err.response?.status === 404) {
        errorMessage = `Nenhum relatório encontrado para o lote ${batchId} na data ${formatDateForDisplay(selectedDate)}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleAviario = (id: number) => {
    setOpenAviaries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 mt-8"> 
        📊 Relatório {reportType} {reportType === 'Diário' && selectedDate ? `- ${formatDateForDisplay(selectedDate)}` : ''}
      </h1>

      {/* Filtros */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Relatório</label>
            <Select
              value={reportType}
              onChange={setReportType}
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
              onChange={setBatchId}
              style={{ width: 100 }}
            >
              <Option value={36}>Lote 36</Option>
              <Option value={1}>Lote 1</Option>
            </Select>
          </div>

          {reportType === 'Diário' && (
            <div>
              <label className="block text-sm font-medium mb-1">📅 Data</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
                style={{ width: '150px' }}
              />
            </div>
          )}

          <div style={{ paddingTop: '24px' }}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={fetchReport}
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
            <strong>Debug:</strong> Lote {batchId} | Data: {formatDateForDisplay(selectedDate)} | 
            API Format: {formatDateForAPI(selectedDate)} | 
            Status: {loading ? 'Carregando...' : reportData ? 'Dados carregados' : 'Aguardando'}
          </div>
        )}
      </Card>

      {/* Erro */}
      {error && (
        <Alert
          message="Erro ao carregar relatório"
          description={error}
          type="error"
          showIcon
          className="mb-6"
          action={
            <Button size="small" onClick={fetchReport}>
              Tentar Novamente
            </Button>
          }
        />
      )}

      {/* Loading */}
      {loading && (
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <p style={{ marginTop: '16px' }}>Carregando relatório...</p>
          </div>
        </Card>
      )}

      {/* Conteúdo do Relatório */}
      {reportData && !loading && reportType === 'Diário' && (
        <>
          {/* Resumo Geral */}
          <ResumoGeral summary={reportData} />
          
          {/* Distribuição de Tipos de Ovos */}
          <DistribuicaoOvos eggTypes={reportData.percentageByEggType} />
          
          {/* Aviários */}
          <div className="space-y-4">
            {reportData.aviaryReports.map((aviary) => (
              <Aviario
                key={aviary.aviaryId}
                aviary={aviary}
                open={!!openAviaries[aviary.aviaryId]}
                toggle={() => toggleAviario(aviary.aviaryId)}
              />
            ))}
          </div>
        </>
      )}

      {/* Estado vazio */}
      {!reportData && !loading && !error && (
        <Card>
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ color: '#666', marginBottom: '16px' }}>
              Selecione uma data para buscar o relatório
            </h3>
            <p style={{ color: '#999' }}>
              Os dados do relatório aparecerão organizados por aviários
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

// Componentes (igual ao anterior)
function ResumoGeral({ summary }: { summary: ReportData }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">📈 Resumo Geral</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <CardSummary label="🥚 Ovos coletados" value={summary.totalEggsCollected.toLocaleString()} />
        <CardSummary label="🐔 Galinhas" value={summary.currentChickens.toLocaleString()} />
        <CardSummary label="🐓 Galos" value={summary.currentRoosters.toLocaleString()} />
        <CardSummary label="⚰️ Mortes totais" value={summary.totalDeadBirds.toLocaleString()} />
        <CardSummary label="📊 Produção" value={`${summary.production.toFixed(1)}%`} />
      </div>
    </div>
  );
}

function DistribuicaoOvos({ eggTypes }: { eggTypes: Array<{ type: string; percentage: number }> }) {
  if (!eggTypes || eggTypes.length === 0) return null;

  return (
    <Card className="mb-6">
      <h3 className="font-semibold mb-4">🥚 Distribuição de Tipos de Ovos</h3>
      <div className="space-y-2">
        {eggTypes.map((egg) => (
          <div key={egg.type} className="flex items-center">
            <span className="inline-block w-32 font-medium text-sm">{egg.type}:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-4 mx-2">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(egg.percentage, 100)}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{egg.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Aviario({
  aviary,
  open,
  toggle,
}: {
  aviary: AviaryReport;
  open: boolean;
  toggle: () => void;
}) {
  return (
    <Card className="mb-4">
      <button
        onClick={toggle}
        className="w-full text-left font-semibold text-lg hover:text-blue-600 transition"
      >
        <div className="flex justify-between items-center">
          <span>
            🏠 {aviary.aviaryName || `Aviário ${aviary.aviaryId}`} - 
            Ovos: {aviary.totalEggsCollected.toLocaleString()}, 
            Mortes: {aviary.totalDeadBirds.toLocaleString()}, 
            Produção: {aviary.production.toFixed(1)}%
          </span>
          <span>{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          {/* Resumo do Aviário */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{aviary.currentChickens}</div>
              <div className="text-sm text-gray-600">🐔 Galinhas</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{aviary.currentRoosters}</div>
              <div className="text-sm text-gray-600">🐓 Galos</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{aviary.production.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">📈 Produção</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{aviary.mortality.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">💀 Mortalidade</div>
            </div>
          </div>

          {/* Coletas de Ovos */}
          {aviary.eggCollections && aviary.eggCollections.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">🥚 Coletas de Ovos</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Hora</th>
                      <th className="border border-gray-300 p-2">Tipo</th>
                      <th className="border border-gray-300 p-2">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aviary.eggCollections.map((collection, i) =>
                      collection.eggDetails.map((egg, j) => (
                        <tr key={`${i}-${j}`} className="text-center">
                          <td className="border border-gray-300 p-2">{collection.collectionTime}</td>
                          <td className="border border-gray-300 p-2">{egg.type}</td>
                          <td className="border border-gray-300 p-2">{egg.quantity.toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          

          {/* Registros de Mortes */}
          {aviary.deathRecords && aviary.deathRecords.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">💀 Registros de Mortes</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Hora</th>
                      <th className="border border-gray-300 p-2">Galinhas</th>
                      <th className="border border-gray-300 p-2">Galos</th>
                      <th className="border border-gray-300 p-2">Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aviary.deathRecords.map((death, i) => (
                      <tr key={i} className="text-center">
                        <td className="border border-gray-300 p-2">{death.recordTime}</td>
                        <td className="border border-gray-300 p-2">{death.deadChickens.toLocaleString()}</td>
                        <td className="border border-gray-300 p-2">{death.deadRoosters.toLocaleString()}</td>
                        <td className="border border-gray-300 p-2">{death.observations || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Caso não tenha dados */}
          {(!aviary.eggCollections || aviary.eggCollections.length === 0) && 
           (!aviary.deathRecords || aviary.deathRecords.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📋</div>
              <p>Nenhum registro detalhado disponível para este aviário</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function CardSummary({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center border">
      <div className="text-2xl font-bold text-blue-600">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
}

export default Reports;
