import { AviaryData } from './AviaryData';

export interface DataSubmission {
  id: string;
  timestamp: string;
  aviaryId: string;
  aviaryName: string;
  data: AviaryData;
}
