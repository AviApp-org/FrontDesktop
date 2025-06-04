import { useState } from 'react';
import { useBatches, usePostBatchData, useUpdateBatchData, useActivateBatchData, useDeactivateBatchData } from './useBatch';
import { useAviaries, useCreateAviary, useUpdateAviary, useDeleteAviary } from './useAviary';
import { BatchData as Batch } from '../@types/BatchData';
import { AviaryData } from '../@types/AviaryData';
import { showErrorMessage } from '../utils/errorHandler';
import { CreateAviaryData } from '../@types/CreateAviaryData';

export const useBatchManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAviaryModalOpen, setIsAviaryModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [selectedAviary, setSelectedAviary] = useState<AviaryData | null>(null);
  const [expandedBatches, setExpandedBatches] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: batches = [], isLoading: isLoadingBatches } = useBatches() as { data: Batch[], isLoading: boolean };
  const { mutate: createBatch } = usePostBatchData();
  const { mutate: updateBatch } = useUpdateBatchData();
  const { mutate: activateBatch, isPending: isActivating } = useActivateBatchData();
  const { mutate: deactivateBatch, isPending: isDeactivating } = useDeactivateBatchData();
  const { mutate: createAviary } = useCreateAviary();
  const { mutate: updateAviary } = useUpdateAviary();
  const { mutate: deleteAviary } = useDeleteAviary();

  const { data: aviariesData, isLoading: isLoadingAviaries } = useAviaries(
    expandedBatches.length > 0 ? expandedBatches[expandedBatches.length - 1] : '0'
  );

  const handleError = (error: unknown, message: string) => {
    setError(`${message}: ${showErrorMessage(error)}`);
  };

  const toggleBatchExpansion = (batchId: string) => {
    if (!batchId) return;
    setExpandedBatches(prev => prev.includes(batchId) ? prev.filter(id => id !== batchId) : [batchId]);
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
    const payload = isEdit ? { id: selectedBatch?.id, data } : { ...data, farmId: "1" };

    mutation(payload, {
      onSuccess: () => {
        setIsModalOpen(false);
        setSelectedBatch(null);
        setIsSubmitting(false);
      },
      onError: (error) => {
        handleError(error, isEdit ? 'Erro ao atualizar lote' : 'Erro ao criar lote');
        setIsSubmitting(false);
      },
    });
  };

  const handleBatchAction = (action: 'activate' | 'deactivate', id: string) => {
    setError(null);
    const mutation = action === 'activate' ? activateBatch : deactivateBatch;
    mutation(id, {
      onError: (error) => handleError(error, `Erro ao ${action === 'activate' ? 'ativar' : 'desativar'} lote`),
    });
  };

  // Na função handleAviarySubmit:
const handleAviarySubmit = (aviaryData: CreateAviaryData) => {
  // Garantir que batchId seja number
  const dataToSend = {
    ...aviaryData,
    batchId: Number(aviaryData.batchId)
  };

  if (selectedAviary) {
    updateAviary({ id: String(selectedAviary.id), data: dataToSend }, {
      onSuccess: () => {
        setIsAviaryModalOpen(false);
        setSelectedAviary(null);
      },
      onError: (error) => {
        setError('Erro ao atualizar aviário: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      },
    });
  } else {
    createAviary(dataToSend, {
      onSuccess: () => {
        setIsAviaryModalOpen(false);
        setSelectedAviary(null);
      },
      onError: (error) => {
        setError('Erro ao criar aviário: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      },
    });
  }
};

  const handleAviaryDelete = (id: string) => {
    deleteAviary(id, {
      onError: (error) => handleError(error, 'Erro ao deletar aviário'),
    });
  };

  return {
    // State
    isModalOpen, setIsModalOpen,
    isAviaryModalOpen, setIsAviaryModalOpen,
    selectedBatch, setSelectedBatch,
    selectedAviary, setSelectedAviary,
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
