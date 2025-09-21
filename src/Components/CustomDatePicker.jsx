import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

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
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CustomDatePicker({
  minDate = null,
  maxDate = null,
  disabledDates = [], // Array of specific dates to disable
  placeholder = "Select date",
  onChange = null,
  value = null,
  label = "",
  disabled = false,
  className = ""
}) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);

  const today = new Date();
  const [month, setMonth] = useState(
    selectedDate ? selectedDate.getMonth() : today.getMonth()
  );
  const [year, setYear] = useState(
    selectedDate ? selectedDate.getFullYear() : today.getFullYear()
  );

  const inputRef = useRef();

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (!inputRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Function to check if a date is disabled
  const isDateDisabled = (date) => {
    // Check min/max date limits
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    // Check specific disabled dates
    if (disabledDates.length > 0) {
      return disabledDates.some((disabledDate) => {
        const disabled = new Date(disabledDate);
        return date.toDateString() === disabled.toDateString();
      });
    }

    return false;
  };

  // Function to check if month navigation should be disabled
  const isMonthNavigationDisabled = (direction) => {
    const testDate = new Date(year, month + direction, 15); // 15th of the month

    if (direction < 0 && minDate) {
      return testDate < new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    }
    if (direction > 0 && maxDate) {
      return (
        testDate > new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0)
      );
    }
    return false;
  };

  const handleDateSelect = (dayObj) => {
    if (dayObj.otherMonth) return; // Ignore clicks on other months

    const selectedDateObj = new Date(year, month, dayObj.day);

    // Check if the date is disabled
    if (isDateDisabled(selectedDateObj)) {
      return; // Don't allow selection of disabled dates
    }

    setSelectedDate(selectedDateObj);

    // Call onChange callback if provided
    if (onChange) {
      onChange(selectedDateObj);
    }

    setOpen(false);
  };

  // Month navigation
  const prevMonth = () => {
    if (isMonthNavigationDisabled(-1)) return;

    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (isMonthNavigationDisabled(1)) return;

    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const matrix = getMonthMatrix(year, month);

  const displayValue = selectedDate ? selectedDate.toLocaleDateString("en-GB") : "";
  const showPlaceholder = !selectedDate && placeholder;

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div ref={inputRef} className="relative">
        {/* Input Button */}
        <button
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          className={`flex items-center w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 ${
            disabled
              ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
              : open
              ? 'bg-white border-blue-500 ring-blue-500/20 shadow-lg'
              : 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-md focus:border-blue-500 focus:ring-blue-500/20'
          }`}
        >
          {/* Calendar Icon */}
          <div className={`mr-3 transition-colors duration-200 ${
            disabled 
              ? 'text-blue-500' 
              : open || selectedDate
              ? 'text-blue-500'
              : 'text-blue-500'
          }`}>
            <Calendar className="w-5 h-5" />
          </div>
          
          {/* Date Display */}
          <span className={`flex-1 text-left font-medium transition-colors duration-200 ${
            showPlaceholder 
              ? 'text-gray-400' 
              : disabled
              ? 'text-gray-500'
              : 'text-gray-700'
          }`}>
            {showPlaceholder ? placeholder : displayValue}
          </span>
          
          {/* Dropdown Arrow */}
          <div className={`transition-transform duration-200 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}>
            <ChevronDown className={`w-5 h-5 transition-colors duration-200 ${
              disabled ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
        </button>

        {/* Calendar Dropdown */}
        {open && !disabled && (
          <div className="absolute left-0 mt-2 bg-white shadow-2xl rounded-xl border border-gray-200 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200" 
               style={{ width: "320px" }}>
            
           

            {/* Calendar Content */}
            <div className="p-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isMonthNavigationDisabled(-1)
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={prevMonth}
                  disabled={isMonthNavigationDisabled(-1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="font-semibold text-gray-900 text-base px-4">
                  {months[month]} {year}
                </span>
                
                <button
                  type="button"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isMonthNavigationDisabled(1)
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={nextMonth}
                  disabled={isMonthNavigationDisabled(1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="space-y-1">
                {matrix.map((week, i) => (
                  <div key={i} className="grid grid-cols-7 gap-1">
                    {week.map((d, j) => {
                      const currentDate = new Date(year, month, d.day);
                      const isDisabled = !d.otherMonth && isDateDisabled(currentDate);
                      const isSelected =
                        selectedDate &&
                        selectedDate.getFullYear() === year &&
                        selectedDate.getMonth() === month &&
                        selectedDate.getDate() === d.day;
                      const isToday = 
                        today.getFullYear() === year &&
                        today.getMonth() === month &&
                        today.getDate() === d.day &&
                        !d.otherMonth;

                      return (
                        <button
                          key={j}
                          type="button"
                          className={`h-8 w-8 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                            d.otherMonth
                              ? "text-gray-300 cursor-default"
                              : isDisabled
                              ? "text-gray-300 cursor-not-allowed bg-gray-50"
                              : isSelected
                              ? "bg-blue-500 text-white font-bold shadow-lg hover:bg-blue-600"
                              : isToday
                              ? "bg-blue-100 text-blue-700 font-bold hover:bg-blue-200"
                              : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                          }`}
                          onClick={() => handleDateSelect(d)}
                          disabled={d.otherMonth || isDisabled}
                        >
                          {d.day}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

         
          </div>
        )}
      </div>
    </div>
  );
}
