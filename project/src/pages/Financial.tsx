import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { PriceHistory, EggData, MonthlyData } from '../types/interfaces/financial';

function Financial() {
  const [unitPrice, setUnitPrice] = useState(0.07);
  const [currentMonth] = useState('Julho');
  
  const [priceHistory] = useState<PriceHistory[]>([
    { date: '12/08/2024', price: 0.42, change: 0.25 },
    { date: '12/08/2024', price: 0.39, change: -0.25 },
    { date: '12/08/2024', price: 0.43, change: -0.05 },
    { date: '12/08/2024', price: 0.38, change: -0.25 },
  ]);

  const [eggData] = useState<EggData[]>([
    { type: 'Ovo incubado', quantity: 13688, value: 1688.00 },
    { type: 'Ovo para mercado', quantity: 13688, value: 1688.00 },
  ]);

  const [monthlyData] = useState<MonthlyData>({
    totalEggs: 89922,
    incubatedEggs: 8556,
    marketEggs: 4666,
    incubatedValue: 89566.55,
    marketValue: 89566.55,
  });

  const handlePriceUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setUnitPrice(newPrice);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Financeiro</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Price History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Histórico de preço unitário do ovo</h3>
            <div className="space-y-2">
              {priceHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{item.date}</span>
                  <div className="flex items-center space-x-2">
                    <span>R$ {item.price.toFixed(2)}</span>
                    <span className={`text-sm ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ({item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Price */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Valor unitário do ovo</h3>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-green-600">
                  R$ {unitPrice.toFixed(2)}
                </span>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={unitPrice}
                    onChange={handlePriceUpdate}
                    className="w-32 px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Editar valor"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Egg Data */}
            <div className="space-y-4">
              {eggData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-t">
                  <div>
                    <h4 className="font-medium">{item.type}</h4>
                    <p className="text-gray-600">{item.quantity.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Valor</p>
                    <p className="text-gray-900">R$ {item.value.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                Mês de: <span className="text-green-600">{currentMonth}</span>
              </h3>
              <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                <Download className="h-5 w-5" />
                <span>Baixar como PDF</span>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Total de ovos: {monthlyData.totalEggs.toLocaleString()}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Ovos incubados</h4>
                  <p className="text-gray-600">{monthlyData.incubatedEggs.toLocaleString()}</p>
                  <p className="text-green-600">R$ {monthlyData.incubatedValue.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Ovos para mercado</h4>
                  <p className="text-gray-600">{monthlyData.marketEggs.toLocaleString()}</p>
                  <p className="text-green-600">R$ {monthlyData.marketValue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Financial;