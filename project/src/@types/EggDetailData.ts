import { EggType } from './enums/enumEggtype';

export interface EggDetailData {
  id?: number;
  type: EggType;
  quantity: number;
}