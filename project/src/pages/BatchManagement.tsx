import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useBatchManagement } from '../hooks/useBatchManagement';
import { BatchTable, AviaryTable } from '../components/tables';
import { BatchModal, AviaryModal } from '../components/modals';
import Button from '../components/Button';

export function BatchManagement() {
  const {
    isModalOpen, setIsModalOpen,
    isAviaryModalOpen, setIsAviaryModalOpen,
    selectedBatch, setSelectedBatch,
    selectedAviary, setSelectedAviary,
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
    <div className="page-container bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Lotes e Aviários</h1>
            <p className="mt-2 text-sm text-gray-600">Gerencie seus lotes e aviários de forma eficiente</p>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Lote
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

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

          {(batch) => (
            <AviaryTable
              batch={batch}
              aviariesData={aviariesData}
              isLoadingAviaries={isLoadingAviaries}
              onCreateAviary={() => {
                setSelectedBatch(batch);
                setSelectedAviary(null);
                setIsAviaryModalOpen(true);
              }}
              onEditAviary={(aviary) => {
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
          onSubmit={(data) => handleBatchSubmit(data, !!selectedBatch)}
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
