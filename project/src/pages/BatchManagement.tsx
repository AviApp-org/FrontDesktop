import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useBatchManagement } from '../hooks/useBatchManagement';
import { BatchTable } from '../components/BatchTable';
import { AviaryTable } from '../components/AviaryTable';
import { BatchModal } from '../components/BatchModal';
import { AviaryModal } from '../components/AviaryModal';
import Button from '../components/Button';
import { BatchHeader } from '../components/BatchHeader';

export function BatchManagement() {
  const {
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
    batches,
    aviariesData,
    isLoadingBatches,
    isLoadingAviaries,
    isActivating,
    isDeactivating,
    toggleBatchExpansion,
    handleBatchSubmit,
    handleBatchAction,
    handleAviarySubmit,
    handleAviaryDelete,
  } = useBatchManagement();

  return (
    <div className="pt-16 pb-8 min-h-screen bg-gray-50 w-full">
      <BatchHeader onNewBatch={() => setIsModalOpen(true)} error={error ?? undefined} />

      <div className="flex flex-col gap-6 w-full bg-white rounded-xl shadow px-6 py-4">
        <BatchTable
          batches={batches}
          expandedBatches={expandedBatches}
          isActivating={isActivating}
          isDeactivating={isDeactivating}
          isSubmitting={isSubmitting}
          onToggleExpansion={toggleBatchExpansion}
          onEdit={setSelectedBatch}
          onAction={handleBatchAction}
        >
          {batch => (
            <AviaryTable
              batch={batch}
              aviariesData={aviariesData}
              isLoadingAviaries={isLoadingAviaries}
              onCreateAviary={() => {
                setSelectedBatch(batch);
                setSelectedAviary(null);
                setIsAviaryModalOpen(true);
              }}
              onEditAviary={aviary => {
                setSelectedBatch(batch);
                setSelectedAviary(aviary);
                setIsAviaryModalOpen(true);
              }}
              onDeleteAviary={handleAviaryDelete}
            />
          )}
        </BatchTable>

        <BatchModal
          isOpen={isModalOpen || !!selectedBatch}
          batch={selectedBatch}
          isSubmitting={isSubmitting}
          formErrors={formErrors}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBatch(null);
          }}
          onSubmit={data => handleBatchSubmit(data, !!selectedBatch)}
        />

        <AviaryModal
          isOpen={isAviaryModalOpen}
          aviary={selectedAviary}
          selectedBatch={selectedBatch}
          onClose={() => {
            setIsAviaryModalOpen(false);
            setSelectedAviary(null);
          }}
          onSubmit={handleAviarySubmit}
        />
      </div>
    </div>
  );
}

export default BatchManagement;
