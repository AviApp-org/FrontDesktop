import { EggDetailData } from './EggDetailData';

export interface CollectEggData {
  id: number;
  aviaryId: number;
  eggDetails: EggDetailData[];
  collectionDate: string;
  marketEggs: number;
  dumpEggs: number;
  hatchableEggs: number;
  totalEggs: number;
}