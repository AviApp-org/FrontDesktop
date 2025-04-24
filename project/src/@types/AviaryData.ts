export interface AviaryData {
  id: string;
  name: string;
  initialAmountOfRoosters: number;
  initialAmountOfChickens: number;
  batchId: string;
  waterQuantity: number;
  temperature: {
    max: number;
    min: number;
  };
  liveBirds: {
    male: number;
    female: number;
  };
  eggs: {
    total: number;
    cracked: number;
    dirtyNest: number;
    small: number;
    incubatable: number;
    broken: number;
    deformed: number;
    thinShell: number;
    eliminated: number;
    market: number;
  };
}

export interface AvailableAviary {
  id: string;
  name: string;
}

export interface DataSubmission {
  id: string;
  timestamp: string;
  aviaryId: string;
  aviaryName: string;
  data: AviaryData;
}