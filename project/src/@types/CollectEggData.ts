import { EggDetailData } from './EggDetailData';

export interface CollectEggData {
  id?: number;
  aviaryId: number;
  eggDetail: EggDetailData[];
  collectionDate: string;
}