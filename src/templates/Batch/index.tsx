import React from 'react';
import { BatchHeader } from '@/components/BatchHeader';
import { BatchTable } from '@/components/BatchTable';
import { AviaryTable } from '@/components/AviaryTable';
import { BatchModal } from '@/components/BatchModal';
import { AviaryModal } from '@/components/AviaryModal';
import { BatchData } from '@/@types/BatchData';
import { AviaryData } from '@/@types/AviaryData';

interface Props {
  isModalOpen: boolean;
  isAviaryModalOpen: boolean;
  selectedBatch: BatchData | null;
  selectedAviary: AviaryData | null;
  expandedBatches: string[];
  error: string | null;
  formErrors: Record<string, string>;
  isSubmitting: boolean;
  isLoadingBatches: boolean;
  isLoadingAviaries: boolean;
  isActivating: boolean;
  isDeactivating: boolean;
  batches: BatchData[];
  aviariesData: AviaryData[];
  onNewBatch: () => void;
  onToggleExpansion: (batchId: string) => void;
  onEditBatch: (batch: BatchData) => void;
  onBatchAction: (action: 'activate' | 'deactivate', id: string) => void;
  onBatchSubmit: (data: any, isEdit: boolean) => void;
  onCloseBatchModal: () => void;
  onCreateAviary: (batch: BatchData) => void;
  onEditAviary: (batch: BatchData, aviary: AviaryData) => void;
  onAviarySubmit: (aviaryData: AviaryData) => void;
  onAviaryDelete: (id: string) => void;
  onCloseAviaryModal: () => void;
}

export const BatchManagementTemplate: React.FC<Props> = ({
  isModalOpen,
  isAviaryModalOpen,
  selectedBatch,
  selectedAviary,
  expandedBatches,
  error,
  formErrors,
  isSubmitting,
  isLoadingBatches,
  isLoadingAviaries,
  isActivating,
  isDeactivating,
  batches,
  aviariesData,
  onNewBatch,
  onToggleExpansion,
  onEditBatch,
  onBatchAction,
  onBatchSubmit,
  onCloseBatchModal,
  onCreateAviary,
  onEditAviary,
  onAviarySubmit,
  onAviaryDelete,
  onCloseAviaryModal
}) => {
  return (
    <div className="mx-auto p-4">
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
        <BatchHeader
          onNewBatch={onNewBatch}
          error={error ?? undefined}
        />

        <div className="mt-6">
          <BatchTable
            batches={batches}
            expandedBatches={expandedBatches}
            isActivating={isActivating}
            isDeactivating={isDeactivating}
            isSubmitting={isSubmitting}
            onToggleExpansion={onToggleExpansion}
            onEdit={onEditBatch}
            onAction={onBatchAction}
          >
            {(batch) => (
              <AviaryTable
                batch={batch}
                aviariesData={aviariesData}
                isLoadingAviaries={isLoadingAviaries}
                onCreateAviary={() => onCreateAviary(batch)}
                onEditAviary={(aviary) => onEditAviary(batch, aviary)}
                onDeleteAviary={onAviaryDelete}
              />
            )}
          </BatchTable>

          <BatchModal
            isOpen={isModalOpen}
            batch={selectedBatch}
            isSubmitting={isSubmitting}
            formErrors={formErrors}
            onClose={onCloseBatchModal}
            onSubmit={(data) => onBatchSubmit(data, !!selectedBatch)}
          />

          <AviaryModal
            isOpen={isAviaryModalOpen}
            aviary={selectedAviary}
            selectedBatch={selectedBatch}
            onClose={onCloseAviaryModal}
            onSubmit={onAviarySubmit}
          />
        </div>
      </div>
    </div>
  );
};