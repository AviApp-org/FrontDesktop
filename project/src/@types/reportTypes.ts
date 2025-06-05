// Tipos base
export interface EggDetail {
  type: string;
  quantity: number;
}

export interface EggCollection {
  collectionTime: string;
  eggDetails: EggDetail[];
}

export interface DeathRecord {
  recordTime: string;
  deadChickens: number;
  deadRoosters: number;
  cause?: string;
  location?: string;
  observations?: string; // ✅ Campo para observações
}

export interface AviaryReport {
  // ✅ Permitir aviaryId como string ou number
  aviaryId?: string | number;
  id?: string | number;
  aviaryName?: string;
  name?: string;
  
  // Dados numéricos
  totalEggsCollected: number;
  totalDeadBirds: number;
  totalDeadChickens: number;
  totalDeadRoosters: number;
  currentChickens: number;
  currentRoosters: number;
  production: number;
  mortality: number;
  roosterMortality?: number;
  chickenMortality?: number;
  
  // Arrays de detalhes
  eggCollections?: EggCollection[];
  deathRecords?: DeathRecord[];
  
  // Dados ambientais opcionais
  waterQuantity?: number;
  temperature?: {
    min: number;
    max: number;
  };
}

export interface EggTypeData {
  type: string;
  percentage: number;
}

export interface ReportData {
  date: string;
  aviaryReports: AviaryReport[];
  totalEggsCollected: number;
  totalDeadBirds: number;
  totalDeadChickens: number;
  totalDeadRoosters: number;
  currentChickens: number;
  currentRoosters: number;
  totalBirds: number;
  production: number;
  roosterMortality: number;
  chickenMortality: number;
  mortality: number;
  chickenRoosterProportion: number;
  percentageByEggType?: EggTypeData[];
  marketEggs?: number;
  dumpEggs?: number;
  incubateEggs?: number;
}

export interface SummaryData {
  period: string;
  totalDays: number;
  avgEggsPerDay: number;
  avgDeathsPerDay: number;
  avgProduction: number;
  avgMortality: number;
  avgChickens: number;
  avgRoosters: number;
  totalEggs: number;
  totalDeaths: number;
  eggTypesAverage: EggTypeData[];
}

export type ReportType = 'Diário' | 'Semanal' | 'Mensal';

// ✅ Função para traduzir tipos de ovos em português
export const translateEggType = (type: string): string => {
  const translations: Record<string, string> = {
    'TOTAL': 'Total',
    'CRACKED': 'Trincados',
    'DIRTY_NEST': 'Sujos do Ninho',
    'SMALL': 'Pequenos',
    'CLEAN': 'Incubáveis',
    'BROKEN': 'Quebrados',
    'DEFORMED': 'Deformados',
    'THIN_SHELL': 'Casca Fina',
    'ELIMINATED': 'Eliminados',
    'MARKET': 'Mercado'
  };
  
  return translations[type] || type;
};
