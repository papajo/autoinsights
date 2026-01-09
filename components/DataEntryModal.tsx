
import React, { useState } from 'react';
import { MarketCategory, MarketRegion, MarketCountry } from '../types';
import { X, Save } from 'lucide-react';

interface DataEntryModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const DataEntryModal: React.FC<DataEntryModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    manufacturer: '',
    year: 2024,
    sales: 0,
    category: MarketCategory.FOUR_WHEELER,
    region: MarketRegion.ASIA,
    country: 'India' as MarketCountry,
    isListed: true
  });

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Add Market Intelligence Point</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">OEM Manufacturer</label>
              <input 
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                value={formData.manufacturer}
                onChange={e => setFormData({...formData, manufacturer: e.target.value})}
                placeholder="e.g. BYD, Maruti, NIO..."
              />
            </div>
            
            <div>
              <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Year</label>
              <input 
                type="number"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                value={formData.year}
                onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Production Volume</label>
              <input 
                type="number"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                value={formData.sales}
                onChange={e => setFormData({...formData, sales: parseInt(e.target.value)})}
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Category</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as MarketCategory})}
              >
                {Object.values(MarketCategory).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Region</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                value={formData.region}
                onChange={e => setFormData({...formData, region: e.target.value as MarketRegion})}
              >
                {Object.values(MarketRegion).filter(r => r !== MarketRegion.GLOBAL).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase font-bold mb-1 block">Country</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value as MarketCountry})}
              >
                {['USA', 'India', 'China', 'Germany', 'Japan', 'South Korea', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input 
                type="checkbox"
                checked={formData.isListed}
                onChange={e => setFormData({...formData, isListed: e.target.checked})}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium">Publicly Listed Company</span>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
            >
              <Save size={18} /> Save Point
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataEntryModal;
