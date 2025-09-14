// src/components/charts/CustomPieTooltip.jsx
import React from 'react';

const CustomPieTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.payload.color }}
          />
          <span className="text-gray-900 font-semibold">{data.name}</span>
        </div>
        <p className="text-gray-700 text-sm mt-1">
          {data.value} events
        </p>
      </div>
    );
  }
  return null;
};

export default CustomPieTooltip;
