import React, { useState } from 'react';
import { useBatchData, usePostBatchData, useUpdateBatchData, useDeleteBatchData } from '../hooks/useBatch';
import { Batch } from '../types/interfaces/batch';
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react';

export function BatchManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: batches, isLoading, error: fetchError } = useBatchData();
  const createBatch = usePostBatchData();
  const updateBatch = useUpdateBatchData();
  const deleteBatch = useDeleteBatchData();

  const handleCreateBatch = async (newBatch: Omit<Batch, 'id'>) => {
    try {
      await createBatch.mutateAsync(newBatch);
      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      setError('Erro ao criar lote. Por favor, tente novamente.');
    }
  };

  const handleUpdateBatch = async (updatedBatch: Batch) => {
    try {
      await updateBatch.mutateAsync(updatedBatch);
      setSelectedBatch(null);
      setError(null);
    } catch (err) {
      setError('Erro ao atualizar lote. Por favor, tente novamente.');
    }
  };

  const handleDeleteBatch = async (batchId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este lote?')) {
      try {
        await deleteBatch.mutateAsync(batchId);
        setError(null);
      } catch (err) {
        setError('Erro ao excluir lote. Por favor, tente novamente.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center h-64 text-danger">
          <AlertCircle className="w-6 h-6 mr-2" />
          <span>Erro ao carregar lotes. Por favor, tente novamente mais tarde.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title">Gerenciamento de Lotes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Lote
        </button>
      </div>

      {error && (
        <div className="bg-danger/10 text-danger p-4 rounded-lg mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches?.map((batch) => (
          <div key={batch.id} className="card">
            <div className="card-header">
              <h3 className="card-title">Lote {batch.id}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedBatch(batch)}
                  className="btn-icon text-info hover:bg-info/10"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteBatch(batch.id)}
                  className="btn-icon text-danger hover:bg-danger/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Data de Entrada</p>
                  <p className="font-medium">{new Date(batch.entryDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantidade</p>
                  <p className="font-medium">{batch.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Aviário</p>
                  <p className="font-medium">{batch.aviary}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">{batch.status}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para criar/editar lote */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="text-xl font-semibold">
                {selectedBatch ? 'Editar Lote' : 'Novo Lote'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedBatch(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const batchData = {
                  farmId: 1, // Temporário, deve vir do contexto de autenticação
                  name: formData.get('name') as string,
                  entryDate: formData.get('entryDate') as string,
                  quantity: Number(formData.get('quantity')),
                  aviary: formData.get('aviary') as string,
                  status: (formData.get('status') as Batch['status']) || 'ACTIVE',
                  startDate: formData.get('startDate') as string,
                };

                if (selectedBatch) {
                  handleUpdateBatch({ ...batchData, id: selectedBatch.id });
                } else {
                  handleCreateBatch(batchData);
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="input-label">
                      Nome do Lote
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={selectedBatch?.name}
                      className="input-default"
                      placeholder="Ex: LOTE001"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="entryDate" className="input-label">
                      Data de Entrada
                    </label>
                    <input
                      type="date"
                      id="entryDate"
                      name="entryDate"
                      defaultValue={selectedBatch?.entryDate}
                      className="input-default"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="quantity" className="input-label">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      defaultValue={selectedBatch?.quantity}
                      className="input-default"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="aviary" className="input-label">
                      Aviário
                    </label>
                    <input
                      type="text"
                      id="aviary"
                      name="aviary"
                      defaultValue={selectedBatch?.aviary}
                      className="input-default"
                      placeholder="Ex: AVIÁRIO 1"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="input-label">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={selectedBatch?.status || 'ACTIVE'}
                      className="input-default"
                      required
                    >
                      <option value="ACTIVE">Ativo</option>
                      <option value="COMPLETED">Concluído</option>
                      <option value="CANCELLED">Cancelado</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="startDate" className="input-label">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      defaultValue={selectedBatch?.startDate}
                      className="input-default"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedBatch(null);
                      }}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={createBatch.isPending || updateBatch.isPending}
                    >
                      {selectedBatch ? 'Salvar' : 'Criar'} Lote
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
