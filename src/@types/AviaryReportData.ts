import {CollectEggData} from './CollectEggData';
import {CollectChickenData} from './CollectChickenData';
import {EggDetailData} from './EggDetailData';
import {EggDetailPercentageData} from './EggDetailPercentageData';

export interface AviaryReportData {
  name: string;
  eggCollects: CollectEggData[];
  chickenCollect: CollectChickenData[];
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
  hatchableEggs: number;
}
