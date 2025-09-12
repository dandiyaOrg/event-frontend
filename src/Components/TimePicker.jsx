import React, { useState, useRef, useEffect } from 'react';

const hours = Array.from({length: 12}, (_,i) => String(i+1).padStart(2,'0'));
const minutes = Array.from({length: 12}, (_,i) => String(i*5).padStart(2,'0'));
const meridiem = ["AM", "PM"];

function TimeDropdown({ selected, setSelected, options }) {
  return (
    <div className="flex flex-col">
      {options.map(opt => (
        <button type="button"
          key={opt}
          onClick={() => setSelected(opt)}
          className={`px-2 py-1 text-left ${selected===opt ? "bg-gray-200 font-semibold" : ""} hover:bg-gray-100`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export function TimePicker({ label="Start time:" }) {
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

  const timeString = `${h}:${m} ${mer}`;

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div ref={ref} className="relative w-44">
        <button
        type='button'
          onClick={()=>setOpen(o=>!o)}
          className="flex items-center w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-400 focus:ring-2 focus:ring-blue-500 font-semibold text-md">
          <span>{timeString}</span>
          <svg className="ml-auto w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.707 7.293a1 1 0 00-1.414 0L10 12.586 4.707 7.293A1 1 0 003.293 8.707l6 6a1 1 0 001.414 0l6-6a1 1 0 000-1.414z"/>
          </svg>
        </button>
        {open && (
          <div className="absolute left-0 mt-1 bg-white shadow-lg rounded-lg flex border z-10 p-2 space-x-2" style={{width:"230px"}}>
            <TimeDropdown selected={h} setSelected={setH} options={hours} />
            <TimeDropdown selected={m} setSelected={setM} options={minutes} />
            <TimeDropdown selected={mer} setSelected={setMer} options={meridiem} />
          </div>
        )}
      </div>
    </div>
  );
}
