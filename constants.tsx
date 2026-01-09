
import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Users, 
  Truck, 
  Zap, 
  Bike, 
  Car, 
  Globe,
  Map,
  Search,
  BrainCircuit
} from 'lucide-react';
import { MarketRegion } from './types';

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Two Wheeler': <Bike className="w-4 h-4" />,
  'Three Wheeler': <Zap className="w-4 h-4" />,
  'Four Wheeler': <Car className="w-4 h-4" />,
  'Commercial Vehicle': <Truck className="w-4 h-4" />,
  'Electric Vehicle': <Zap className="w-4 h-4 text-emerald-400" />
};

export const REGION_ICONS: Record<MarketRegion, React.ReactNode> = {
  [MarketRegion.GLOBAL]: <Globe className="w-4 h-4" />,
  [MarketRegion.NORTH_AMERICA]: <Map className="w-4 h-4" />,
  [MarketRegion.EUROPE]: <Map className="w-4 h-4" />,
  [MarketRegion.ASIA]: <Map className="w-4 h-4" />,
  [MarketRegion.SOUTH_AMERICA]: <Map className="w-4 h-4" />,
  [MarketRegion.AFRICA]: <Map className="w-4 h-4" />,
  [MarketRegion.EMEA]: <Globe className="w-4 h-4" />,
  [MarketRegion.ASIA_PAC]: <Globe className="w-4 h-4" />
};

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'analytics', label: 'Market Analytics', icon: <BarChart3 size={20} /> },
  { id: 'competitors', label: 'Company Deep-Dive', icon: <Users size={20} /> },
  { id: 'ai-insights', label: 'AI Intelligence', icon: <BrainCircuit size={20} /> },
  { id: 'settings', label: 'Preferences', icon: <Settings size={20} /> },
];

export const YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
  '#ec4899', '#06b6d4', '#f97316', '#84cc16', '#a855f7'
];
