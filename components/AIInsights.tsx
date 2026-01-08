
import React, { useState, useEffect } from 'react';
import { MarketAnalysis, MarketCategory } from '../types';
import { getMarketInsights } from '../services/geminiService';
import { BrainCircuit, Loader2, Sparkles, RefreshCw } from 'lucide-react';

interface AIInsightsProps {
  analysisData: MarketAnalysis[];
  activeCategory: MarketCategory;
}

const AIInsights: React.FC<AIInsightsProps> = ({ analysisData, activeCategory }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateInsights = async () => {
    setLoading(true);
    // Create a compact string summary of the data for Gemini
    const summary = `
      Category: ${activeCategory}
      Total Manufacturers Analyzed: ${analysisData.length}
      Top Leader: ${analysisData[0]?.manufacturer} (Share: ${analysisData[0]?.marketShare.toFixed(1)}%)
      Second: ${analysisData[1]?.manufacturer} (Share: ${analysisData[1]?.marketShare.toFixed(1)}%)
      Growth Trends: ${analysisData.slice(0, 3).map(m => `${m.manufacturer}: ${m.yoyGrowth.toFixed(1)}% YoY`).join(', ')}
    `;

    const result = await getMarketInsights(summary);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    generateInsights();
  }, [activeCategory]);

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <BrainCircuit size={80} className="text-indigo-400" />
      </div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold">Intelligent Market Analysis</h2>
        </div>
        <button 
          onClick={generateInsights}
          disabled={loading}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          title="Regenerate Insights"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
        </button>
      </div>

      <div className="relative z-10">
        {loading ? (
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-slate-800/60 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-slate-800/60 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-slate-800/60 rounded w-5/6 animate-pulse"></div>
          </div>
        ) : (
          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
            {insight || "Select a category to generate AI-driven market intelligence."}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2 relative z-10">
        <span className="text-[10px] px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">Powered by Gemini 3 Flash</span>
        <span className="text-[10px] px-2 py-1 bg-slate-800 text-slate-400 rounded-full border border-slate-700">Predictive Modeling</span>
      </div>
    </div>
  );
};

export default AIInsights;
