// ToggleSwitch.jsx
import React from 'react';

const ToggleSwitch = ({ isActive, onToggle, isLoading, employeeName }) => {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700">Status:</span>
      
      {/* Status Badge */}
      <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
        isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>

      {/* Toggle Switch */}
      <div className="relative">
        <input
          type="checkbox"
          id="status-toggle"
          className="sr-only"
          checked={isActive}
          onChange={onToggle}
          disabled={isLoading}
        />
        <label
          htmlFor="status-toggle"
          className={`flex items-center cursor-pointer ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            isActive ? 'bg-blue-600' : 'bg-gray-300'
          }`}>
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
              isActive ? 'translate-x-5' : 'translate-x-0'
            }`}>
              {isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
