import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { toast } from 'react-toastify';
import { useFarm } from '@/contexts/FarmContext';
import batchHook from '@/hooks/useBatch';
import reportHook from '@/hooks/useReport';
import { WeeklyReportData } from '@/@types/WeeklyReportData';
import { BatchData } from '@/@types/BatchData';
import { formatDateForBackend } from '@/utils/formatDate';
import {
  getBirdsEvolutionData,
  getEggDestinationData,
  getEggDistributionData,
  getMortalityData,
  getProductionData
} from '@/utils/reportUtils';
import { Skeleton } from '@/components/Skeleton';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FF6B6B'];

function Dashboard() {
  const [weeklyData, setWeeklyData] = useState<WeeklyReportData | null>(null);
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    // Ajuste para pegar a data atual sem o problema do +1 dia
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [isLoading, setIsLoading] = useState(true);
  const { farmId } = useFarm();

  const activeBatches = batches.filter(batch => batch.status === "ACTIVE");

  const productionData = weeklyData ? getProductionData(weeklyData.dailyReports) : [];
  const mortalityData = weeklyData ? getMortalityData(weeklyData.dailyReports) : [];
  const eggDistributionData = weeklyData ? getEggDistributionData(weeklyData.dailyReports) : [];
  const birdsEvolutionData = weeklyData ? getBirdsEvolutionData(weeklyData.dailyReports) : [];
  const eggDestinationData = weeklyData ? getEggDestinationData(weeklyData.dailyReports) : [];

  // Carrega a lista de lotes ativos
  useEffect(() => {
    const fetchBatches = async () => {
      if (!farmId) return;
      try {
        setIsLoading(true);
        const batchesData = await batchHook.getBatchByFarm(farmId);
        setBatches(batchesData);

        // Seleciona o primeiro lote ativo por padrão
        const firstActiveBatch = batchesData.find(batch => batch.status === "ACTIVE");
        if (firstActiveBatch) {
          setSelectedBatchId(firstActiveBatch.id);
        }
      } catch (err) {
        toast.error('Erro ao carregar lotes');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBatches();
  }, [farmId]);

  // Carrega os dados semanais quando o batchId ou data muda
  useEffect(() => {
    const fetchWeeklyData = async () => {
      if (!selectedBatchId) return;
      try {
        setIsLoading(true);
        // Corrige o formato da data para o backend
        const formattedDate = formatDateForBackend(selectedDate);
        const weekReport = await reportHook.getWeek(selectedBatchId, formattedDate);
        setWeeklyData(weekReport);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast.error('Erro ao carregar dados semanais');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeeklyData();
  }, [selectedBatchId, selectedDate]);

  const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBatchId(parseInt(e.target.value));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  if (isLoading || !weeklyData) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-60" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[250px] w-full" />
          <Skeleton className="h-[250px] w-full" />
          <Skeleton className="h-[250px] w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[250px] w-full" />
          <Skeleton className="h-[250px] w-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Cabeçalho com seletores */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">

          {/* Select de Lotes - Mostra apenas ativos */}
          <div className="w-full md:w-64">
            <label htmlFor="batch-select" className="block text-sm font-medium text-gray-700 mb-1">
              Selecione o Lote
            </label>
            <select
              id="batch-select"
              value={selectedBatchId || ''}
              onChange={handleBatchChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isLoading}
            >
              {isLoading && <option value="">Carregando lotes...</option>}
              {!isLoading && activeBatches.length === 0 && (
                <option value="">Nenhum lote ativo disponível</option>
              )}
              {activeBatches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name} ({batch.id})
                </option>
              ))}
            </select>
          </div>

          {/* Seletor de Data - Corrigido para não adicionar +1 dia */}
          <div className="w-full md:w-48">
            <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Referência
            </label>
            <input
              type="date"
              id="date-select"
              value={selectedDate}
              onChange={handleDateChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isLoading}
              max={new Date().toISOString().split('T')[0]} // Impede selecionar datas futuras
            />
          </div>
        </div>

        {/* Período do relatório */}
        <div className="text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-lg whitespace-nowrap">
          Período: {new Date(weeklyData.startDate).toLocaleDateString()} a {new Date(weeklyData.endDate).toLocaleDateString()}
        </div>
      </div>

      {/* Gráficos (mantidos iguais) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Produção Diária */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Produção Diária</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" domain={[0, 15]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 'dataMax + 100']} hide />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="production" fill="#8884d8" name="Produção (%)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="totalEggs" fill="#82ca9d" name="Ovos Coletados" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mortalidade Diária */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Mortalidade Diária (%)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mortalityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 'auto']} />
                <Tooltip formatter={(value) => [`${value}%`, 'Mortalidade']} />
                <Legend />
                <Line type="monotone" dataKey="mortalidade" stroke="#ff6b6b" name="Total" strokeWidth={2} />
                <Line type="monotone" dataKey="mortalidadeGalinhas" stroke="#feca57" name="Galinhas" strokeWidth={2} />
                <Line type="monotone" dataKey="mortalidadeGaloes" stroke="#48dbfb" name="Galos" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribuição de Ovos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Distribuição de Ovos</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eggDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
                  innerRadius={40}
                  dataKey="value"
                >
                  {eggDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Quantidade']} />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Segunda Linha - Gráficos Secundários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Evolução do Plantel */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Evolução do Plantel</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={birdsEvolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Quantidade']} />
                <Legend />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#8884d8" fill="#8884d8" name="Total Aves" />
                <Area type="monotone" dataKey="galinhas" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Galinhas" />
                <Area type="monotone" dataKey="galoes" stackId="3" stroke="#ffc658" fill="#ffc658" name="Galos" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Destino dos Ovos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Destino dos Ovos</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eggDestinationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Quantidade']} />
                <Legend />
                <Bar dataKey="incubaveis" stackId="a" fill="#2ecc71" name="Incubáveis" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mercado" stackId="a" fill="#3498db" name="Mercado" radius={[4, 4, 0, 0]} />
                <Bar dataKey="descarte" stackId="a" fill="#e74c3c" name="Descarte" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Terceira Linha - Estatísticas Resumidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total de Aves</h3>
          <p className="text-2xl font-bold">
            {weeklyData.dailyReports[weeklyData.dailyReports.length - 1]?.totalBirds || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Produção Média</h3>
          <p className="text-2xl font-bold">
            {weeklyData.dailyReports.length > 0
              ? (weeklyData.dailyReports.reduce((sum, report) => sum + report.production, 0) / weeklyData.dailyReports.length).toFixed(1) + '%'
              : '0%'}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Mortalidade Média</h3>
          <p className="text-2xl font-bold">
            {weeklyData.dailyReports.length > 0
              ? (weeklyData.dailyReports.reduce((sum, report) => sum + report.mortality, 0) / weeklyData.dailyReports.length).toFixed(1) + '%'
              : '0%'}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Ovos Incubáveis</h3>
          <p className="text-2xl font-bold">
            {weeklyData.dailyReports[weeklyData.dailyReports.length - 1]?.hatchableEggs || 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;