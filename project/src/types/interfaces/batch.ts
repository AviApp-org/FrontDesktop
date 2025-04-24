import { AviaryData } from '../../@types/AviaryData';

export interface Batch {
  id: string;
  name: string;
  startDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  farmId: string;
  aviaries?: AviaryData[];
} 