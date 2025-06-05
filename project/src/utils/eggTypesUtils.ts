import { translateEggType } from '../@types/reportTypes';

// ✅ Tipos de ovos padrão que sempre devem aparecer na tabela
export const DEFAULT_EGG_TYPES = [
  'TOTAL',
  'CLEAN', 
  'MARKET',
  'CRACKED',
  'DIRTY_NEST',
  'SMALL',
  'BROKEN',
  'DEFORMED',
  'THIN_SHELL',
  'ELIMINATED'
];

// ✅ Função para criar tabela completa de ovos com zeros para tipos não coletados
export const createCompleteEggTable = (eggCollections: any[] = []) => {
  // Somar todos os ovos coletados por tipo
  const eggTotals: Record<string, number> = {};
  
  // Inicializar todos os tipos com 0
  DEFAULT_EGG_TYPES.forEach(type => {
    eggTotals[type] = 0;
  });
  
  // Somar os ovos coletados
  eggCollections.forEach(collection => {
    if (collection.eggDetails && Array.isArray(collection.eggDetails)) {
      collection.eggDetails.forEach((egg: any) => {
        if (egg.type && typeof egg.quantity === 'number') {
          eggTotals[egg.type] = (eggTotals[egg.type] || 0) + egg.quantity;
        }
      });
    }
  });
  
  // Retornar array ordenado
  return DEFAULT_EGG_TYPES.map(type => ({
    type,
    translatedType: translateEggType(type),
    quantity: eggTotals[type] || 0
  }));
};
