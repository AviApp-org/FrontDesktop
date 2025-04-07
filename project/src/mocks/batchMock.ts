import { Batch } from '../types/interfaces/batch';

// Dados mockados para testes
export const mockBatches: Batch[] = [
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

// Funções para simular operações CRUD
export const mockBatchService = {
  getAll: async (): Promise<Batch[]> => {
    console.log('Mock: Buscando todos os lotes');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBatches);
      }, 500);
    });
  },

  create: async (batch: Omit<Batch, 'id'>): Promise<Batch> => {
    console.log('Mock: Criando novo lote', batch);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBatch: Batch = {
          ...batch,
          id: mockBatches.length + 1,
        };
        mockBatches.push(newBatch);
        resolve(newBatch);
      }, 500);
    });
  },

  update: async (id: number, batch: Partial<Batch>): Promise<Batch> => {
    console.log('Mock: Atualizando lote', id, batch);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockBatches.findIndex((b) => b.id === id);
        if (index === -1) {
          reject(new Error('Lote não encontrado'));
          return;
        }
        mockBatches[index] = { ...mockBatches[index], ...batch };
        resolve(mockBatches[index]);
      }, 500);
    });
  },

  delete: async (id: number): Promise<void> => {
    console.log('Mock: Deletando lote', id);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockBatches.findIndex((b) => b.id === id);
        if (index === -1) {
          reject(new Error('Lote não encontrado'));
          return;
        }
        mockBatches.splice(index, 1);
        resolve();
      }, 500);
    });
  },
}; 