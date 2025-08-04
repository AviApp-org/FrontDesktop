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

function CollectsPage() {
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [aviaries, setAviaries] = useState<AviaryData[]>([]);
  const [eggCollects, setEggCollects] = useState<CollectEggData[]>([]);
  const [selectedCollect, setSelectedCollect] = useState<CollectEggData | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<BatchData | null>(null);
  const [selectedAviary, setSelectedAviary] = useState<AviaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { farmId } = useFarm();
  const currentDate = '04-08-2025';


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
      const collects = await eggCollectHook.getByDateAndAviary(currentDate, aviaryId);
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
      onBatchChange={handleBatchChange}
      onAviaryChange={handleAviaryChange}
      onSelectCollect={setSelectedCollect}
    />
  );
}

export default CollectsPage;