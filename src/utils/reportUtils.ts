import { DailyReportData } from '@/@types/DailyReportData';

export const formatDateForAPI = (dateString: string): string => {
  if (!dateString) return '';

  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 2) {
    return dateString;
  }

  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';

  if (dateString.includes('/')) {
    return dateString;
  }

  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 4) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  if (dateString.includes('-') && dateString.length === 10 && dateString.indexOf('-') === 2) {
    const [day, month, year] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return dateString;
};

export const generateDateRange = (startDate: string, days: number): string[] => {
  const dates: string[] = [];
  const start = new Date(startDate);

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
};


export const getProductionData = (dailyReports: DailyReportData[]) => {
  return dailyReports.map(report => ({
    date: new Date(report.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    production: report.production, // porcentagem
    totalEggs: report.totalEggsCollected, // quantidade absoluta
  }));
};

export const getMortalityData = (dailyReports: DailyReportData[]) => {
  return dailyReports.map(report => ({
    date: new Date(report.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    mortalidade: report.mortality,
    mortalidadeGalinhas: report.chickenMortality,
    mortalidadeGaloes: report.roosterMortality,
  }));
};

export const getEggDistributionData = (dailyReports: DailyReportData[]) => {
  if (!dailyReports.length) return [];
  
  const lastDay = dailyReports[dailyReports.length - 1];
  return lastDay.quantityByEggType.map(egg => ({
    name: egg.type,
    value: egg.quantity
  }));
};


export const getBirdsEvolutionData = (dailyReports: DailyReportData[]) => {
  return dailyReports.map(report => ({
    date: new Date(report.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    total: report.totalBirds,
    galinhas: report.currentChickens,
    galoes: report.currentRoosters
  }));
};

export const getEggDestinationData = (dailyReports: DailyReportData[]) => {
  return dailyReports.map(report => ({
    date: new Date(report.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    incubaveis: report.hatchableEggs,
    mercado: report.marketEggs,
    descarte: report.dumpEggs
  }));
};
