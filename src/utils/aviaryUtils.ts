import { AviaryReport } from '../@types/reportTypes';

// Função para normalizar dados do aviário
export const normalizeAviaryData = (aviary: AviaryReport): AviaryReport => {
  console.log('🔧 Normalizando dados do aviário:', {
    aviaryId: aviary.aviaryId,
    id: aviary.id,
    originalName: aviary.aviaryName || aviary.name,
    eggCollections: aviary.eggCollections?.length,
    deathRecords: aviary.deathRecords?.length,
    fullObject: aviary
  });

  // ✅ Usar id como fallback se aviaryId não existir, manter o tipo original
  const aviaryId = aviary.aviaryId || aviary.id || `temp_${Math.random()}`;
  const aviaryName = aviary.aviaryName || aviary.name || `Aviário ${aviaryId}`;

  const normalized: AviaryReport = {
    ...aviary,
    // ✅ Garantir que temos um ID válido (manter como string/number)
    aviaryId: aviaryId,
    
    // Garantir que temos um nome
    aviaryName: aviaryName,
    
    // Garantir que arrays existem e são arrays válidos
    eggCollections: Array.isArray(aviary.eggCollections) ? aviary.eggCollections : [],
    deathRecords: Array.isArray(aviary.deathRecords) ? aviary.deathRecords : [],
    
    // Garantir valores numéricos
    totalEggsCollected: Number(aviary.totalEggsCollected) || 0,
    totalDeadBirds: Number(aviary.totalDeadBirds) || 0,
    totalDeadChickens: Number(aviary.totalDeadChickens) || 0,
    totalDeadRoosters: Number(aviary.totalDeadRoosters) || 0,
    currentChickens: Number(aviary.currentChickens) || 0,
    currentRoosters: Number(aviary.currentRoosters) || 0,
    production: Number(aviary.production) || 0,
    mortality: Number(aviary.mortality) || 0,
    // ✅ Removendo as linhas duplicadas que causavam erro
    roosterMortality: Number(aviary.roosterMortality) || 0,
    chickenMortality: Number(aviary.chickenMortality) || 0,
  };

  console.log('✅ Dados normalizados:', {
    aviaryId: normalized.aviaryId,
    name: normalized.aviaryName,
    eggCollections: normalized.eggCollections.length,
    deathRecords: normalized.deathRecords.length,
    hasDetailedData: normalized.eggCollections.length > 0 || normalized.deathRecords.length > 0
  });

  return normalized;
};

// ✅ Função para validar se o aviário tem dados válidos - MAIS FLEXÍVEL
export const isValidAviaryData = (aviary: AviaryReport): boolean => {
  // Aceitar se tem pelo menos um nome OU dados numéricos válidos
  const hasIdentification = !!(aviary.aviaryName || aviary.name);
  const hasNumericData = typeof aviary.totalEggsCollected === 'number' || typeof aviary.totalDeadBirds === 'number';
  
  const isValid = hasIdentification || hasNumericData;

  if (!isValid) {
    console.warn('⚠️ Aviário rejeitado - sem identificação nem dados:', {
      aviaryId: aviary.aviaryId,
      id: aviary.id,
      name: aviary.aviaryName || aviary.name,
      hasIdentification,
      hasNumericData,
      fullObject: aviary
    });
  } else {
    console.log('✅ Aviário aceito:', {
      aviaryId: aviary.aviaryId,
      name: aviary.aviaryName || aviary.name,
      hasIdentification,
      hasNumericData
    });
  }

  return isValid;
};

// Função para obter estatísticas do aviário
export const getAviaryStats = (aviary: AviaryReport) => {
  const totalBirds = aviary.currentChickens + aviary.currentRoosters;
  const totalCollections = aviary.eggCollections?.length || 0;
  const totalDeathRecords = aviary.deathRecords?.length || 0;
  const totalEggsInCollections = aviary.eggCollections?.reduce(
    (sum, collection) => sum + (collection.eggDetails?.reduce(
      (eggSum, egg) => eggSum + (egg.quantity || 0), 0
    ) || 0), 0
  ) || 0;

  const stats = {
    totalBirds,
    totalCollections,
    totalDeathRecords,
    totalEggsInCollections,
    hasDetailedData: totalCollections > 0 || totalDeathRecords > 0,
    chickenPercentage: totalBirds > 0 ? (aviary.currentChickens / totalBirds * 100) : 0,
    roosterPercentage: totalBirds > 0 ? (aviary.currentRoosters / totalBirds * 100) : 0,
  };

  console.log('📊 Estatísticas do aviário:', {
    aviaryId: aviary.aviaryId,
    name: aviary.aviaryName || aviary.name,
    ...stats
  });

  return stats;
};

// ✅ Função para obter ID do aviário de forma flexível
export const getAviaryId = (aviary: AviaryReport): string | number => {
  return aviary.aviaryId || aviary.id || 'unknown';
};

// ✅ Função para obter nome do aviário de forma flexível
export const getAviaryName = (aviary: AviaryReport): string => {
  return aviary.aviaryName || aviary.name || `Aviário ${getAviaryId(aviary)}`;
};

// ✅ Função para formatar horário
export const formatTime = (timeString: string): string => {
  if (!timeString) return 'Horário não informado';
  
  // Se já está no formato HH:MM, retorna como está
  if (timeString.includes(':')) {
    return timeString;
  }
  
  // Se está em outro formato, tenta converter
  try {
    const date = new Date(timeString);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  } catch {
    return timeString;
  }
};
