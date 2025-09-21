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
    <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl shadow-blue-500/25 max-w-6xl w-full max-h-[90vh] overflow-hidden border border-blue-200/50 backdrop-blur-sm">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-8 py-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-blue-300/20 rounded-full blur-lg"></div>
          
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-8 bg-blue-300 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                {title} <span className="text-blue-200 font-medium">Analytics</span>
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="group relative p-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-white hover:bg-blue-400/30 transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <X className="w-5 h-5 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-blue-400/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="relative">
          {/* Content background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-100/30"></div>
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,_theme(colors.blue.400),transparent_70%)]"></div>
          
          <div className="relative p-8 overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-thin scrollbar-track-blue-50 scrollbar-thumb-blue-200 hover:scrollbar-thumb-blue-300">
            
            {/* Content wrapper with subtle border */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100/80 shadow-lg shadow-blue-100/50 p-6 min-h-[400px]">
              {renderAnalyticsContent()}
            </div>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
