
import { Info } from 'lucide-react';
import { Aviary, Category, CollectionEntry, DeadBirds, } from '@/@types/collection';
import { BatchData } from '@/@types/BatchData';
import { AviaryData } from '@/@types/AviaryData';
import batchHook from '@/hooks/useBatch';
import { toast } from 'react-toastify';
import { CollectEggData } from '@/@types/CollectEggData';
import eggCollectHook from '@/hooks/useEggCollect';
import { useEffect, useState } from 'react';

function CollectionReview() {

  const [batches, setBatches] = useState<BatchData[]>([]);
  const [aviaries, setAviaries] = useState<AviaryData[]>([]);
  const [eggCollects, setEggCollects] = useState<CollectEggData[]>([]);

  const [selectedBatch, setSelectedBatch] = useState<BatchData | null>(null);
  const [selectedAviary, setSelectedAviary] = useState<AviaryData | null>(null);

  const fetchBatches = async () => {
    try {
      const batchesData = await batchHook.getBatchesByFarm(parseInt(localStorage.getItem('farmId') || ''));
      setBatches(batchesData);
    } catch (err) {
      toast.error('Erro ao carregar lotes');
    }
  };

  const fetchAviaries = async (batchId: number) => {
    try {
      const aviaries = await batchHook.getAviariesByBatch(batchId);
      setAviaries(aviaries);
    } catch (err) {
      toast.error('Erro ao carregar aviários');
      setAviaries([]);
    }
  };

  const fetchEggCollects = async (aviaryId: number, date: string) => {
    try {
      const collects = await eggCollectHook.getByDateAndAviary(date, aviaryId);
      setEggCollects(collects);
    } catch (err) {
      toast.error('Erro ao carregar coletas de ovos');
      setEggCollects([]);
    }
  };

  const [collectionHistory] = useState<CollectionEntry[]>([
    { time: '06:50', collector: 'Pedro Paulo', status: 'Incubáveis', units: 1153 },
    { time: '06:30', collector: 'Pedro Paulo', status: 'Ovos incubáveis: 0' },
    { time: '06:30', collector: 'Pedro Paulo', status: 'Ovos sujos: 0' },
    { time: '06:30', collector: 'Pedro Paulo', status: 'Ovos deformados: 0' },
    { time: '06:30', collector: 'Pedro Paulo', status: 'Ovos rejeitados: 0' },
  ]);

  const [deadBirds, setDeadBirds] = useState<DeadBirds>({
    male: 16,
    female: 53,
  });

  const [categories, setCategories] = useState<Category[]>([
    { name: 'Incubáveis', total: 1153, cages: '', quantity: 0 },
    { name: 'Deformados', total: 1153, cages: '', quantity: 0 },
    { name: 'Eliminados', total: 1153, cages: '', quantity: 0 },
    { name: 'Incubáveis', total: 1153, cages: '', quantity: 0 },
  ]);

  const currentDate = '12/08/2024';

   // ✅ Carrega os lotes ao montar o componente
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const farmId = parseInt(localStorage.getItem('farmId') || '');
        const batchesData = await batchHook.getBatchesByFarm(farmId);
        setBatches(batchesData);
      } catch (err) {
        toast.error('Erro ao carregar lotes');
      }
    };

    fetchBatches();
  }, []);


  const handleCategoryChange = (
    index: number,
    field: 'cages' | 'quantity',
    value: string | number
  ) => {
    const newCategories = [...categories];
    newCategories[index] = {
      ...newCategories[index],
      [field]: value,
    };
    setCategories(newCategories);
  };

  const handleDeadBirdsChange = (type: 'male' | 'female', value: string) => {
    const numValue = parseInt(value) || 0;
    setDeadBirds(prev => ({
      ...prev,
      [type]: numValue,
    }));
  };

  const handleSave = () => {
    console.log('Saving categories:', categories);
  };

  const handleFinish = () => {
    console.log('Finishing collection review:', { categories, deadBirds });
  };

  return (

    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Revisão de Coleta</h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Seleção de Aviário</h3>
          </div>

           <div className="max-w-md space-y-4 mb-6">
            {/* 🔹 Select de Lote */}
            <select
              value={selectedBatch?.id?.toString() || ''}
              onChange={e => {
                const selectedId = parseInt(e.target.value);
                const batch = batches.find(b => b.id === selectedId) || null;
                setSelectedBatch(batch);
                setSelectedAviary(null); // Reset ao trocar de lote
                if (batch?.id) fetchAviaries(batch.id);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione um lote</option>
              {batches.map(batch => (
                <option key={batch.id} value={batch.id}>{batch.name}</option>
              ))}
            </select>

            {/* 🔹 Select de Aviário (só aparece se tiver lote selecionado) */}
            {selectedBatch && (
              <select
                id="aviary-select"
                value={selectedAviary?.id?.toString() || ''}
                onChange={e => {
                  const selectedId = parseInt(e.target.value);
                  const aviary = aviaries.find(a => a.id === selectedId) || null;
                  setSelectedAviary(aviary);
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione um aviário</option>
                {aviaries.map(aviary => (
                  <option key={aviary.id} value={aviary.id?.toString()}>
                    {aviary.name} - Aves:{' '}
                    {(aviary.currentAmountOfRooster ?? aviary.initialAmountOfRoosters) +
                      (aviary.currentAmountOfChickens ?? aviary.initialAmountOfChickens)}
                  </option>
                ))}
              </select>
            )}
          </div>

          {selectedAviary ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Histórico de coleta</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Info className="h-4 w-4 mr-1" />
                    <span>Clique para mais informações</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {collectionHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">{currentDate}</span>
                        <span className="text-gray-600">{entry.time}</span>
                        <span className="font-medium">{entry.collector}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>{entry.status}</span>
                        {entry.units && (
                          <span className="text-gray-600">Unidades: {entry.units}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg border p-6">
                  {categories.map((category, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <h4 className="font-medium">{category.name}</h4>
                        <span className="text-gray-500">Total: {category.total}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Carrinhos"
                          value={category.cages}
                          onChange={e => handleCategoryChange(index, 'cages', e.target.value)}
                          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="number"
                          placeholder="Unidade"
                          value={category.quantity}
                          onChange={e => handleCategoryChange(index, 'quantity', parseInt(e.target.value) || 0)}
                          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={handleSave} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors mt-6">
                    Salvar
                  </button>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold mb-4">Contagem de aves mortas</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Galos</label>
                      <input
                        type="number"
                        value={deadBirds.male}
                        onChange={e => handleDeadBirdsChange('male', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Galinhas</label>
                      <input
                        type="number"
                        value={deadBirds.female}
                        onChange={e => handleDeadBirdsChange('female', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <button onClick={handleFinish} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors mt-6">
                    Finalizar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Selecione um aviário para visualizar os dados de coleta
            </div>
          )}
        </div>
      </div>
    </div>

  );
}

export default CollectionReview;
