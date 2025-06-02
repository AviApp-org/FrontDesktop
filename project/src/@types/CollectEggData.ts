import { EggDetail } from './EggDatail';

export interface CollectChickenData {
  id?: number;
  aviaryId: number;
  eggDetail: EggDetail[];
  collectionDate: string;
}