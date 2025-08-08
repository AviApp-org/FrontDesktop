import { Info } from 'lucide-react';
import { BatchData } from '@/@types/BatchData';
import React, { useState } from 'react';

interface FinancialTemplateProps {
  batches: BatchData[];
  selectedBatch: BatchData | null;
  setSelectedBatch: (batch: BatchData | null) => void;
  date: string;
  setDate: (date: string) => void;
  weekStart: string;
  setWeekStart: (date: string) => void;
  monthYear: string;
  setMonthYear: (date: string) => void;
  eggValue: number;
  setEggValue: (value: number) => void;
  onSaveEggValue: () => void;
  loading: boolean;
  data: any;
  onFetchDaily: () => void;
  onFetchWeekly: () => void;
  onFetchMonthly: () => void;
}

export default function FinancialTemplate({
  batches,
  selectedBatch,
  setSelectedBatch,
  date,
  setDate,
  weekStart,
  setWeekStart,
  monthYear,
  setMonthYear,
  eggValue,
  setEggValue,
  onSaveEggValue,
  loading,
  data,
  onFetchDaily,
  onFetchWeekly,
  onFetchMonthly,
}: FinancialTemplateProps) {
  // Estados locais para mês e ano
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(monthYear.split('-')[1] || '');
  const [selectedYear, setSelectedYear] = useState(monthYear.split('-')[0] || String(currentYear));

  // Atualiza o estado global monthYear ao trocar mês ou ano
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    if (selectedYear && month) setMonthYear(`${selectedYear}-${month}`);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (year && selectedMonth) setMonthYear(`${year}-${selectedMonth}`);
  };

  return (
    <div className="mx-auto p-4">
      <div className="bg-white rounded-2xl p-6 mb-8 shadow">
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Selecione um Lote</label>
            <select
              value={selectedBatch?.id?.toString() || ''}
              onChange={e => {
                const batch = batches.find(b => b.id === parseInt(e.target.value)) || null;
                setSelectedBatch(batch);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              disabled={loading || batches.length === 0}
            >
              <option value="">Selecione um lote</option>
              {batches.map(batch => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Valor Unitário do Ovo (R$)</label>
            <input
              type="number"
              value={eggValue}
              onChange={e => setEggValue(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
              placeholder="Digite o valor do ovo"
              min={0}
              step="0.01"
              disabled={loading}
            />
            <button
              onClick={onSaveEggValue}
              disabled={loading || !eggValue}
              className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-xl transition disabled:opacity-50"
            >
              Salvar Valor do Ovo
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Data (Diário)</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
            <button
              onClick={onFetchDaily}
              disabled={loading || !date || !selectedBatch}
              className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition disabled:opacity-50"
            >
              Buscar Diário
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Data Inicial (Semanal)</label>
            <input
              type="date"
              value={weekStart}
              onChange={e => setWeekStart(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={loading}
            />
            <button
              onClick={onFetchWeekly}
              disabled={loading || !weekStart || !selectedBatch}
              className="mt-2 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-xl transition disabled:opacity-50"
            >
              Buscar Semanal
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mês/Ano (Mensal)</label>
            <div className="flex gap-2">
              <select
                value={selectedMonth}
                onChange={e => handleMonthChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
                disabled={loading}
              >
                <option value="">Mês</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = String(i + 1).padStart(2, '0');
                  return <option key={month} value={month}>{month}</option>;
                })}
              </select>
              <select
                value={selectedYear}
                onChange={e => handleYearChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
                disabled={loading}
              >
                <option value="">Ano</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = currentYear - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
            <button
              onClick={onFetchMonthly}
              disabled={loading || !monthYear || !selectedBatch}
              className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition disabled:opacity-50"
            >
              Buscar Mensal
            </button>
          </div>
        </div>
        {data ? (
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 mt-6 border border-green-200 shadow">
            <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" />
              Resultado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-green-100">
                <div className="text-green-800 font-medium text-sm mb-1">Ovos Incubáveis</div>
                <div className="text-2xl font-bold text-gray-800">R$ {data.hatchableTotal}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-orange-100">
                <div className="text-orange-800 font-medium text-sm mb-1">Ovos Comerciais</div>
                <div className="text-2xl font-bold text-gray-800">R$ {data.marketTotal}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <div className="text-blue-800 font-medium text-sm mb-1">Valor Total</div>
                <div className="text-2xl font-bold text-gray-800">R$ {data.total}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg flex flex-col items-center justify-center py-10 mt-6 text-center">
            <Info className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum resultado</h3>
            <p className="text-gray-500">
              Selecione o lote e a data desejada para visualizar o relatório financeiro.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}