export interface ChartData {
  labels: string[];
  values: number[];
}

export interface DashboardData {
  userName: string;
  cplData: ChartData;
  plData: ChartData;
  bkData: ChartData;
  subCpmkData: ChartData;
}
