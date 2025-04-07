export interface Batch {
  id: number;
  entryDate: string;
  quantity: number;
  aviary: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  farmId: number;
  name: string;
  startDate: string;
} 