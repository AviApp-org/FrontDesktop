import React, { useState } from 'react';
import { Plus, Save, X, Edit2, Check } from 'lucide-react';
import { Batch, Aviary, Bird } from '../@types/interfaces/batch';

function BatchManagement() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [showNewBatchForm, setShowNewBatchForm] = useState(false);
  const [showNewAviaryForm, setShowNewAviaryForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const [newBatchCode, setNewBatchCode] = useState('');
  const [newBatchDate, setNewBatchDate] = useState('');

  const [newAviaryName, setNewAviaryName] = useState('');
  const [newAviaryMaleBirds, setNewAviaryMaleBirds] = useState(0);
  const [newAviaryFemaleBirds, setNewAviaryFemaleBirds] = useState(0);

  const handleCreateBatch = () => {
    if (!newBatchCode || !newBatchDate) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const newBatch: Batch = {
      id: Date.now().toString(),
      code: newBatchCode,
      startDate: newBatchDate,
      aviaries: [],
      isActive: true,
    };

    setBatches(prev => [...prev, newBatch]);
    setNewBatchCode('');
    setNewBatchDate('');
    setShowNewBatchForm(false);
    setSelectedBatch(newBatch);
  };

  const handleCreateAviary = () => {
    if (!selectedBatch || !newAviaryName) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const newAviary: Aviary = {
      id: Date.now().toString(),
      name: newAviaryName,
      initialBirds: {
        male: newAviaryMaleBirds,
        female: newAviaryFemaleBirds,
      },
      currentBirds: {
        male: newAviaryMaleBirds,
        female: newAviaryFemaleBirds,
      },
      isActive: true,
    };

    setBatches(prev =>
      prev.map(batch => {
        if (batch.id === selectedBatch.id) {
          return {
            ...batch,
            aviaries: [...batch.aviaries, newAviary],
          };
        }
        return batch;
      })
    );

    setNewAviaryName('');
    setNewAviaryMaleBirds(0);
    setNewAviaryFemaleBirds(0);
    setShowNewAviaryForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Lotes</h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Lotes</h3>
            <button
              onClick={() => setShowNewBatchForm(true)}
              className="bg-green-600 text-white w-36 px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              <span>Novo Lote</span>
            </button>
          </div>

          {batches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {batches.map(batch => (
                <div
                  key={batch.id}
                  className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-colors ${
                    selectedBatch?.id === batch.id ? 'ring-2 ring-green-500' : ''
                  }`}
                  onClick={() => setSelectedBatch(batch)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Lote {batch.code}</h3>
                      <p className="text-sm text-gray-500">
                        Início: {new Date(batch.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        batch.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {batch.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Total de Aviários: {batch.aviaries.length}</p>
                    <p className="text-sm text-gray-600">
                      Total de Aves:{' '}
                      {batch.aviaries.reduce(
                        (acc, aviary) => acc + aviary.currentBirds.male + aviary.currentBirds.female,
                        0
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">Nenhum lote cadastrado</p>
            </div>
          )}
        </div>

        {selectedBatch && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Aviários do Lote {selectedBatch.code}</h3>
              <button
                onClick={() => setShowNewAviaryForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                <span>Novo Aviário</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedBatch.aviaries.map(aviary => (
                <div key={aviary.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold">{aviary.name}</h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        aviary.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {aviary.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Galos:</span>
                      <span className="font-medium">{aviary.currentBirds.male}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Galinhas:</span>
                      <span className="font-medium">{aviary.currentBirds.female}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Keep existing modals */}
      {showNewBatchForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Novo Lote</h3>
              <button
                onClick={() => setShowNewBatchForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código do Lote
                </label>
                <input
                  type="text"
                  value={newBatchCode}
                  onChange={e => setNewBatchCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: LOTE001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Início
                </label>
                <input
                  type="date"
                  value={newBatchDate}
                  onChange={e => setNewBatchDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                onClick={handleCreateBatch}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Criar Lote
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewAviaryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Novo Aviário</h3>
              <button
                onClick={() => setShowNewAviaryForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Aviário
                </label>
                <input
                  type="text"
                  value={newAviaryName}
                  onChange={e => setNewAviaryName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: Aviário A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade de Galos
                </label>
                <input
                  type="number"
                  value={newAviaryMaleBirds}
                  onChange={e => setNewAviaryMaleBirds(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade de Galinhas
                </label>
                <input
                  type="number"
                  value={newAviaryFemaleBirds}
                  onChange={e => setNewAviaryFemaleBirds(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  min="0"
                />
              </div>
              <button
                onClick={handleCreateAviary}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Criar Aviário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BatchManagement;
