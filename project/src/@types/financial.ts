export interface PriceHistory {
  date: string;
  price: number;
  change: number;
}

export interface EggData {
  type: string;
  quantity: number;
  value: number;
}

export interface MonthlyData {
  totalEggs: number;
  incubatedEggs: number;
  marketEggs: number;
  incubatedValue: number;
  marketValue: number;
}
