import React, { useState, useRef, useEffect } from "react";

// Helper to generate calendar matrix
function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Find last date of previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let matrix = [];
  let day = 1;
  let rows = 6; // Always show 6 rows to match the UI

  for (let i = 0; i < rows; i++) {
    let week = [];
    for (let j = 0; j < 7; j++) {
      let cellDay = null;
      // First row, fill prev month days if necessary
      if (i === 0 && j < startingDay) {
        cellDay = daysInPrevMonth - startingDay + j + 1;
        week.push({ day: cellDay, otherMonth: true });
      } else if (day > daysInMonth) {
        // After end of this month, show next month days
        cellDay = day - daysInMonth;
        week.push({ day: cellDay, otherMonth: true });
        day++;
      } else {
        week.push({ day, otherMonth: false });
        day++;
      }
    }
    matrix.push(week);
  }
  return matrix;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CustomDatePicker() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const inputRef = useRef();

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (!inputRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleDateSelect = (dayObj) => {
    if (dayObj.otherMonth) return; // Ignore clicks on other months (optional)
    const d = new Date(year, month, dayObj.day);
    setSelectedDate(d);
    setOpen(false);
  };

  // Month navigation
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const matrix = getMonthMatrix(year, month);

  return (
    <div ref={inputRef} className="relative max-w-xs">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </span>
        <input
          type="text"
          readOnly
          value={
            selectedDate
              ? selectedDate.toLocaleDateString("en-GB")
              : ""
          }
          placeholder="Select date"
          onClick={() => setOpen(!open)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 cursor-pointer outline-none"
        />
      </div>
      {open && (
        <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-10 p-4">
          <div className="flex items-center justify-between mb-2">
            <button
              className="px-3 text-2xl font-bold text-gray-500 hover:text-black"
              onClick={prevMonth}
            >&lt;</button>
            <span className="font-semibold text-gray-900 text-lg">
              {months[month]} {year}
            </span>
            <button
              className="px-3 text-2xl font-bold text-gray-500 hover:text-black"
              onClick={nextMonth}
            >&gt;</button>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-gray-500 font-semibold text-sm">
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
                <div key={d} className="w-9 text-center">{d}</div>
              ))}
            </div>
            {matrix.map((week, i) => (
              <div key={i} className="flex">
                {week.map((d, j) => (
                  <div key={j} className="w-9 h-9 flex items-center justify-center">
                    <button
                      type="button"
                      className={`rounded-full w-8 h-8 text-sm transition
                        ${d.otherMonth
                          ? "text-gray-300"
                          : selectedDate &&
                            selectedDate.getFullYear() === year &&
                            selectedDate.getMonth() === month &&
                            selectedDate.getDate() === d.day
                          ? "bg-blue-600 text-white font-bold"
                          : "hover:bg-blue-100 text-gray-900"
                        }`}
                      onClick={() => handleDateSelect(d)}
                      disabled={d.otherMonth}
                    >
                      {d.day}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
