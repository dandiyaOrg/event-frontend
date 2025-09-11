import React, { useState, useRef } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// Simple calendar icon SVG
const CalendarIcon = ({ className }) => (
  <svg className={className} height="1em" viewBox="0 0 448 512" fill="#7b809a">
    <path d="M152 64c0-8.8-7.2-16-16-16s-16 7.2-16 16V96h-40C53.5 96 32 117.5 32 144v304c0 
    26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48h-40V64c0-8.8-7.2-16-16-16s-16 
    7.2-16 16V96H152V64zM64 144c0-8.8 7.2-16 16-16h40v32c0 8.8 7.2 16 16 16s16-7.2 16-16v-32h128v32c0 
    8.8 7.2 16 16 16s16-7.2 16-16v-32h40c8.8 0 16 7.2 16 16v32H64v-32zm320 304c0 8.8-7.2 16-16 
    16H80c-8.8 0-16-7.2-16-16V208h320v240zm-112-64c0 8.8-7.2 16-16 16s-16-7.2-16-16V336c0-8.8 
    7.2-16 16-16s16 7.2 16 16v48z"/>
  </svg>
);

const DateRangePicker = () => {
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef(null);

  // Helper for formatting
  const formatLabel = (date, fallback) =>
    date ? format(date, "dd MMM yyyy") : fallback;

  // Focus/popover logic
  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowPicker(false);
    }
  };

  React.useEffect(() => {
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  return (
    <div className="flex items-center gap-4 w-full select-none relative">
      
      <div ref={inputRef} className="relative">
        <button
          type="button"
          className={`flex items-center gap-2 px-5 py-3 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm w-[220px]`}
          onClick={() => setShowPicker((open) => !open)}
        >
          <CalendarIcon className="w-5 h-5" />
          <span className={state[0].startDate ? "text-gray-700" : "text-gray-400"}>
            {formatLabel(state[0].startDate, "Select date start")}
          </span>
        </button>
        {showPicker && (
          <div className="absolute left-0 top-[110%] z-20 shadow-lg rounded-xl" style={{minWidth:"340px"}}>
            <DateRange
              ranges={state}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              months={1}
              direction="horizontal"
              showDateDisplay={false}
              rangeColors={["#2563eb"]}
              // Keep arrows/labels visible (styled by default theme) 
            />
          </div>
        )}
      </div>
      <span className="text-gray-400 text-base font-medium">to</span>
      <div className="relative">
        <button
          type="button"
          className={`flex items-center gap-2 px-5 py-3 border border-gray-300 bg-gray-50 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm w-[220px]`}
          onClick={() => setShowPicker((open) => !open)}
        >
          <CalendarIcon className="w-5 h-5" />
          <span className={state[0].endDate ? "text-gray-700" : "text-gray-400"}>
            {formatLabel(state[0].endDate, "Select date end")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
