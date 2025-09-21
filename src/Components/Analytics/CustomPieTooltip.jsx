// src/Components/charts/CustomPieTooltip.jsx
import React from 'react';

const CustomPieTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="group relative animate-in fade-in-0 zoom-in-95 duration-200 ease-out">
        {/* Glassmorphism container with gradient border */}
        <div className="relative overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-xl opacity-60 blur-sm group-hover:opacity-80 transition-all duration-300"></div>
          
          {/* Main tooltip content */}
          <div className="relative bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl p-4 min-w-[140px] max-w-[200px]">
            
            {/* Header section with color indicator and name */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                {/* Color indicator with glow effect */}
                <div 
                  className="w-4 h-4 rounded-full shadow-lg ring-2 ring-white/50 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundColor: data.payload.color,
                    boxShadow: `0 0 12px ${data.payload.color}40, 0 4px 8px rgba(0,0,0,0.15)`
                  }}
                />
                {/* Animated pulse ring */}
                <div 
                  className="absolute inset-0 w-4 h-4 rounded-full animate-pulse opacity-30"
                  style={{ backgroundColor: data.payload.color }}
                />
              </div>
              
              <div className="flex-1">
                <span className="text-slate-900 font-bold text-sm leading-tight block">
                  {data.name}
                </span>
              </div>
            </div>

            {/* Value section with enhanced styling */}
            <div className="relative">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  {data.value}
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  events
                </span>
              </div>
              
              {/* Decorative line */}
              <div className="mt-2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </div>

            {/* Subtle decoration elements */}
            <div className="absolute top-1 right-1 w-1 h-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Tooltip arrow with glassmorphism effect */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="w-3 h-3 bg-white/90 backdrop-blur-md border-r border-b border-white/20 rotate-45 shadow-lg"></div>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomPieTooltip;
