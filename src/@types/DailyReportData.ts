import { AviaryReportData } from './AviaryReportData';
import { EggDetailData } from './EggDetailData';
import { EggDetailPercentageData } from './EggDetailPercentageData';

export interface DailyReportData {
  date: string; 
  aviaryReports: AviaryReportData[];
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
  quantityByEggType: EggDetailData[];
  percentageByEggType: EggDetailPercentageData[];
  marketEggs: number;
  dumpEggs: number;
  incubateEggs: number;
}
