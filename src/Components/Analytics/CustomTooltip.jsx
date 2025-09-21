// src/Components/charts/CustomTooltip.jsx
import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="group relative animate-in fade-in-0 zoom-in-95 duration-200 ease-out">
        {/* Glassmorphism container with gradient border */}
        <div className="relative overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-50 blur-sm group-hover:opacity-70 transition-all duration-300"></div>
          
          {/* Main tooltip content */}
          <div className="relative bg-white/95 backdrop-blur-lg border border-white/30 shadow-2xl rounded-xl p-5 min-w-[160px] max-w-[280px]">
            
            {/* Header section with label */}
            <div className="mb-4 pb-3 border-b border-gradient-to-r from-transparent via-slate-200 to-transparent">
              <p className="font-bold text-lg bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                {label}
              </p>
            </div>

            {/* Data entries */}
            <div className="space-y-2.5">
              {payload.map((entry, index) => (
                <div key={index} className="group/item flex items-center justify-between hover:bg-slate-50/50 rounded-lg p-2 -m-2 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    {/* Enhanced color indicator */}
                    <div className="relative">
                      <div 
                        className="w-3 h-3 rounded-full shadow-lg ring-1 ring-white/40 transition-all duration-300 group-hover/item:scale-125"
                        style={{ 
                          backgroundColor: entry.color,
                          boxShadow: `0 0 8px ${entry.color}40, 0 2px 4px rgba(0,0,0,0.1)`
                        }}
                      />
                      {/* Animated pulse ring */}
                      <div 
                        className="absolute inset-0 w-3 h-3 rounded-full animate-pulse opacity-20 group-hover/item:opacity-40 transition-opacity duration-300"
                        style={{ backgroundColor: entry.color }}
                      />
                    </div>
                    
                    {/* Data key */}
                    <span className="text-sm font-semibold text-slate-700 capitalize tracking-wide">
                      {entry.dataKey}
                    </span>
                  </div>
                  
                  {/* Value with enhanced styling */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-slate-900 tabular-nums">
                      {entry.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-60"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-40"></div>
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-slate-50/20 rounded-xl pointer-events-none"></div>
          </div>
        </div>

        {/* Tooltip arrow with glassmorphism effect */}
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2">
          <div className="w-3 h-3 bg-white/95 backdrop-blur-lg border-r border-b border-white/30 rotate-45 shadow-lg"></div>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
