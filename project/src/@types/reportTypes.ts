// ✅ Traduções simples dos tipos de ovos
export const translateEggType = (type: string): string => {
  const translations: Record<string, string> = {
    'CLEAN': 'Ovos Limpos',
    'DOUBLE_YOLK': 'Gema Dupla',
    'CRACKED': 'Rachados',
    'THIN_SHELL': 'Casca Fina',
    'TOTAL': 'Total',
    'INCUBATABLE': 'Incubáveis',
    'MARKET': 'Mercado',
    'DIRTY_NEST': 'Sujos',
    'SMALL': 'Pequenos',
    'BROKEN': 'Quebrados',
    'DEFORMED': 'Deformados',
    'ELIMINATED': 'Eliminados'
  };
  
  return translations[type] || type;
};

// ✅ Interface simples para aviário
export interface AviaryReport {
  name: string;
  totalEggsCollected: number;
  totalDeadBirds: number;
  totalDeadChickens: number;
  totalDeadRoosters: number;
  currentChickens: number;
  currentRoosters: number;
  production: number;
  mortality: number;
  quantityByEggType: Array<{
    type: string;
    quantity: number;
  }>;
  marketEggs: number;
  dumpEggs: number;
  hatchableEggs: number;
}
