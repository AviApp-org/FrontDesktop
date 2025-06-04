import { AviaryData } from './AviaryData';
import { BatchStatus } from './enums/enumBatchStatus';
export interface BatchData {
  id: number;
  name: string;
  startDate: string;
  status: BatchStatus;
  farmId: number;
  aviaries?: AviaryData[];
}