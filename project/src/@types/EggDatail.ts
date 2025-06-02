import { EggType } from './enums/enumEggtype';

export interface EggDetail {
  id?: number;
  type: EggType;
  quantity: number;
}