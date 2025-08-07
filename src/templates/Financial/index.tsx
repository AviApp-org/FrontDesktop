import { Info } from 'lucide-react';

interface FinancialTemplateProps {
  batchId: number;
  setBatchId: (id: number) => void;
  date: string;
  setDate: (date: string) => void;
  weekStart: string;
  setWeekStart: (date: string) => void;
  monthYear: string;
  setMonthYear: (date: string) => void;
  loading: boolean;
  data: any;
  onFetchDaily: () => void;
  onFetchWeekly: () => void;
  onFetchMonthly: () => void;
}

export default function FinancialTemplate({
  batchId,
  setBatchId,
  date,
  setDate,
  weekStart,
  setWeekStart,
  monthYear,
  setMonthYear,
  loading,
  data,
  onFetchDaily,
  onFetchWeekly,
  onFetchMonthly,
}: FinancialTemplateProps) {
  return (
    <div className="mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-2xl p-6 mb-8 shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Relatório Financeiro</h2>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">ID do Lote</label>
            <input
              type="number"
              value={batchId}
              onChange={e => setBatchId(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="Digite o ID do lote"
              min={1}
            />
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
            />
            <button
              onClick={onFetchDaily}
              disabled={loading || !date || !batchId}
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
            />
            <button
              onClick={onFetchWeekly}
              disabled={loading || !weekStart || !batchId}
              className="mt-2 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-xl transition disabled:opacity-50"
            >
              Buscar Semanal
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mês/Ano (Mensal)</label>
            <input
              type="month"
              value={monthYear}
              onChange={e => setMonthYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={onFetchMonthly}
              disabled={loading || !monthYear || !batchId}
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