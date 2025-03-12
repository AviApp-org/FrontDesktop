export interface ReportStatistics {
  liveBirds: {
    total: number;
    male: number;
    female: number;
  };
  waterConsumption: {
    total: number;
    dailyAverage: number;
    temperature: number;
  };
  eggs: {
    total: number;
    damaged: number;
    dirty: number;
    good: number;
  };
  mortality: number;
}

export interface Report {
  id: string;
  date: string;
  statistics: ReportStatistics;
}
