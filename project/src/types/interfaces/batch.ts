export interface Bird {
  male: number;
  female: number;
}

export interface Aviary {
  id: string;
  name: string;
  initialBirds: Bird;
  currentBirds: Bird;
  isActive: boolean;
}

export interface Batch {
  id: string;
  code: string;
  startDate: string;
  aviaries: Aviary[];
  isActive: boolean;
} 