import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

const hours = Array.from({length: 12}, (_,i) => String(i+1).padStart(2,'0'));
const minutes = Array.from({length: 60}, (_,i) => String(i).padStart(2,'0')); // Changed: All 60 minutes
const meridiem = ["AM", "PM"];

function TimeDropdown({ selected, setSelected, options }) {
  return (
    <div className="flex flex-col max-h-32 overflow-y-auto">
      {options.map(opt => (
        <button type="button"
          key={opt}
          onClick={() => setSelected(opt)}
          className={`px-3 py-2 text-left rounded-md transition-all duration-200 ${
            selected === opt 
              ? "bg-blue-100 text-blue-700 font-semibold" 
              : "hover:bg-gray-100 text-gray-700"
          }`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export function TimePicker({ 
  label = "", 
  value, 
  onChange, 
  placeholder = "Select time",
  disabled = false,
  className = ""
}) {
  const [open, setOpen] = useState(false);
  const [h, setH] = useState("12");
  const [m, setM] = useState("00");
  const [mer, setMer] = useState("AM");
  const ref = useRef();

  useEffect(() => {
    function handler(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Convert 24-hour format to 12-hour format for display
  useEffect(() => {
    if (value) {
      const [hours24, minutes] = value.split(':');
      const hour24 = parseInt(hours24);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const meridiem = hour24 >= 12 ? 'PM' : 'AM';
      
      setH(String(hour12).padStart(2, '0'));
      setM(minutes);
      setMer(meridiem);
    }
  }, [value]);

  // Update parent component when time changes
  useEffect(() => {
    if (onChange) {
      let hour24 = parseInt(h);
      if (mer === 'PM' && hour24 !== 12) hour24 += 12;
      if (mer === 'AM' && hour24 === 12) hour24 = 0;
      
      const timeString24 = `${String(hour24).padStart(2, '0')}:${m}`;
      onChange(timeString24);
    }
  }, [h, m, mer, onChange]);

  const displayTime = value || `${h}:${m} ${mer}`;
  const showPlaceholder = !value && placeholder;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setOpen(o => !o)}
          disabled={disabled}
          className={`flex items-center w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 ${
            disabled
              ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
              : open
              ? 'bg-white border-blue-500 ring-blue-500/20 shadow-lg'
              : 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-md focus:border-blue-500 focus:ring-blue-500/20'
          }`}
        >
          {/* Time Icon */}
          <div className={`mr-3 transition-colors duration-200 ${
            disabled 
              ? 'text-gray-400' 
              : open || value
              ? 'text-blue-500'
              : 'text-gray-400'
          }`}>
            <Clock className="w-5 h-5" />
          </div>
          
          {/* Time Display */}
          <span className={`flex-1 text-left font-medium transition-colors duration-200 ${
            showPlaceholder 
              ? 'text-gray-400' 
              : disabled
              ? 'text-gray-500'
              : 'text-gray-700'
          }`}>
            {showPlaceholder ? placeholder : displayTime}
          </span>
          
          {/* Dropdown Arrow */}
          <div className={`transition-transform duration-200 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}>
            <svg 
              className={`w-5 h-5 transition-colors duration-200 ${
                disabled ? 'text-gray-400' : 'text-gray-500'
              }`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M16.707 7.293a1 1 0 00-1.414 0L10 12.586 4.707 7.293A1 1 0 003.293 8.707l6 6a1 1 0 001.414 0l6-6a1 1 0 000-1.414z"/>
            </svg>
          </div>
        </button>
        
        {/* Dropdown Menu */}
        {open && !disabled && (
          <div className="absolute left-0 mt-2 bg-white shadow-2xl rounded-xl border border-gray-200 z-50 p-3 animate-in slide-in-from-top-2 duration-200" 
               style={{width: "320px"}}> {/* Made wider for better minute display */}
            
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-gray-700">Select Time</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
                </svg>
              </button>
            </div>
            
            {/* Time Selection */}
            <div className="flex space-x-3">
              {/* Hours */}
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 mb-2 text-center">Hour</div>
                <div className="border border-gray-200 rounded-lg">
                  <TimeDropdown selected={h} setSelected={setH} options={hours} />
                </div>
              </div>
              
              {/* Separator */}
              <div className="flex font-bold items-center justify-center pt-6">
                :
              </div>
              
              {/* Minutes */}
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 mb-2 text-center">Minutes</div>
                <div className="border border-gray-200 rounded-lg">
                  <TimeDropdown selected={m} setSelected={setM} options={minutes} />
                </div>
              </div>
              
              {/* AM/PM */}
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 mb-2 text-center">Period</div>
                <div className="border border-gray-200 rounded-lg">
                  <TimeDropdown selected={mer} setSelected={setMer} options={meridiem} />
                </div>
              </div>
            </div>
            
            
            
           
          </div>
        )}
      </div>
    </div>
  );
}
