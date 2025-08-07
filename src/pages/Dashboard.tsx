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

import { WeeklyReportData } from '@/@types/WeeklyReportData';
import reportHook from '@/hooks/useReport';
import { formatDateForBackend } from '@/utils/formatDate';
import { getBirdsEvolutionData, getEggDestinationData, getEggDistributionData, getMortalityData, getProductionData } from '@/utils/reportUtils';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

function Dashboard() {
  const [weeklyData, setWeeklyData] = useState<WeeklyReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [batchId] = useState(3); // Pode ser dinâmico
  const [date] = useState('01-08-2025');
  const productionData = weeklyData ? getProductionData(weeklyData.dailyReports) : [];
  const mortalityData = weeklyData ? getMortalityData(weeklyData.dailyReports) : [];
  const eggDistributionData = weeklyData ? getEggDistributionData(weeklyData.dailyReports) : [];
  const birdsEvolutionData = weeklyData ? getBirdsEvolutionData(weeklyData.dailyReports) : [];
  const eggDestinationData = weeklyData ? getEggDestinationData(weeklyData.dailyReports) : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weekReport = await reportHook.getWeek(batchId, formatDateForBackend(date));
        setWeeklyData(weekReport);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [batchId, date]);

  if (isLoading) return <div>Carregando dados...</div>;
  if (!weeklyData) return <div>Nenhum dado disponível</div>;



  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Lote: {weeklyData?.batch}</h2>
        <div className="text-green-600 font-semibold">
          Período: {new Date(weeklyData?.startDate).toLocaleDateString()} a {new Date(weeklyData?.endDate).toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Produção */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">% de Produção (Última semana)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" domain={[0, 15]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 'dataMax + 100']} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="production" fill="#8884d8" name="Produção (%)" />
                <Bar yAxisId="right" dataKey="totalEggs" fill="#82ca9d" name="Ovos Coletados" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Mortalidade Diária (%)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mortalityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 'auto']} />
                <Tooltip formatter={(value) => [`${value}%`, 'Mortalidade']} />
                <Legend />
                <Line type="monotone" dataKey="mortalidade" stroke="#ff6b6b" name="Mortalidade Total" />
                <Line type="monotone" dataKey="mortalidadeGalinhas" stroke="#feca57" name="Mortalidade Galinhas" />
                <Line type="monotone" dataKey="mortalidadeGaloes" stroke="#48dbfb" name="Mortalidade Galos" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Distribuição de Ovos (Último dia)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eggDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {eggDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Quantidade']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Evolução do Plantel</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={birdsEvolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Quantidade']} />
                <Legend />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#ff9ff3" fill="#ff9ff3" name="Total Aves" />
                <Area type="monotone" dataKey="galinhas" stackId="2" stroke="#1dd1a1" fill="#1dd1a1" name="Galinhas" />
                <Area type="monotone" dataKey="galoes" stackId="3" stroke="#54a0ff" fill="#54a0ff" name="Galos" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h3 className="text-lg font-semibold mb-4">Destino dos Ovos</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eggDestinationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Quantidade']} />
                <Legend />
                <Bar dataKey="incubaveis" stackId="a" fill="#2ecc71" name="Incubáveis" />
                <Bar dataKey="mercado" stackId="a" fill="#3498db" name="Mercado" />
                <Bar dataKey="descarte" stackId="a" fill="#e74c3c" name="Descarte" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
