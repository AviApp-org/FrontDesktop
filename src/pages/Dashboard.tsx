import React, { useState } from 'react';
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
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d'];

function Dashboard() {
  const [weeklyData, setWeeklyData] = useState([
    { name: 'Dom', producao: 20, aproveitamento: 15 },
    { name: 'Seg', producao: 65, aproveitamento: 70 },
    { name: 'Ter', producao: 70, aproveitamento: 72 },
    { name: 'Qua', producao: 35, aproveitamento: 40 },
    { name: 'Qui', producao: 85, aproveitamento: 90 },
    { name: 'Sex', producao: 30, aproveitamento: 35 },
    { name: 'Sáb', producao: 0, aproveitamento: 0 },
  ]);

  const [ovosTotais, setOvosTotais] = useState([
    { name: 'Ovos Totais', value: 4666222 },
    { name: 'Ovos Incubáveis', value: 4380266 },
  ]);

  const [viabilidade, setViabilidade] = useState([
    { name: 'Viabilidade', value: 56 },
    { name: 'Inviabilidade', value: 44 },
  ]);

  const [saldoAves, setSaldoAves] = useState([
    { mes: 'JAN', saldo: 87831 },
    { mes: 'FEV', saldo: 82000 },
    { mes: 'MAR', saldo: 75000 },
    { mes: 'ABR', saldo: 70000 },
    { mes: 'MAI', saldo: 65000 },
    { mes: 'JUN', saldo: 60000 },
    { mes: 'JUL', saldo: 55000 },
    { mes: 'AGO', saldo: 50000 },
    { mes: 'SET', saldo: 48000 },
    { mes: 'OUT', saldo: 45000 },
    { mes: 'NOV', saldo: 44000 },
    { mes: 'DEZ', saldo: 43652 },
  ]);

  const handleDataUpdate = (index: number, field: 'producao' | 'aproveitamento', value: number) => {
    const newData = [...weeklyData];
    newData[index] = { ...newData[index], [field]: value };
    setWeeklyData(newData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="text-green-600 font-semibold">Idade: 28 Semanas</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Production Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">% de Produção (Última semana)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="producao" fill="#8884d8" name="Produção" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Atualizar dados:</h4>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <div key={day.name}>
                  <label className="block text-sm text-gray-600">{day.name}</label>
                  <input
                    type="number"
                    value={day.producao}
                    onChange={e => handleDataUpdate(index, 'producao', Number(e.target.value))}
                    className="w-full p-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Utilization Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">% de Aproveitamento (Última semana)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="aproveitamento" fill="#82ca9d" name="Aproveitamento" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Atualizar dados:</h4>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <div key={day.name}>
                  <label className="block text-sm text-gray-600">{day.name}</label>
                  <input
                    type="number"
                    value={day.aproveitamento}
                    onChange={e =>
                      handleDataUpdate(index, 'aproveitamento', Number(e.target.value))
                    }
                    className="w-full p-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Eggs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Ovos Totais vs Incubáveis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ovosTotais}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {ovosTotais.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Viability */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Viabilidade</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={viabilidade}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {viabilidade.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Birds Balance */}
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h3 className="text-lg font-semibold mb-4">Saldo de Aves</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={saldoAves}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="saldo" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
