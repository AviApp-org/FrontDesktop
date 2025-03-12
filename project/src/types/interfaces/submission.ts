import { AviaryData } from './aviary';

export interface DataSubmission {
  id: string;
  timestamp: string;
  aviaryId: string;
  aviaryName: string;
  data: AviaryData;
}
