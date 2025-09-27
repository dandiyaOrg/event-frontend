import React, { useState } from 'react';
import { useTogglePassStatusMutation } from '../features/passTable/PassTableApi';

const PassToggleButton = ({ pass, onToggleSuccess = () => {} }) => {
  const [togglePassStatus, { isLoading }] = useTogglePassStatusMutation();
  const [error, setError] = useState(null);

  // Safety check - return null if pass is not provided
  if (!pass || pass.id === undefined) {
    return (
      <div className="flex items-center justify-center w-16 h-8 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs text-gray-400 font-medium">No data</div>
      </div>
    );
  }

  const handleToggle = async () => {
    try {
      setError(null);
      const result = await togglePassStatus(pass.id).unwrap();
      
      // Call success callback with updated data
      onToggleSuccess(result.data);
      
      console.log('Pass toggled successfully:', result.message);
    } catch (err) {
      console.error('Toggle failed:', err);
      setError(err?.data?.message || 'Failed to toggle pass status');
    }
  };

  // Provide default value for is_active if it's undefined
  const isActive = pass.is_active ?? false;

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Enhanced Toggle Button */}
      <div className="relative">
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`
            relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ease-in-out
            transform hover:scale-105 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-opacity-50
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
            shadow-lg hover:shadow-xl
            ${isActive 
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-300 shadow-green-200' 
              : 'bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 focus:ring-gray-300 shadow-gray-200'
            }
          `}
          title={`Click to ${isActive ? 'deactivate' : 'activate'} pass`}
        >
          {/* Toggle Circle */}
          <span
            className={`
              inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-2 ring-white
              transition-all duration-300 ease-in-out
              ${isActive 
                ? 'translate-x-8 shadow-green-100' 
                : 'translate-x-1 shadow-gray-100'
              }
              ${isLoading ? 'animate-pulse' : ''}
            `}
          >
            {/* Status Icon */}
            {!isLoading && (
              <div className={`
                w-full h-full flex items-center justify-center rounded-full
                ${isActive ? 'text-green-500' : 'text-gray-400'}
              `}>
                {isActive ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            )}
          </span>
          
          {/* Loading spinner overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            </div>
          )}
        </button>

        {/* Animated Background Glow */}
        {isActive && !isLoading && (
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
        )}
      </div>

      {/* Enhanced Status Badge */}
      <div className="text-center">
        <span className={`
          inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full
          transition-all duration-200 transform hover:scale-105
          border shadow-sm
          ${isActive 
            ? 'text-green-800 bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-green-100' 
            : 'text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 shadow-gray-100'
          }
        `}>
          {/* Status Icon in Badge */}
          <span className={`
            w-2 h-2 rounded-full mr-2 transition-colors duration-200
            ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}
          `}></span>
          
          {isLoading 
            ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating
              </span>
            )
            : isActive 
              ? 'Active' 
              : 'Inactive'
          }
        </span>
      </div>

      {/* Enhanced Error Message */}
      {error && (
        <div className="relative max-w-40">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-red-500"></div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 shadow-lg">
            <div className="flex items-start space-x-2">
              <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-red-700 font-medium leading-tight">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassToggleButton;
