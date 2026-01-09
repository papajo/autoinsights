
import React from 'react';
import { MarketAnalysis, MetricType } from '../types';
import { YEARS } from '../constants';
import { TrendingUp, TrendingDown, ArrowRight, MapPin } from 'lucide-react';

interface MarketTableProps {
  analysisData: MarketAnalysis[];
  activeMetric: MetricType;
}

const MarketTable: React.FC<MarketTableProps> = ({ analysisData, activeMetric }) => {
  const formatValue = (value: number) => {
    if (activeMetric === MetricType.NUMBERS) {
      return value.toLocaleString();
    }
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800/30 text-slate-400 text-[10px] uppercase tracking-widest">
            <th className="p-4 font-bold border-b border-slate-800">Manufacturer & Origin</th>
            {YEARS.map(year => (
              <th key={year} className="p-4 font-bold border-b border-slate-800 text-right">{year}</th>
            ))}
            <th className="p-4 font-bold border-b border-slate-800 text-right">Market Share</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {analysisData.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-800/20 transition-colors group">
              <td className="p-4 border-b border-slate-800">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-200 text-sm flex items-center gap-1">
                    {row.manufacturer}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={8} /> {row.country}
                  </span>
                </div>
              </td>
              {YEARS.map(year => (
                <td key={year} className="p-4 border-b border-slate-800 text-right font-mono text-xs text-slate-400 group-hover:text-slate-200">
                  {formatValue(row.data[year] || 0)}
                </td>
              ))}
              <td className="p-4 border-b border-slate-800 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-blue-400 font-bold text-sm">{row.marketShare.toFixed(1)}%</span>
                  <div className={`flex items-center text-[10px] font-bold ${row.yoyGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {row.yoyGrowth >= 0 ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                    {Math.abs(row.yoyGrowth).toFixed(1)}% YoY
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
