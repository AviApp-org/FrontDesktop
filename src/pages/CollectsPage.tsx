import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import batchHook from '@/hooks/useBatch';
import eggCollectHook from '@/hooks/useEggCollect';
import { useFarm } from '@/contexts/FarmContext';
import { BatchData } from '@/@types/BatchData';
import { AviaryData } from '@/@types/AviaryData';
import { CollectEggData } from '@/@types/CollectEggData';
import CollectsTemplate from '@/templates/Collects';
import { EggType } from '@/@types/enums/enumEggtype';
import { formatDateForInput, formatDateForBackend } from '@/utils/formatDate';


function CollectsPage() {
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [aviaries, setAviaries] = useState<AviaryData[]>([]);
  const [eggCollects, setEggCollects] = useState<CollectEggData[]>([]);
  const [selectedCollect, setSelectedCollect] = useState<CollectEggData | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<BatchData | null>(null);
  const [selectedAviary, setSelectedAviary] = useState<AviaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { farmId } = useFarm();


  const [currentDate, setCurrentDate] = useState(() => {
    const hoje = new Date();
    const isoDate = hoje.toISOString().split('T')[0];
    return isoDate; 
  });

  // Carrega lotes
  useEffect(() => {
    const fetchBatches = async () => {
      if (!farmId) return;
      try {
        setIsLoading(true);
        const batchesData = await batchHook.getBatchesByFarm(farmId);
        setBatches(batchesData);
      } catch (err) {
        toast.error('Erro ao carregar lotes');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBatches();
  }, [farmId]);

  // Carrega aviários quando lote é selecionado
  const fetchAviaries = async (batchId: number) => {
    try {
      const aviariesData = await batchHook.getAviariesByBatch(batchId);
      setAviaries(aviariesData);
    } catch (err) {
      toast.error('Erro ao carregar aviários');
      setAviaries([]);
    }
  };

  // Carrega coletas quando aviário é selecionado
  const fetchEggCollects = async (aviaryId: number) => {
  try {
    const formattedDate = formatDateForInput(currentDate); // usa seu util aqui
    const collects = await eggCollectHook.getByDateAndAviary(formattedDate, aviaryId);
    setEggCollects(collects);
  } catch (err) {
    toast.error('Erro ao carregar coletas de ovos');
    setEggCollects([]);
  }
};


  const handleBatchChange = (batchId: string) => {
    const batch = batches.find(b => b.id === parseInt(batchId)) || null;
    setSelectedBatch(batch);
    setSelectedAviary(null);
    setEggCollects([]);
    setSelectedCollect(null);
    if (batch?.id) fetchAviaries(batch.id);
  };

  const handleAviaryChange = (aviaryId: string) => {
    const aviary = aviaries.find(a => a.id === parseInt(aviaryId)) || null;
    setSelectedAviary(aviary);
    setSelectedCollect(null);
    if (aviary?.id) fetchEggCollects(aviary.id);
  };

  const handleDateChange = (newDate: string) => {
    setCurrentDate(newDate);
    if (selectedAviary?.id) fetchEggCollects(selectedAviary.id);
  };

  return (
    <CollectsTemplate
      batches={batches}
      aviaries={aviaries}
      eggCollects={eggCollects}
      selectedBatch={selectedBatch}
      selectedAviary={selectedAviary}
      selectedCollect={selectedCollect}
      isLoading={isLoading}
      eggTypeLabels={EggType}
      currentDate={currentDate}
      onDateChange={handleDateChange}
      onBatchChange={handleBatchChange}
      onAviaryChange={handleAviaryChange}
      onSelectCollect={setSelectedCollect}
    />
  );
}

export default CollectsPage;