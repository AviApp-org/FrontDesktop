// Mapeamento de traduções para tipos de ovos
export const EGG_TYPE_TRANSLATIONS: { [key: string]: string } = {
  'CRACKED': 'Trincado',
  'DOUBLE_YOLK': 'Duas Gemas',
  'DIRTY_NEST': 'Sujo de Ninho',
  'SMALL': 'Pequeno',
  'INCUBATABLE': 'Incubável',
  'BROKEN': 'Quebrado',
  'DEFORMED': 'Deformado',
  'THIN_SHELL': 'Casca Fina',
  'MARKET': 'Mercado',
  'ELIMINATED': 'Eliminado',
  'TOTAL': 'Total'
};

// Função para traduzir tipo de ovo
export const translateEggType = (type: string): string => {
  return EGG_TYPE_TRANSLATIONS[type.toUpperCase()] || type;
};

// Tipos para os dados da API
export interface EggDetail {
  type: string;
  quantity: number;
}

export interface AviaryReport {
  aviaryId: number;
  aviaryName: string;
  totalEggsCollected: number;
  totalDeadBirds: number;
  totalDeadChickens: number;
  totalDeadRoosters: number;
  currentChickens: number;
  currentRoosters: number;
  production: number;
  mortality: number;
  eggCollections: Array<{
    collectionTime: string;
    eggDetails: EggDetail[];
  }>;
  deathRecords: Array<{
    recordTime: string;
    deadChickens: number;
    deadRoosters: number;
    observations?: string;
  }>;
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
  mortality: number;
  quantityByEggType: EggDetail[];
  percentageByEggType: Array<{ type: string; percentage: number }>;
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
  eggTypesAverage: Array<{ type: string; percentage: number }>;
}

export type ReportType = 'Diário' | 'Semanal' | 'Mensal';
