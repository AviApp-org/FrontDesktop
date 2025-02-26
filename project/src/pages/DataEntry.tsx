import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface AviaryData {
  id: string;
  waterQuantity: number;
  liveBirds: {
    male: number;
    female: number;
  };
  eggs: {
    total: number;
    cracked: number;
    dirtyNest: number;
    small: number;
    incubatable: number;
    broken: number;
    deformed: number;
    thinShell: number;
    eliminated: number;
    market: number;
  };
}

interface AvailableAviary {
  id: string;
  name: string;
}

interface DataSubmission {
  id: string;
  timestamp: string;
  aviaryId: string;
  aviaryName: string;
  data: AviaryData;
}

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

const defaultAviaryData = {
  id: '',
  waterQuantity: 0,
  liveBirds: {
    male: 0,
    female: 0,
  },
  eggs: { ...defaultEggData },
};

// Generate a unique ID using timestamp and random number
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

function DataEntry() {
  const [aviaries, setAviaries] = useState<AviaryData[]>([
    { ...defaultAviaryData, id: generateUniqueId() }
  ]);

  // Lista de aviários disponíveis
  const [availableAviaries] = useState<AvailableAviary[]>([
    { id: '1', name: 'Aviário A' },
    { id: '2', name: 'Aviário B' },
    { id: '3', name: 'Aviário C' },
  ]);

  // Estado para histórico de envios
  const [submissions, setSubmissions] = useState<DataSubmission[]>([]);
  
  // Estado para aviário selecionado
  const [selectedAviary, setSelectedAviary] = useState<string>('');

  const handleAddAviary = () => {
    setAviaries([...aviaries, { ...defaultAviaryData, id: generateUniqueId() }]);
  };

  const handleRemoveAviary = (index: number) => {
    setAviaries(aviaries.filter((_, i) => i !== index));
  };

  const updateAviaryData = (index: number, field: string, value: number) => {
    const newAviaries = [...aviaries];
    const aviary = { ...newAviaries[index] };

    if (field === 'waterQuantity') {
      aviary.waterQuantity = value;
    } else if (field === 'male' || field === 'female') {
      aviary.liveBirds = { ...aviary.liveBirds, [field]: value };
    } else {
      aviary.eggs = { ...aviary.eggs, [field]: value };
    }

    newAviaries[index] = aviary;
    setAviaries(newAviaries);
  };

  const handleSubmit = () => {
    if (!selectedAviary) {
      alert('Por favor, selecione um aviário');
      return;
    }

    const newSubmissions = aviaries.map(aviary => ({
      id: generateUniqueId(),
      timestamp: new Date().toISOString(),
      aviaryId: selectedAviary,
      aviaryName: availableAviaries.find(a => a.id === selectedAviary)?.name || '',
      data: aviary
    }));

    setSubmissions(prev => [...newSubmissions, ...prev]);
    
    // Limpar os campos
    setAviaries([{ ...defaultAviaryData, id: generateUniqueId() }]);
    setSelectedAviary('');
  };

  // Função para editar submissão
  const handleEdit = (submission: DataSubmission) => {
    setSelectedAviary(submission.aviaryId);
    setAviaries([submission.data]);
    setSubmissions(prev => prev.filter(s => s.id !== submission.id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Entrada de Dados</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleAddAviary}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Adicionar Aviário</span>
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>Salvar Dados</span>
          </button>
        </div>
      </div>

      {/* Adicionar seletor de aviário após o título */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Selecione o Aviário
        </label>
        <select
          value={selectedAviary}
          onChange={(e) => setSelectedAviary(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
        >
          <option value="">Selecione...</option>
          {availableAviaries.map((aviary) => (
            <option key={aviary.id} value={aviary.id}>
              {aviary.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {aviaries.map((aviary, index) => (
          <div key={aviary.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Aviário {index + 1}
              </h3>
              {aviaries.length > 1 && (
                <button
                  onClick={() => handleRemoveAviary(index)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Water Quantity */}
              <div className="col-span-full md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade de Água (L)
                </label>
                <input
                  type="number"
                  value={aviary.waterQuantity}
                  onChange={(e) => updateAviaryData(index, 'waterQuantity', Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Live Birds */}
              <div className="col-span-full">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Aves Vivas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Machos
                    </label>
                    <input
                      type="number"
                      value={aviary.liveBirds.male}
                      onChange={(e) => updateAviaryData(index, 'male', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fêmeas
                    </label>
                    <input
                      type="number"
                      value={aviary.liveBirds.female}
                      onChange={(e) => updateAviaryData(index, 'female', Number(e.target.value))}
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
                      value={aviary.eggs.total}
                      onChange={(e) => updateAviaryData(index, 'total', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ovos Trincados
                    </label>
                    <input
                      type="number"
                      value={aviary.eggs.cracked}
                      onChange={(e) => updateAviaryData(index, 'cracked', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ovos Sujos de Ninho
                    </label>
                    <input
                      type="number"
                      value={aviary.eggs.dirtyNest}
                      onChange={(e) => updateAviaryData(index, 'dirtyNest', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ovos Pequenos
                    </label>
                    <input
                      type="number"
                      value={aviary.eggs.small}
                      onChange={(e) => updateAviaryData(index, 'small', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ovos Incubáveis
                    </label>
                    <input
                      type="number"
                      value={aviary.eggs.incubatable}
                      onChange={(e) => updateAviaryData(index, 'incubatable', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ovos Quebrados
                    </label>
                    <input
                      type="number"
                      value={aviary.eggs.broken}
                      onChange={(e) => updateAviaryData(index, 'broken', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ovos Deformados
                    </label>
                    <input
                      type="number"
                      value={aviary.eggs.deformed}
                      onChange={(e) => updateAviaryData(index, 'deformed', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ovos Casca Fina
                    </label>
                    <input
                      type="number"
                      value={aviary.eggs.thinShell}
                      onChange={(e) => updateAviaryData(index, 'thinShell', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Eliminados
                    </label>
                    <input
                      type="number"
                      value={aviary.eggs.eliminated}
                      onChange={(e) => updateAviaryData(index, 'eliminated', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ovos para Mercado
                    </label>
                    <input
                      type="number"
                      value={aviary.eggs.market}
                      onChange={(e) => updateAviaryData(index, 'market', Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Adicionar seção de histórico no final */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Histórico de Envios</h3>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{submission.aviaryName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(submission.timestamp).toLocaleString()}
                </p>
                <p className="text-sm">
                  Total de Ovos: {submission.data.eggs.total}
                </p>
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