
export enum MarketCategory {
  TWO_WHEELER = 'Two Wheeler',
  THREE_WHEELER = 'Three Wheeler',
  FOUR_WHEELER = 'Four Wheeler',
  COMMERCIAL_VEHICLE = 'Commercial Vehicle',
  ELECTRIC_VEHICLE = 'Electric Vehicle'
}

export enum DashboardView {
  COMPANY = 'Company View',
  CATEGORY = 'Category View',
  GROUP = 'Category Group',
  INDUSTRY = 'Industry View'
}

export enum MetricType {
  NUMBERS = 'Numbers',
  MARKET_SHARE = 'Market Share %',
  YOY_GROWTH = 'YoY Growth %'
}

export interface MarketDataPoint {
  year: number;
  manufacturer: string;
  category: MarketCategory;
  sales: number;
  isListed: boolean;
}

export interface MarketAnalysis {
  manufacturer: string;
  data: Record<number, number>;
  totalSales: number;
  marketShare: number;
  yoyGrowth: number;
}
