
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { X, AlertCircle } from 'lucide-react';

const ErrorPopup = ({ isError, error, onClearError }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  // Show popup when isError becomes true
  useEffect(() => {
    if (isError && error) {
      setShowPopup(true);
    }
  }, [isError, error]);

  // Auto-hide after 5 seconds (optional)
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleClose = () => {
    setShowPopup(false);
    
    // Dispatch action to clear error if provided
    if (onClearError) {
      dispatch(onClearError());
    }
  };

  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    if (error?.data?.message) return error.data.message;
    if (error?.message) return error.message;
    return 'An unexpected error occurred';
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Error Occurred
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {getErrorMessage()}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
