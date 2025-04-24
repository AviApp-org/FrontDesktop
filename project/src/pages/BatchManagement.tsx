import React, { useState } from 'react';
import { usePostBatchData, useUpdateBatchData, useActivateBatchData, useDeactivateBatchData } from '../hooks/useBatch';
import { useAviaries, useCreateAviary, useUpdateAviary, useDeleteAviary } from '../hooks/useAviary';
import { Batch } from '../types/interfaces/batch';
import { AviaryData } from '../@types/AviaryData';
import { Plus, Edit, Trash2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

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
  const [isAviaryModalOpen, setIsAviaryModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [selectedAviary, setSelectedAviary] = useState<AviaryData | null>(null);
  const [expandedBatches, setExpandedBatches] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createBatch, isPending: isCreating } = usePostBatchData();
  const { mutate: updateBatch, isPending: isUpdating } = useUpdateBatchData();
  const { mutate: activateBatch, isPending: isActivating } = useActivateBatchData();
  const { mutate: deactivateBatch, isPending: isDeactivating } = useDeactivateBatchData();
  const { mutate: createAviary } = useCreateAviary();
  const { mutate: updateAviary } = useUpdateAviary();
  const { mutate: deleteAviary } = useDeleteAviary();

  // Buscar aviários quando um lote é expandido
  const { data: aviariesData, isLoading: isLoadingAviaries } = useAviaries(
    expandedBatches.length > 0 ? expandedBatches[expandedBatches.length - 1] : '0'
  );

  const toggleBatchExpansion = (batchId: string) => {
    setExpandedBatches(prev =>
      prev.includes(batchId)
        ? prev.filter(id => id !== batchId)
        : [batchId] // Mantém apenas o lote atual expandido
    );
  };

  const handleCreateAviary = (newAviary: Omit<AviaryData, 'id'>) => {
    if (!selectedBatch) return;

    createAviary(newAviary, {
      onSuccess: () => {
        setIsAviaryModalOpen(false);
        setSelectedAviary(null);
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao criar aviário';
        setError('Erro ao criar aviário: ' + errorMessage);
      },
    });
  };

  const handleUpdateAviary = (id: string, updatedData: Partial<AviaryData>) => {
    updateAviary({ id, data: updatedData }, {
      onSuccess: () => {
        setIsAviaryModalOpen(false);
        setSelectedAviary(null);
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao atualizar aviário';
        setError('Erro ao atualizar aviário: ' + errorMessage);
      },
    });
  };

  const handleDeleteAviary = (id: string) => {
    deleteAviary(id, {
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao deletar aviário';
        setError('Erro ao deletar aviário: ' + errorMessage);
      },
    });
  };

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
      farmId: "1"
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

  const handleActivateBatch = (id: string) => {
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

  const handleDeactivateBatch = (id: string) => {
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

  const handleUpdateBatch = (id: string, updatedData: Partial<Omit<Batch, 'id'>>) => {
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
    <div className="page-container bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Lotes e Aviários</h1>
            <p className="mt-2 text-sm text-gray-600">Gerencie seus lotes e aviários de forma eficiente</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
            disabled={isCreating || isSubmitting}
          >
            <Plus className="w-5 h-5 mr-2" />
            {isCreating || isSubmitting ? 'Criando...' : 'Novo Lote'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Lista de Lotes e Aviários</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Início
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {batches.map((batch) => (
                  <React.Fragment key={batch.id}>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleBatchExpansion(batch.id as string)}
                            className="mr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            {expandedBatches.includes(batch.id as string) ? (
                              <ChevronDown className="w-5 h-5" />
                            ) : (
                              <ChevronUp className="w-5 h-5" />
                            )}
                          </button>
                          <span className="text-sm font-medium text-gray-900">{batch.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(batch.startDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          batch.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800'
                            : batch.status === 'COMPLETED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {translateStatus(batch.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setSelectedBatch(batch)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                            disabled={isActivating || isDeactivating || isSubmitting}
                          >
                            Editar
                          </button>
                          {batch.status === 'ACTIVE' ? (
                            <button
                              onClick={() => handleDeactivateBatch(batch.id as string)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                              disabled={isDeactivating || isSubmitting}
                            >
                              Desativar
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivateBatch(batch.id as string)}
                              className="text-green-600 hover:text-green-900 transition-colors duration-200"
                              disabled={isActivating || isSubmitting}
                            >
                              Ativar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedBatches.includes(batch.id as string) && (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 bg-gray-50">
                          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                              <h3 className="text-lg font-semibold text-gray-800">Aviários do Lote</h3>
                              <button
                                onClick={() => {
                                  setSelectedBatch(batch);
                                  setSelectedAviary(null);
                                  setIsAviaryModalOpen(true);
                                }}
                                className="btn-primary flex items-center px-3 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Novo Aviário
                              </button>
                            </div>
                            {isLoadingAviaries ? (
                              <div className="p-4 text-center text-gray-500">
                                Carregando aviários...
                              </div>
                            ) : aviariesData && aviariesData.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nome
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Galos Iniciais
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Galinhas Iniciais
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ações
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {aviariesData.map((aviary: AviaryData) => (
                                      <tr key={aviary.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {aviary.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {aviary.initialAmountOfRoosters}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {aviary.initialAmountOfChickens}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                          <div className="flex justify-end space-x-2">
                                            <button
                                              onClick={() => {
                                                setSelectedAviary(aviary);
                                                setIsAviaryModalOpen(true);
                                              }}
                                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                            >
                                              Editar
                                            </button>
                                            <button
                                              onClick={() => handleDeleteAviary(aviary.id as string)}
                                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                            >
                                              Excluir
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="p-4 text-center text-gray-500">
                                Nenhum aviário encontrado para este lote.
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Lote */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Novo Lote</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const batchData = {
                  farmId: "1",
                  name: formData.get('name') as string,
                  startDate: formData.get('startDate') as string,
                  status: (formData.get('status') as Batch['status']) || 'ACTIVE',
                };

                handleCreateBatch(batchData);
              }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Lote
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ex: LOTE001"
                      required
                      disabled={isSubmitting}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                      disabled={isSubmitting}
                    />
                    {formErrors.startDate && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
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

      {/* Modal de Aviário */}
      {isAviaryModalOpen && selectedBatch && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedAviary ? 'Editar Aviário' : 'Novo Aviário'}
              </h3>
              <button
                onClick={() => {
                  setIsAviaryModalOpen(false);
                  setSelectedAviary(null);
                }}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const aviaryData = {
                  name: formData.get('name') as string,
                  initialAmountOfRoosters: Number(formData.get('initialAmountOfRoosters')),
                  initialAmountOfChickens: Number(formData.get('initialAmountOfChickens')),
                  batchId: selectedBatch.id as string,
                  waterQuantity: 0,
                  temperature: {
                    max: 0,
                    min: 0
                  },
                  liveBirds: {
                    male: 0,
                    female: 0
                  },
                  eggs: {
                    total: 0,
                    cracked: 0,
                    dirtyNest: 0,
                    small: 0,
                    incubatable: 0,
                    broken: 0,
                    deformed: 0,
                    thinShell: 0,
                    eliminated: 0,
                    market: 0
                  }
                };

                if (selectedAviary) {
                  handleUpdateAviary(selectedAviary.id as string, aviaryData);
                } else {
                  handleCreateAviary(aviaryData);
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Aviário
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={selectedAviary?.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="initialAmountOfRoosters" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantidade Inicial de Galos
                    </label>
                    <input
                      type="number"
                      id="initialAmountOfRoosters"
                      name="initialAmountOfRoosters"
                      defaultValue={selectedAviary?.initialAmountOfRoosters}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="initialAmountOfChickens" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantidade Inicial de Galinhas
                    </label>
                    <input
                      type="number"
                      id="initialAmountOfChickens"
                      name="initialAmountOfChickens"
                      defaultValue={selectedAviary?.initialAmountOfChickens}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                      min="0"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAviaryModalOpen(false);
                        setSelectedAviary(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      {selectedAviary ? 'Salvar' : 'Criar'}
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
