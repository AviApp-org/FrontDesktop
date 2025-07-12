import { useState, useEffect } from 'react';
import {
  useBatches,
  usePostBatchData,
  useUpdateBatchData,
  useActivateBatchData,
  useDeactivateBatchData,
} from './useBatch';
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

  const { data: batches = [], isLoading: isLoadingBatches } = useBatches() as {
    data: Batch[];
    isLoading: boolean;
  };

  const { mutate: createBatch } = usePostBatchData();
  const { mutate: updateBatch } = useUpdateBatchData();
  const { mutate: activateBatch, isPending: isActivating } = useActivateBatchData();
  const { mutate: deactivateBatch, isPending: isDeactivating } = useDeactivateBatchData();

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

  const handleBatchSubmit = (data: any, isEdit = false) => {
    setError(null);
    setFormErrors({});
    setIsSubmitting(true);

    if (!validateBatchData(data)) {
      setIsSubmitting(false);
      return;
    }

    const mutation = isEdit ? updateBatch : createBatch;
    const payload = isEdit ? { id: selectedBatch?.id, data } : { ...data, farmId: '1' };

    mutation(payload, {
      onSuccess: () => {
        setIsModalOpen(false);
        setSelectedBatch(null);
        setIsSubmitting(false);
      },
      onError: error => {
        handleError(error, isEdit ? 'Erro ao atualizar lote' : 'Erro ao criar lote');
        setIsSubmitting(false);
      },
    });
  };

  const handleBatchAction = (action: 'activate' | 'deactivate', id: string) => {
    setError(null);
    const mutation = action === 'activate' ? activateBatch : deactivateBatch;
    mutation(id, {
      onError: error =>
        handleError(error, `Erro ao ${action === 'activate' ? 'ativar' : 'desativar'} lote`),
    });
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
