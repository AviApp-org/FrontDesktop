export interface ReportStatistics {
  liveBirds: {
    male: number;
    female: number;
    total: number;
  };
  eggs: {
    total: number;
    cracked: number;
    dirtyNest: number;
    small: number;
    incubatable: number;
    broken: number;
    deformed: number;
    thinShell: number;
    eliminated: number;
    market: number;
  };
}

export interface Report {
  id: string;
  date: string;
  statistics?: ReportStatistics;
} 