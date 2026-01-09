
export enum MarketCategory {
  TWO_WHEELER = 'Two Wheeler',
  THREE_WHEELER = 'Three Wheeler',
  FOUR_WHEELER = 'Four Wheeler',
  COMMERCIAL_VEHICLE = 'Commercial Vehicle',
  ELECTRIC_VEHICLE = 'Electric Vehicle'
}

export enum MarketRegion {
  GLOBAL = 'Global',
  NORTH_AMERICA = 'North America',
  EUROPE = 'Europe',
  ASIA = 'Asia',
  SOUTH_AMERICA = 'South America',
  AFRICA = 'Africa',
  EMEA = 'EMEA',
  ASIA_PAC = 'Asia-Pac'
}

// Added 'Sweden' to the list of allowed countries
export type MarketCountry = 
  | 'USA' | 'Canada' | 'Mexico' 
  | 'Germany' | 'France' | 'UK' | 'Italy' | 'Sweden'
  | 'China' | 'India' | 'Japan' | 'South Korea'
  | 'Brazil' | 'Argentina'
  | 'South Africa' | 'Nigeria' | 'Egypt'
  | 'Other';

export enum MetricType {
  NUMBERS = 'Numbers',
  MARKET_SHARE = 'Market Share %',
  YOY_GROWTH = 'YoY Growth %'
}

// Added missing DashboardView enum required by App.tsx
export enum DashboardView {
  CATEGORY = 'Category Breakdown',
  GEOGRAPHIC = 'Geographic Trends',
  DYNAMICS = 'Market Dynamics'
}

export interface MarketDataPoint {
  id: string;
  year: number;
  manufacturer: string;
  category: MarketCategory;
  region: MarketRegion;
  country: MarketCountry;
  sales: number;
  isListed: boolean;
}

export interface MarketAnalysis {
  manufacturer: string;
  data: Record<number, number>;
  totalSales: number;
  marketShare: number;
  yoyGrowth: number;
  region: MarketRegion;
  country: MarketCountry;
}