import { useState, useEffect } from 'react';
import batchHook from './useBatch';
import { BatchData as Batch } from '../@types/BatchData';
import { AviaryData } from '../@types/AviaryData';
import { showErrorMessage } from '../utils/errorHandler';
import { CreateAviaryData } from '../@types/CreateAviaryData';
import aviaryHook from './useAviary';

export const useBatchManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAviaryModalOpen, setIsAviaryModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [selectedAviary, setSelectedAviary] = useState<AviaryData | null>(null);
  const [expandedBatches, setExpandedBatches] = useState<string[]>([]);
  const [aviariesData, setAviariesData] = useState<AviaryData[]>([]);
  const [isLoadingAviaries, setIsLoadingAviaries] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados para gerenciar os dados dos lotes
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoadingBatches, setIsLoadingBatches] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  // Carregar lotes da fazenda (assumindo farmId = 1)
  useEffect(() => {
    const fetchBatches = async () => {
      setIsLoadingBatches(true);
      try {
        const batchesData = await batchHook.getBatchByFarm(1);
        setBatches(batchesData);
      } catch (err) {
        console.error('Erro ao buscar lotes:', err);
        setError('Erro ao carregar lotes');
      } finally {
        setIsLoadingBatches(false);
      }
    };

    fetchBatches();
  }, []);

  // Efeito para buscar aviários do lote expandido
  useEffect(() => {
    const fetchAviaries = async () => {
      const lastExpandedBatch = expandedBatches[expandedBatches.length - 1];
      if (!lastExpandedBatch) {
        setAviariesData([]);
        return;
      }

      setIsLoadingAviaries(true);
      try {
        const aviaries = await aviaryHook.getAviariesByBatch(Number(lastExpandedBatch));
        setAviariesData(aviaries);
      } catch (err) {
        console.error('Erro ao buscar aviários:', err);
        setAviariesData([]);
      } finally {
        setIsLoadingAviaries(false);
      }
    };

    fetchAviaries();
  }, [expandedBatches]);

  const handleError = (error: unknown, message: string) => {
    setError(`${message}: ${showErrorMessage(error)}`);
  };

  const toggleBatchExpansion = (batchId: string) => {
    if (!batchId) return;
    setExpandedBatches(prev =>
      prev.includes(batchId) ? prev.filter(id => id !== batchId) : [batchId]
    );
  };

  const validateBatchData = (data: any) => {
    const errors: Record<string, string> = {};
    if (!data.name?.trim()) errors.name = 'Nome do lote é obrigatório';
    if (!data.startDate) errors.startDate = 'Data de início é obrigatória';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBatchSubmit = async (data: any, isEdit = false) => {
    setError(null);
    setFormErrors({});
    setIsSubmitting(true);

    if (!validateBatchData(data)) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEdit && selectedBatch?.id) {
        await batchHook.updateBatch(selectedBatch.id.toString(), data);
      } else {
        await batchHook.createBatch({ ...data, farmId: '1' });
      }
      
      // Recarregar a lista de lotes
      const updatedBatches = await batchHook.getBatchByFarm(1);
      setBatches(updatedBatches);
      
      setIsModalOpen(false);
      setSelectedBatch(null);
    } catch (error) {
      handleError(error, isEdit ? 'Erro ao atualizar lote' : 'Erro ao criar lote');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBatchAction = async (action: 'activate' | 'deactivate', id: string) => {
    setError(null);
    
    if (action === 'activate') {
      setIsActivating(true);
    } else {
      setIsDeactivating(true);
    }

    try {
      if (action === 'activate') {
        await batchHook.activateBatch(id);
      } else {
        await batchHook.deactivateBatch(id);
      }
      
      // Recarregar a lista de lotes
      const updatedBatches = await batchHook.getBatchByFarm(1);
      setBatches(updatedBatches);
    } catch (error) {
      handleError(error, `Erro ao ${action === 'activate' ? 'ativar' : 'desativar'} lote`);
    } finally {
      setIsActivating(false);
      setIsDeactivating(false);
    }
  };

  const handleAviarySubmit = async (aviaryData: CreateAviaryData) => {
    try {
      setError(null);

      const dataToSend = {
        ...aviaryData,
        batchId: Number(aviaryData.batchId),
      };

      if (selectedAviary) {
        await aviaryHook.updateAviary(Number(selectedAviary.id), dataToSend);
      } else {
        await aviaryHook.createAviary(dataToSend);
      }

      // Recarregar aviários se houver lote expandido
      const lastExpandedBatch = expandedBatches[expandedBatches.length - 1];
      if (lastExpandedBatch) {
        const aviaries = await aviaryHook.getAviariesByBatch(Number(lastExpandedBatch));
        setAviariesData(aviaries);
      }

      setIsAviaryModalOpen(false);
      setSelectedAviary(null);
    } catch (error) {
      setError(
        `Erro ao ${selectedAviary ? 'atualizar' : 'criar'} aviário: ` +
          (error instanceof Error ? error.message : 'Erro desconhecido')
      );
    }
  };

  const handleAviaryDelete = async (id: string) => {
    try {
      await aviaryHook.deleteAviary(Number(id));
      
      // Recarregar aviários se houver lote expandido
      const lastExpandedBatch = expandedBatches[expandedBatches.length - 1];
      if (lastExpandedBatch) {
        const aviaries = await aviaryHook.getAviariesByBatch(Number(lastExpandedBatch));
        setAviariesData(aviaries);
      }
    } catch (error) {
      handleError(error, 'Erro ao deletar aviário');
    }
  };

  return {
    // State
    isModalOpen,
    setIsModalOpen,
    isAviaryModalOpen,
    setIsAviaryModalOpen,
    selectedBatch,
    setSelectedBatch,
    selectedAviary,
    setSelectedAviary,
    expandedBatches,
    error,
    formErrors,
    isSubmitting,

    // Data
    batches,
    aviariesData,
    isLoadingBatches,
    isLoadingAviaries,
    isActivating,
    isDeactivating,

    // Actions
    toggleBatchExpansion,
    handleBatchSubmit,
    handleBatchAction,
    handleAviarySubmit,
    handleAviaryDelete,
  };
};
