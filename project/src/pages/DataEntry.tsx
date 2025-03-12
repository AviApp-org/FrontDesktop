import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { AviaryData, AvailableAviary } from '../types/interfaces/aviary';
import { DataSubmission } from '../types/interfaces/submission';

// Valores padrão
const defaultEggData = {
  total: 0,
  cracked: 0,
  dirtyNest: 0,
  small: 0,
  incubatable: 0,
  broken: 0,
  deformed: 0,
  thinShell: 0,
  eliminated: 0,
  market: 0,
};

const defaultAviaryData: AviaryData = {
  id: '',
  waterQuantity: 0,
  temperature: {
    max: 0,
    min: 0,
  },
  liveBirds: {
    male: 0,
    female: 0,
  },
  eggs: { ...defaultEggData },
};

// Função auxiliar
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

function DataEntry() {
  // Estados
  const [aviaryData, setAviaryData] = useState<AviaryData>({
    ...defaultAviaryData,
    id: generateUniqueId(),
  });

  const [availableAviaries] = useState<AvailableAviary[]>([
    { id: '1', name: 'Aviário A' },
    { id: '2', name: 'Aviário B' },
    { id: '3', name: 'Aviário C' },
  ]);

  const [submissions, setSubmissions] = useState<DataSubmission[]>([]);
  const [selectedAviary, setSelectedAviary] = useState<string>('');

  // Handlers
  const updateAviaryData = (field: string, value: number) => {
    setAviaryData(prev => {
      const updatedData = { ...prev };

      if (field === 'waterQuantity') {
        updatedData.waterQuantity = value;
      } else if (field === 'tempMax') {
        updatedData.temperature = { ...updatedData.temperature, max: value };
      } else if (field === 'tempMin') {
        updatedData.temperature = { ...updatedData.temperature, min: value };
      } else if (field === 'male' || field === 'female') {
        updatedData.liveBirds = { ...updatedData.liveBirds, [field]: value };
      } else {
        updatedData.eggs = { ...updatedData.eggs, [field]: value };
      }

      return updatedData;
    });
  };

  const handleSubmit = () => {
    if (!selectedAviary) {
      alert('Por favor, selecione um aviário');
      return;
    }

    const newSubmission: DataSubmission = {
      id: generateUniqueId(),
      timestamp: new Date().toISOString(),
      aviaryId: selectedAviary,
      aviaryName: availableAviaries.find(a => a.id === selectedAviary)?.name || '',
      data: aviaryData,
    };

    setSubmissions(prev => [newSubmission, ...prev]);
    setAviaryData({ ...defaultAviaryData, id: generateUniqueId() });
  };

  const handleEdit = (submission: DataSubmission) => {
    setSelectedAviary(submission.aviaryId);
    setAviaryData(submission.data);
    setSubmissions(prev => prev.filter(s => s.id !== submission.id));
  };

  // JSX
  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Entrada de Dados</h2>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>Salvar Dados</span>
        </button>
      </div>

      {/* Seletor de Aviário */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Selecione o Aviário</label>
        <select
          value={selectedAviary}
          onChange={e => setSelectedAviary(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
        >
          <option value="">Selecione...</option>
          {availableAviaries.map(aviary => (
            <option key={aviary.id} value={aviary.id}>
              {aviary.name}
            </option>
          ))}
        </select>
      </div>

      {/* Formulário */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Water and Temperature Section */}
          <div className="col-span-full">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Água e Temperatura</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade de Água (L)
                </label>
                <input
                  type="number"
                  value={aviaryData.waterQuantity}
                  onChange={e => updateAviaryData('waterQuantity', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperatura Máxima (°C)
                </label>
                <input
                  type="number"
                  value={aviaryData.temperature.max}
                  onChange={e => updateAviaryData('tempMax', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperatura Mínima (°C)
                </label>
                <input
                  type="number"
                  value={aviaryData.temperature.min}
                  onChange={e => updateAviaryData('tempMin', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Live Birds */}
          <div className="col-span-full">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Aves Vivas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Machos</label>
                <input
                  type="number"
                  value={aviaryData.liveBirds.male}
                  onChange={e => updateAviaryData('male', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fêmeas</label>
                <input
                  type="number"
                  value={aviaryData.liveBirds.female}
                  onChange={e => updateAviaryData('female', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Eggs Section */}
          <div className="col-span-full">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Produção de Ovos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total de Ovos
                </label>
                <input
                  type="number"
                  value={aviaryData.eggs.total}
                  onChange={e => updateAviaryData('total', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ovos Trincados
                </label>
                <input
                  type="number"
                  value={aviaryData.eggs.cracked}
                  onChange={e => updateAviaryData('cracked', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ovos Sujos de Ninho
                </label>
                <input
                  type="number"
                  value={aviaryData.eggs.dirtyNest}
                  onChange={e => updateAviaryData('dirtyNest', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ovos Pequenos
                </label>
                <input
                  type="number"
                  value={aviaryData.eggs.small}
                  onChange={e => updateAviaryData('small', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ovos Incubáveis
                </label>
                <input
                  type="number"
                  value={aviaryData.eggs.incubatable}
                  onChange={e => updateAviaryData('incubatable', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ovos Quebrados
                </label>
                <input
                  type="number"
                  value={aviaryData.eggs.broken}
                  onChange={e => updateAviaryData('broken', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ovos Deformados
                </label>
                <input
                  type="number"
                  value={aviaryData.eggs.deformed}
                  onChange={e => updateAviaryData('deformed', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ovos Casca Fina
                </label>
                <input
                  type="number"
                  value={aviaryData.eggs.thinShell}
                  onChange={e => updateAviaryData('thinShell', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eliminados</label>
                <input
                  type="number"
                  value={aviaryData.eggs.eliminated}
                  onChange={e => updateAviaryData('eliminated', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ovos para Mercado
                </label>
                <input
                  type="number"
                  value={aviaryData.eggs.market}
                  onChange={e => updateAviaryData('market', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Histórico de Submissões */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Histórico de Envios</h3>
        <div className="space-y-4">
          {submissions.map(submission => (
            <div
              key={submission.id}
              className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{submission.aviaryName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(submission.timestamp).toLocaleString()}
                </p>
                <p className="text-sm">Total de Ovos: {submission.data.eggs.total}</p>
              </div>
              <button
                onClick={() => handleEdit(submission)}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DataEntry;
