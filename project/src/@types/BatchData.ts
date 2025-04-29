import { AviaryData } from './AviaryData';

export interface BatchData {
  id: string;
  name: string;
  startDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  farmId: string;
  aviaries?: AviaryData[];
}