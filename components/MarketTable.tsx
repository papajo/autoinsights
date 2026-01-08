
import React from 'react';
import { MarketAnalysis, MetricType } from '../types';
import { YEARS } from '../constants';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface MarketTableProps {
  analysisData: MarketAnalysis[];
  activeMetric: MetricType;
}

const MarketTable: React.FC<MarketTableProps> = ({ analysisData, activeMetric }) => {
  const formatValue = (value: number, manufacturer: MarketAnalysis) => {
    if (activeMetric === MetricType.NUMBERS) {
      return value.toLocaleString();
    }
    if (activeMetric === MetricType.MARKET_SHARE) {
      // In this specific mock UI, we show market share based on current year but the table columns are by year.
      // To keep it simple for the demo, we'll calculate share for each year based on that year's specific column total.
      return `${value.toFixed(1)}%`;
    }
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800/30 text-slate-400 text-xs uppercase tracking-wider">
            <th className="p-4 font-semibold border-b border-slate-800">Manufacturer</th>
            {YEARS.map(year => (
              <th key={year} className="p-4 font-semibold border-b border-slate-800 text-right">{year}</th>
            ))}
            <th className="p-4 font-semibold border-b border-slate-800 text-right">Latest Share</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {analysisData.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-800/20 transition-colors group">
              <td className="p-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200 text-sm group-hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1">
                    {row.manufacturer} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </span>
                </div>
              </td>
              {YEARS.map(year => (
                <td key={year} className="p-4 border-b border-slate-800 text-right font-mono text-sm text-slate-300">
                  {formatValue(row.data[year] || 0, row)}
                </td>
              ))}
              <td className="p-4 border-b border-slate-800 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-blue-400 font-bold">{row.marketShare.toFixed(1)}%</span>
                  <div className={`flex items-center text-[10px] ${row.yoyGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
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
