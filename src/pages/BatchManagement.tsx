import React, { useEffect, useState } from 'react';
import { BatchManagementTemplate } from '@/templates/Batch';
import { BatchData } from '@/@types/BatchData';
import { AviaryData } from '@/@types/AviaryData';
import batchHook from '@/hooks/useBatch';
import { toast } from 'react-toastify';
import { useFarm } from '@/contexts/FarmContext';
import aviaryHook from '@/hooks/useAviary';

const BatchManagement: React.FC = () => {
  // Estados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAviaryModalOpen, setIsAviaryModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<BatchData | null>(null);
  const [selectedAviary, setSelectedAviary] = useState<AviaryData | null>(null);
  const [expandedBatches, setExpandedBatches] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingBatches, setIsLoadingBatches] = useState(false);
  const [isLoadingAviaries, setIsLoadingAviaries] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  // Dados
  const [batches, setBatches] = useState<BatchData[]>([]);
  const [aviariesData, setAviariesData] = useState<AviaryData[]>([]);
  const { farmId } = useFarm();


  const fetchBatches = async () => {
    setIsLoadingBatches(true);
    setError(null);
    try {
      const batchesData = await batchHook.getBatchByFarm(farmId);
      setBatches(batchesData);
    } catch (err) {
      toast.error('Erro ao carregar lotes');
      setError('Erro ao carregar lotes');
    } finally {
      setIsLoadingBatches(false);
    }
  };

  const fetchAviaries = async (batchId: number) => {
    setIsLoadingAviaries(true);
    try {
      const aviaries = await aviaryHook.getAviariesByBatch(batchId);
      setAviariesData(aviaries);
    } catch (err) {
      toast.error('Erro ao carregar aviários');
      setAviariesData([]);
    } finally {
      setIsLoadingAviaries(false);
    }
  };


  useEffect(() => {

    fetchBatches();
  }, [farmId]);

  useEffect(() => {
    const lastExpandedBatch = expandedBatches[expandedBatches.length - 1];
    if (lastExpandedBatch) {
      fetchAviaries(Number(lastExpandedBatch));
    } else {
      setAviariesData([]);
    }
  }, [expandedBatches]);

  // Handlers
  const handleNewBatch = () => {
    setSelectedBatch(null);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleToggleExpansion = (batchId: string) => {
    if (!batchId) return;
    setExpandedBatches(prev =>
      prev.includes(batchId) ? prev.filter(id => id !== batchId) : [batchId]
    );
  };

  const handleEditBatch = (batch: BatchData) => {
    setSelectedBatch(batch);
    setFormErrors({});
    setIsModalOpen(true);
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

      await fetchBatches();
    } catch (error) {
      setError(`Erro ao ${action === 'activate' ? 'ativar' : 'desativar'} lote`);
    } finally {
      setIsActivating(false);
      setIsDeactivating(false);
    }
  };

  const handleBatchSubmit = async (data: any, isEdit: boolean) => {
    setError(null);
    setFormErrors({});
    setIsSubmitting(true);

    try {
      if (isEdit && selectedBatch?.id) {
        await batchHook.updateBatch(selectedBatch.id.toString(), data);
        toast.success('Lote atualizado com sucesso!');
      } else {
        await batchHook.createBatch(data);
        toast.success('Lote criado com sucesso!');
      }

      await fetchBatches();
      setIsModalOpen(false);
      setSelectedBatch(null);
    } catch (error) {
      toast.error(`Erro ao ${isEdit ? 'atualizar' : 'criar'} lote`);
      setError(`Erro ao ${isEdit ? 'atualizar' : 'criar'} lote`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseBatchModal = () => {
    setIsModalOpen(false);
    setSelectedBatch(null);
    setFormErrors({});
    setIsSubmitting(false);
  };

  const handleCreateAviary = (batch: BatchData) => {
    setSelectedBatch(batch);
    setSelectedAviary(null);
    setIsAviaryModalOpen(true);
  };

  const handleEditAviary = (batch: BatchData, aviary: AviaryData) => {
    setSelectedBatch(batch);
    setSelectedAviary(aviary);
    setIsAviaryModalOpen(true);
  };

  const handleAviarySubmit = async (aviaryData: AviaryData) => {
    try {
      setError(null);

      if (selectedAviary) {
        await aviaryHook.updateAviary(Number(selectedAviary.id), aviaryData);
        toast.success('Aviário atualizado com sucesso!');
      } else {
        await aviaryHook.createAviary(aviaryData);
        toast.success('Aviário criado com sucesso!');
      }

      const lastExpandedBatch = expandedBatches[expandedBatches.length - 1];
      if (lastExpandedBatch) {
        await fetchAviaries(Number(lastExpandedBatch));
      }

      setIsAviaryModalOpen(false);
      setSelectedAviary(null);
    } catch (error) {
      toast.error(`Erro ao ${selectedAviary ? 'atualizar' : 'criar'} aviário`);
      setError(`Erro ao ${selectedAviary ? 'atualizar' : 'criar'} aviário`);
    }
  };

  const handleAviaryDelete = async (id: string) => {
    try {
      await aviaryHook.deleteAviary(Number(id));
      const lastExpandedBatch = expandedBatches[expandedBatches.length - 1];
      if (lastExpandedBatch) {
        await fetchAviaries(Number(lastExpandedBatch));
      }
      toast.success("Aviário deletado com sucesso");
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao deletar aviário';
      toast.error(message);
      setError(message);
    }
  };


  const handleCloseAviaryModal = () => {
    setIsAviaryModalOpen(false);
    setSelectedAviary(null);
  };

  return (
    <div className="pb-8 min-h-screen w-full">
      <BatchManagementTemplate
        // Estados
        isModalOpen={isModalOpen}
        isAviaryModalOpen={isAviaryModalOpen}
        selectedBatch={selectedBatch}
        selectedAviary={selectedAviary}
        expandedBatches={expandedBatches}
        error={error}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        isLoadingBatches={isLoadingBatches}
        isLoadingAviaries={isLoadingAviaries}
        isActivating={isActivating}
        isDeactivating={isDeactivating}

        // Dados
        batches={batches}
        aviariesData={aviariesData}

        // Callbacks
        onNewBatch={handleNewBatch}
        onToggleExpansion={handleToggleExpansion}
        onEditBatch={handleEditBatch}
        onBatchAction={handleBatchAction}
        onBatchSubmit={handleBatchSubmit}
        onCloseBatchModal={handleCloseBatchModal}
        onCreateAviary={handleCreateAviary}
        onEditAviary={handleEditAviary}
        onAviarySubmit={handleAviarySubmit}
        onAviaryDelete={handleAviaryDelete}
        onCloseAviaryModal={handleCloseAviaryModal}
      />
    </div>
  );
};

export default BatchManagement;
