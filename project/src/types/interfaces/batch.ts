export interface Batch {
  id: number;
  name: string;
  startDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  farmId: number;
} 