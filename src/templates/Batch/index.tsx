import React from 'react';
import { Box } from '@mui/material';
import { BatchHeader } from '@/components/BatchHeader';
import { BatchTable } from '@/components/BatchTable';
import { AviaryTable } from '@/components/AviaryTable';
import { BatchModal } from '@/components/BatchModal';
import { AviaryModal } from '@/components/AviaryModal';
import { BatchData } from '@/@types/BatchData';
import { AviaryData } from '@/@types/AviaryData';
import { CreateAviaryData } from '@/@types/CreateAviaryData';

interface Props {
  // Estados
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

  // Dados
  batches: BatchData[];
  aviariesData: AviaryData[];

  // Callbacks
  onNewBatch: () => void;
  onToggleExpansion: (batchId: string) => void;
  onEditBatch: (batch: BatchData) => void;
  onBatchAction: (action: 'activate' | 'deactivate', id: string) => void;
  onBatchSubmit: (data: any, isEdit: boolean) => void;
  onCloseBatchModal: () => void;
  onCreateAviary: (batch: BatchData) => void;
  onEditAviary: (batch: BatchData, aviary: AviaryData) => void;
  onAviarySubmit: (aviaryData: CreateAviaryData) => void;
  onAviaryDelete: (id: string) => void;
  onCloseAviaryModal: () => void;
}

export const BatchManagementTemplate: React.FC<Props> = ({
  // Estados
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

  // Dados
  batches,
  aviariesData,

  // Callbacks
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
    <Box>
      <BatchHeader 
        onNewBatch={onNewBatch} 
        error={error ?? undefined} 
      />

      <Box sx={{ mt: 3 }}>
        <div className="flex flex-col gap-6 w-full bg-white rounded-xl shadow px-6 py-4">
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
            {batch => (
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
      </Box>
    </Box>
  );
}; 