
import { MarketDataPoint } from '../types';

const STORAGE_KEY = 'auto_insights_v1_data';

export const MarketRepository = {
  saveData: (data: MarketDataPoint[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getAll: (): MarketDataPoint[] | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  addPoint: (point: Omit<MarketDataPoint, 'id'>) => {
    const current = MarketRepository.getAll() || [];
    const newPoint = { ...point, id: crypto.randomUUID() };
    const updated = [...current, newPoint];
    MarketRepository.saveData(updated);
    return updated;
  },

  resetToDefaults: (defaults: MarketDataPoint[]) => {
    MarketRepository.saveData(defaults);
    return defaults;
  }
};
