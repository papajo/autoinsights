
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MarketTable from './components/MarketTable';
import MarketCharts from './components/MarketCharts';
import AIInsights from './components/AIInsights';
import DataEntryModal from './components/DataEntryModal';
import { generateInitialData, getAggregatedData } from './services/mockDataService';
import { MarketRepository } from './services/persistenceService';
import { MarketCategory, MarketRegion, MarketCountry, DashboardView, MetricType, MarketDataPoint } from './types';
import { CATEGORY_ICONS, REGION_ICONS } from './constants';
import { 
  Download, 
  BarChart2, 
  Table as TableIcon,
  Search,
  Plus,
  Globe,
  Filter,
  RefreshCcw,
  MapPin
} from 'lucide-react';

const REGION_COUNTRIES: Record<MarketRegion, (MarketCountry | 'All')[]> = {
  [MarketRegion.GLOBAL]: ['All'],
  [MarketRegion.NORTH_AMERICA]: ['All', 'USA', 'Canada', 'Mexico'],
  [MarketRegion.EUROPE]: ['All', 'Germany', 'France', 'UK', 'Italy', 'Sweden'],
  [MarketRegion.ASIA]: ['All', 'India', 'China', 'Japan', 'South Korea'],
  [MarketRegion.SOUTH_AMERICA]: ['All', 'Brazil', 'Argentina'],
  [MarketRegion.AFRICA]: ['All', 'South Africa', 'Nigeria', 'Egypt'],
  [MarketRegion.EMEA]: ['All', 'Germany', 'South Africa'],
  [MarketRegion.ASIA_PAC]: ['All', 'India', 'China', 'Japan'],
};

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [activeView, setActiveView] = useState<DashboardView>(DashboardView.CATEGORY);
  const [activeRegion, setActiveRegion] = useState<MarketRegion>(MarketRegion.GLOBAL);
  const [activeCountry, setActiveCountry] = useState<MarketCountry | 'All'>('All');
  const [activeCategory, setActiveCategory] = useState<MarketCategory>(MarketCategory.TWO_WHEELER);
  const [activeMetric, setActiveMetric] = useState<MetricType>(MetricType.NUMBERS);
  const [listedOnly, setListedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Real-time persistent state
  const [db, setDb] = useState<MarketDataPoint[]>([]);

  // Initialize data from LocalStorage or Seed
  useEffect(() => {
    const stored = MarketRepository.getAll();
    if (stored) {
      setDb(stored);
    } else {
      const initial = generateInitialData();
      setDb(MarketRepository.resetToDefaults(initial));
    }
  }, []);

  const handleSaveData = (point: Omit<MarketDataPoint, 'id'>) => {
    const updated = MarketRepository.addPoint(point);
    setDb(updated);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    if (confirm("Reset database to global default benchmarks? All custom entries will be lost.")) {
      const initial = generateInitialData();
      setDb(MarketRepository.resetToDefaults(initial));
    }
  };

  const exportToCSV = () => {
    const headers = ['Manufacturer', 'Region', 'Country', 'Category', ...[2018, 2019, 2020, 2021, 2022, 2023, 2024]];
    const rows = analysisData.map(m => [
      m.manufacturer,
      m.region,
      m.country,
      activeCategory,
      ...Object.values(m.data)
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Market_Report_${activeRegion}_${activeCountry}_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const analysisData = useMemo(() => {
    let result = getAggregatedData(db, activeCategory, activeRegion, activeCountry, listedOnly);
    if (searchTerm) {
      result = result.filter(d => d.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return result;
  }, [db, activeCategory, activeRegion, activeCountry, listedOnly, searchTerm]);

  // Sync country selection when region changes
  useEffect(() => {
    setActiveCountry('All');
  }, [activeRegion]);

  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
      <Sidebar activeItem={activeNav} setActiveItem={setActiveNav} />

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-2xl shadow-inner border border-slate-700">
              {activeRegion === MarketRegion.GLOBAL ? <Globe size={24} className="text-blue-400" /> : REGION_ICONS[activeRegion]}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Market Intelligence Hub</h1>
              <p className="text-slate-400 text-sm flex items-center gap-1">
                <MapPin size={12} /> {activeRegion} <span className="text-slate-600">/</span> {activeCountry}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleReset}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all border border-slate-700 text-slate-400"
              title="Reset Database"
            >
              <RefreshCcw size={18} />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-all border border-slate-700 text-sm font-bold"
            >
              <Plus size={16} /> Data Input
            </button>
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl transition-all text-white text-sm font-bold shadow-lg shadow-blue-900/30"
            >
              <Download size={16} /> Excel Extract
            </button>
          </div>
        </header>

        {/* Region & Country Filter Blocks */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/50 p-2 rounded-2xl border border-slate-800/50 overflow-x-auto scrollbar-hide">
            {Object.values(MarketRegion).map(region => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeRegion === region 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
                    : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                }`}
              >
                {REGION_ICONS[region]} {region}
              </button>
            ))}
          </div>

          {activeRegion !== MarketRegion.GLOBAL && (
             <div className="flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="text-[10px] font-bold text-slate-600 uppercase ml-2 mr-1">Countries:</span>
                {REGION_COUNTRIES[activeRegion].map(country => (
                  <button
                    key={country}
                    onClick={() => setActiveCountry(country)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeCountry === country 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {country}
                  </button>
                ))}
             </div>
          )}
        </div>

        {/* Metric Selection */}
        <div className="flex flex-wrap items-center gap-6 border-b border-slate-800 pb-2">
          {Object.values(DashboardView).map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`pb-3 px-1 text-sm font-semibold transition-all relative ${
                activeView === view ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {view}
              {activeView === view && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex bg-slate-800 p-1 rounded-xl">
                  <button 
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${viewMode === 'table' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    <TableIcon size={14} /> Data Grid
                  </button>
                  <button 
                    onClick={() => setViewMode('chart')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${viewMode === 'chart' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    <BarChart2 size={14} /> Visualization
                  </button>
                </div>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="form-checkbox bg-slate-800 border-slate-700 rounded text-blue-500 focus:ring-0" 
                    checked={listedOnly}
                    onChange={(e) => setListedOnly(e.target.checked)}
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Public Entities</span>
                </label>
              </div>

              <div className="flex items-center gap-4 flex-1 justify-end">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Filter brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="flex items-center bg-slate-800/50 rounded-xl border border-slate-700 p-1">
                  {Object.values(MetricType).map(metric => (
                    <button
                      key={metric}
                      onClick={() => setActiveMetric(metric)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${
                        activeMetric === metric ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {metric.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {Object.values(MarketCategory).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 border transition-all whitespace-nowrap ${
                      activeCategory === cat 
                        ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                        : 'bg-slate-800/40 border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    {CATEGORY_ICONS[cat]} {cat}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900/20 rounded-2xl min-h-[400px]">
                {viewMode === 'table' ? (
                  <MarketTable analysisData={analysisData} activeMetric={activeMetric} />
                ) : (
                  <MarketCharts analysisData={analysisData} />
                )}
                {analysisData.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <Filter size={48} className="mb-4 opacity-20" />
                    <p>Zero data entries for {activeCountry === 'All' ? activeRegion : activeCountry} under {activeCategory}.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-6">
            <AIInsights analysisData={analysisData} activeCategory={activeCategory} activeRegion={activeRegion} />
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xs font-bold mb-4 text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <BarChart2 size={14} /> Market Breakdown
              </h3>
              <div className="space-y-3">
                {analysisData.slice(0, 5).map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-600 w-4">{i+1}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-200">{m.manufacturer}</p>
                        <p className="text-[10px] text-slate-500">{m.country}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-400">{m.marketShare.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <DataEntryModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveData} 
        />
      )}
    </div>
  );
};

export default App;