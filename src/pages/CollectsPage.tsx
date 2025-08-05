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
import { formatDateForInput } from '@/utils/formatDate';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { CollectChickenData } from '@/@types/CollectChickenData';
import chickenCollectHook from '@/hooks/useChickenCollect';


function CollectsPage() {
  
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [aviaries, setAviaries] = useState<AviaryData[]>([]);
  const [eggCollects, setEggCollects] = useState<CollectEggData[]>([]);
  const [chickenCollects, setChickenCollect] = useState<CollectChickenData[]>([]);
  const [selectedCollect, setSelectedCollect] = useState<CollectEggData | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<BatchData | null>(null);
  const [selectedAviary, setSelectedAviary] = useState<AviaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {farmId} = useFarm();


  const [currentDate, setCurrentDate] = useState(() => {
    const hoje = new Date();
    const isoDate = hoje.toISOString().split('T')[0];
    return isoDate;
  });

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

  useEffect(() => {
    const socket = new SockJS(`http://localhost:8080/ws-collect`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log('[STOMP]', str),
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe('/topic/collects', (message) => {
          if (message.body) {
            const newCollect = JSON.parse(message.body);

            const collectDate = newCollect.collectionDate?.substring(0, 10);
            const currentDateShort = currentDate;

            if (
              selectedAviary &&
              newCollect.aviaryId === selectedAviary.id &&
              collectDate === currentDateShort
            ) {
              console.log('Nova coleta recebida:', newCollect);
              setEggCollects(prev => [newCollect, ...prev]);
              toast.success('Nova coleta recebida!');
            }
          }
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [selectedAviary, currentDate]); 

  const fetchAviaries = async (batchId: number) => {
    try {
      const aviariesData = await batchHook.getAviariesByBatch(batchId);
      setAviaries(aviariesData);
    } catch (err) {
      toast.error('Erro ao carregar aviários');
      setAviaries([]);
    }
  };

  const fetchEggCollects = async (aviaryId: number) => {
    try {
      const formattedDate = formatDateForInput(currentDate); 
      const collects = await eggCollectHook.getByDateAndAviary(formattedDate, aviaryId);
      setEggCollects(collects);
    } catch (err) {
      toast.error('Erro ao carregar coletas de ovos');
      setEggCollects([]);
    }
  };

  const fetchChickenCollects = async (aviaryId: number) => {
    try {
      const formattedDate = formatDateForInput(currentDate); 
      const collects = await chickenCollectHook.getByDateAndAviary(formattedDate, aviaryId);
      setChickenCollect(collects);
    } catch (err) {
      toast.error('Erro ao carregar coletas de ovos');
      setChickenCollect([]);
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