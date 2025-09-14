
import React from 'react';
import { X } from 'lucide-react';
import EventsAnalytics from './EventAnalytics';
import AttendeesAnalytics from './AttendeeAnalytics';
import RevenueAnalytics from './RevenueAnalytics';
import CheckInsAnalytics from './CheckInAnalytics';

const AnalyticsModal = ({ isOpen, onClose, analyticsType, title }) => {
  if (!isOpen) return null;

  const renderAnalyticsContent = () => {
    switch (analyticsType) {
      case 'events':
        return <EventsAnalytics />;
      case 'attendees':
        return <AttendeesAnalytics />;
      case 'revenue':
        return <RevenueAnalytics />;
      case 'checkins':
        return <CheckInsAnalytics />;
      default:
        return <EventsAnalytics />;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{title} Analytics</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {renderAnalyticsContent()}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
