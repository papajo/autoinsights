
import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  return (
    <div className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
          <span className="text-xl font-bold italic">A</span>
        </div>
        <span className="text-xl font-bold tracking-tight hidden lg:block">AutoInsights</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
              activeItem === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span className="font-medium hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-xl">
          <img src="https://picsum.photos/40/40" className="w-10 h-10 rounded-full border border-slate-700" alt="Avatar" />
          <div className="hidden lg:block overflow-hidden">
            <p className="text-sm font-semibold truncate">Senior Analyst</p>
            <p className="text-xs text-slate-500 truncate">Pro Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
