import React, { useState } from 'react';
import { usePostBatchData, useUpdateBatchData, useActivateBatchData, useDeactivateBatchData } from '../hooks/useBatch';
import { Batch } from '../types/interfaces/batch';
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

// Mock temporário para listar lotes até que o backend tenha um endpoint para isso
const mockBatches: Batch[] = [
  {
    id: 1,
    name: 'Lote 001',
    status: 'ACTIVE',
    farmId: 1,
    startDate: '2023-04-01',
  },
  {
    id: 2,
    name: 'Lote 002',
    status: 'ACTIVE',
    farmId: 1,
    startDate: '2023-04-15',
  },
  {
    id: 3,
    name: 'Lote 003',
    status: 'COMPLETED',
    farmId: 1,
    startDate: '2023-03-01',
  },
];

// Função para traduzir o status para português
const translateStatus = (status: string): string => {
  switch (status) {
    case 'ACTIVE':
      return 'Ativo';
    case 'COMPLETED':
      return 'Concluído';
    case 'CANCELLED':
      return 'Cancelado';
    default:
      return status;
  }
};

export function BatchManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createBatch, isPending: isCreating } = usePostBatchData();
  const { mutate: updateBatch, isPending: isUpdating } = useUpdateBatchData();
  const { mutate: activateBatch, isPending: isActivating } = useActivateBatchData();
  const { mutate: deactivateBatch, isPending: isDeactivating } = useDeactivateBatchData();

  const validateBatchData = (data: Omit<Batch, 'id'>): boolean => {
    const errors: Record<string, string> = {};
    
    if (!data.name || data.name.trim() === '') {
      errors.name = 'Nome do lote é obrigatório';
    }
    
    if (!data.startDate) {
      errors.startDate = 'Data de início é obrigatória';
    }
    
    if (!data.farmId) {
      errors.farmId = 'ID da fazenda é obrigatório';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateBatch = (newBatch: Omit<Batch, 'id'>) => {
    setError(null);
    setFormErrors({});
    setIsSubmitting(true);
    
    if (!validateBatchData(newBatch)) {
      setIsSubmitting(false);
      return;
    }
    
    // Garantir que apenas os campos necessários sejam enviados
    const batchData = {
      name: newBatch.name,
      startDate: newBatch.startDate,
      status: newBatch.status || 'ACTIVE',
      farmId: newBatch.farmId
    };
    
    createBatch(batchData, {
      onSuccess: (createdBatch) => {
        setBatches([...batches, createdBatch]);
        setIsModalOpen(false);
        setIsSubmitting(false);
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao criar lote';
        setError('Erro ao criar lote: ' + errorMessage);
        setIsSubmitting(false);
      },
    });
  };

  const handleActivateBatch = (id: number) => {
    setError(null);
    activateBatch(id, {
      onSuccess: () => {
        setBatches(batches.map(batch => 
          batch.id === id ? { ...batch, status: 'ACTIVE' as const } : batch
        ));
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao ativar lote';
        setError('Erro ao ativar lote: ' + errorMessage);
      },
    });
  };

  const handleDeactivateBatch = (id: number) => {
    setError(null);
    deactivateBatch(id, {
      onSuccess: () => {
        setBatches(batches.map(batch => 
          batch.id === id ? { ...batch, status: 'CANCELLED' as const } : batch
        ));
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao desativar lote';
        setError('Erro ao desativar lote: ' + errorMessage);
      },
    });
  };

  const handleUpdateBatch = (id: number, updatedData: Partial<Omit<Batch, 'id'>>) => {
    setError(null);
    setFormErrors({});
    setIsSubmitting(true);
    
    // Validar apenas os campos que estão sendo atualizados
    const errors: Record<string, string> = {};
    
    if (updatedData.name !== undefined && (!updatedData.name || updatedData.name.trim() === '')) {
      errors.name = 'Nome do lote é obrigatório';
    }
    
    if (updatedData.startDate !== undefined && !updatedData.startDate) {
      errors.startDate = 'Data de início é obrigatória';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }
    
    updateBatch({ id, data: updatedData }, {
      onSuccess: (updatedBatch) => {
        setBatches(batches.map(batch => 
          batch.id === id ? updatedBatch : batch
        ));
        setSelectedBatch(null);
        setIsSubmitting(false);
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao atualizar lote';
        setError('Erro ao atualizar lote: ' + errorMessage);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title">Gerenciamento de Lotes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center"
          disabled={isCreating || isSubmitting}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isCreating || isSubmitting ? 'Criando...' : 'Novo Lote'}
        </button>
      </div>

      {error && (
        <div className="bg-danger/10 text-danger p-4 rounded-lg mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Lista de Lotes</h2>
        </div>

        <div className="table-container">
          <table className="table-default">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data de Início</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id}>
                  <td>{batch.name}</td>
                  <td>{formatDate(batch.startDate)}</td>
                  <td>{translateStatus(batch.status)}</td>
                  <td>
                    <button
                      className="btn-icon"
                      onClick={() => setSelectedBatch(batch)}
                      disabled={isActivating || isDeactivating || isSubmitting}
                    >
                      Editar
                    </button>
                    {batch.status === 'ACTIVE' ? (
                      <button
                        className="btn-icon"
                        onClick={() => handleDeactivateBatch(batch.id)}
                        disabled={isDeactivating || isSubmitting}
                      >
                        Desativar
                      </button>
                    ) : (
                      <button
                        className="btn-icon"
                        onClick={() => handleActivateBatch(batch.id)}
                        disabled={isActivating || isSubmitting}
                      >
                        Ativar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Novo Lote</h3>
              <button onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const batchData = {
                  farmId: 1, // Temporário, deve vir do contexto de autenticação
                  name: formData.get('name') as string,
                  startDate: formData.get('startDate') as string,
                  status: (formData.get('status') as Batch['status']) || 'ACTIVE',
                };

                handleCreateBatch(batchData);
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
                      className={`input-default ${formErrors.name ? 'input-error' : ''}`}
                      placeholder="Ex: LOTE001"
                      required
                      disabled={isSubmitting}
                    />
                    {formErrors.name && (
                      <span className="text-danger text-sm">{formErrors.name}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="startDate" className="input-label">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      className={`input-default ${formErrors.startDate ? 'input-error' : ''}`}
                      required
                      disabled={isSubmitting}
                    />
                    {formErrors.startDate && (
                      <span className="text-danger text-sm">{formErrors.startDate}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="status" className="input-label">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="input-default"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="ACTIVE">Ativo</option>
                      <option value="COMPLETED">Concluído</option>
                      <option value="CANCELLED">Cancelado</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn-secondary"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isCreating || isActivating || isDeactivating || isSubmitting}
                    >
                      {isSubmitting ? 'Criando...' : 'Criar Lote'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedBatch && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Editar Lote</h3>
              <button onClick={() => setSelectedBatch(null)} disabled={isSubmitting}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const batchData = {
                  name: formData.get('name') as string,
                  startDate: formData.get('startDate') as string,
                  status: formData.get('status') as Batch['status'],
                };

                handleUpdateBatch(selectedBatch.id, batchData);
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
                      defaultValue={selectedBatch.name}
                      className={`input-default ${formErrors.name ? 'input-error' : ''}`}
                      placeholder="Ex: LOTE001"
                      required
                      disabled={isSubmitting}
                    />
                    {formErrors.name && (
                      <span className="text-danger text-sm">{formErrors.name}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="startDate" className="input-label">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      defaultValue={selectedBatch.startDate}
                      className={`input-default ${formErrors.startDate ? 'input-error' : ''}`}
                      required
                      disabled={isSubmitting}
                    />
                    {formErrors.startDate && (
                      <span className="text-danger text-sm">{formErrors.startDate}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="status" className="input-label">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={selectedBatch.status}
                      className="input-default"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="ACTIVE">Ativo</option>
                      <option value="COMPLETED">Concluído</option>
                      <option value="CANCELLED">Cancelado</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setSelectedBatch(null)}
                      className="btn-secondary"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isUpdating || isSubmitting}
                    >
                      {isSubmitting ? 'Salvando...' : 'Salvar Lote'}
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
