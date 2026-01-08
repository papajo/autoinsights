
import React from 'react';
import { MarketAnalysis } from '../types';
import { YEARS, COLORS } from '../constants';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface MarketChartsProps {
  analysisData: MarketAnalysis[];
}

const MarketCharts: React.FC<MarketChartsProps> = ({ analysisData }) => {
  // Pivot data for Recharts
  const chartData = YEARS.map(year => {
    const entry: any = { year };
    analysisData.forEach(m => {
      entry[m.manufacturer] = m.data[year] || 0;
    });
    return entry;
  });

  const topManufacturers = analysisData.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-[400px]">
        <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Sales Volume Trends (Top 10)</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={chartData}>
            <defs>
              {analysisData.slice(0, 5).map((m, idx) => (
                <linearGradient key={`grad-${idx}`} id={`color-${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS[idx % COLORS.length]} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLORS[idx % COLORS.length]} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend verticalAlign="top" height={36}/>
            {analysisData.slice(0, 5).map((m, idx) => (
              <Area 
                key={m.manufacturer}
                type="monotone" 
                dataKey={m.manufacturer} 
                stroke={COLORS[idx % COLORS.length]} 
                fillOpacity={1} 
                fill={`url(#color-${idx})`} 
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-[350px]">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Market Share Distribution</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={topManufacturers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${val}%`} />
              <YAxis type="category" dataKey="manufacturer" stroke="#94a3b8" fontSize={10} width={120} />
              <Tooltip 
                cursor={{ fill: 'rgba(51, 65, 85, 0.3)' }}
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Bar dataKey="marketShare" radius={[0, 4, 4, 0]}>
                {topManufacturers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 h-[350px]">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">YoY Growth comparison</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={topManufacturers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="manufacturer" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${val}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Bar dataKey="yoyGrowth" radius={[4, 4, 0, 0]}>
                {topManufacturers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.yoyGrowth >= 0 ? '#10b981' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketCharts;
