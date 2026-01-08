
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MarketTable from './components/MarketTable';
import MarketCharts from './components/MarketCharts';
import AIInsights from './components/AIInsights';
import { generateMockMarketData, getAggregatedData } from './services/mockDataService';
import { MarketCategory, DashboardView, MetricType, MarketDataPoint } from './types';
import { CATEGORY_ICONS, YEARS } from './constants';
import { 
  FileText, 
  BarChart2, 
  ChevronDown, 
  Filter, 
  LayoutGrid, 
  Table as TableIcon,
  Search,
  Plus
} from 'lucide-react';

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [activeView, setActiveView] = useState<DashboardView>(DashboardView.CATEGORY);
  const [activeCategory, setActiveCategory] = useState<MarketCategory>(MarketCategory.TWO_WHEELER);
  const [activeMetric, setActiveMetric] = useState<MetricType>(MetricType.NUMBERS);
  const [listedOnly, setListedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Source data
  const rawData = useMemo(() => generateMockMarketData(), []);

  // Processed data
  const analysisData = useMemo(() => {
    let result = getAggregatedData(rawData, activeCategory, listedOnly);
    if (searchTerm) {
      result = result.filter(d => d.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return result;
  }, [rawData, activeCategory, listedOnly, searchTerm]);

  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
      <Sidebar activeItem={activeNav} setActiveItem={setActiveNav} />

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-2xl shadow-inner border border-slate-700">
              {CATEGORY_ICONS[activeCategory]}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Market Dashboard</h1>
              <p className="text-slate-400 text-sm">Automotive Analytics & Production Trends</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-all border border-slate-700 text-sm font-medium">
              <Plus size={16} /> New Market
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-all text-white text-sm font-medium shadow-lg shadow-blue-900/30">
              <FileText size={16} /> Extract Report
            </button>
          </div>
        </header>

        {/* View Switches */}
        <div className="flex flex-wrap items-center gap-4 border-b border-slate-800 pb-2">
          {Object.values(DashboardView).map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`pb-3 px-1 text-sm font-semibold transition-all relative ${
                activeView === view ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {view}
              {activeView === view && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic AI Sidebar Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            
            {/* Filter Controls */}
            <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex bg-slate-800 p-1 rounded-xl">
                  <button 
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${viewMode === 'table' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    <TableIcon size={14} /> Table
                  </button>
                  <button 
                    onClick={() => setViewMode('chart')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${viewMode === 'chart' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    <BarChart2 size={14} /> Chart
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="form-checkbox bg-slate-800 border-slate-700 rounded text-blue-500 focus:ring-0 focus:ring-offset-0" 
                      checked={listedOnly}
                      onChange={(e) => setListedOnly(e.target.checked)}
                    />
                    <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Listed Only</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-1 justify-end">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search manufacturers..."
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
                      {metric}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-900/20 rounded-2xl">
              <div className="mb-4 flex items-center justify-between">
                 <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {Object.values(MarketCategory).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 border transition-all whitespace-nowrap ${
                          activeCategory === cat 
                            ? 'bg-blue-600/10 border-blue-500 text-blue-400' 
                            : 'bg-slate-800/40 border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                        }`}
                      >
                        {CATEGORY_ICONS[cat]}
                        {cat}
                      </button>
                    ))}
                 </div>
              </div>

              {viewMode === 'table' ? (
                <MarketTable analysisData={analysisData} activeMetric={activeMetric} />
              ) : (
                <MarketCharts analysisData={analysisData} />
              )}
            </div>
          </div>

          {/* Right Sidebar - AI Insights & Info */}
          <div className="xl:col-span-1 space-y-6">
            <AIInsights analysisData={analysisData} activeCategory={activeCategory} />
            
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-sm font-semibold mb-4 text-slate-400 uppercase tracking-widest">Market Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-slate-700 pb-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Market Leaders</p>
                    <p className="text-lg font-bold">Top {analysisData.length > 5 ? 5 : analysisData.length}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Avg. Growth</p>
                    <p className="text-lg font-bold text-emerald-400">
                      {(analysisData.reduce((acc, curr) => acc + curr.yoyGrowth, 0) / (analysisData.length || 1)).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  {analysisData.slice(0, 4).map((m, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-[10px] font-bold group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all">
                          #{i+1}
                        </div>
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{m.manufacturer}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-500">{m.marketShare.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-bold transition-all border border-slate-600">
                  VIEW FULL SECTOR REPORT
                </button>
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 opacity-5">
                 <LayoutGrid size={100} />
               </div>
               <h3 className="text-sm font-bold text-blue-400 mb-2">Pro Tip</h3>
               <p className="text-xs text-slate-400 leading-relaxed">
                 Toggle between <b>Market Share</b> and <b>YoY Growth</b> to identify disruptors in the electric vehicle segment.
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
