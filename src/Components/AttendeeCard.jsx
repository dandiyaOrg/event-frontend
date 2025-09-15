// src/Components/AttendeeCard.jsx
import React from 'react';

const AttendeeCard = ({ attendee }) => {
  if (!attendee) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTicketTypeColor = (ticketType) => {
    switch (ticketType.toLowerCase()) {
      case 'vip':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'premium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'standard':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'family':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCheckInStatusColor = (checkedIn) => {
    return checkedIn 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {attendee.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{attendee.name}</h2>
              <p className="text-gray-300">{attendee.designation}</p>
              <p className="text-gray-400 text-sm">Attendee ID: {attendee.id}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(attendee.status)}`}>
              {attendee.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTicketTypeColor(attendee.ticketType)}`}>
              {attendee.ticketType}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCheckInStatusColor(attendee.checkedIn)}`}>
              {attendee.checkedIn ? 'Checked In' : 'Not Checked In'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Event Info */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Event Information</h3>
          <p className="text-gray-800">{attendee.eventName}</p>
          <p className="text-gray-600 text-sm">Order ID: {attendee.orderId}</p>
        </div>

        {/* Personal Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
            <p className="text-lg font-medium text-gray-700">{attendee.email}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</label>
            <p className="text-lg font-medium text-gray-700">{attendee.phone}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</label>
            <p className="text-lg font-medium text-gray-700">{attendee.company}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Emergency Contact</label>
            <p className="text-lg font-medium text-gray-700">{attendee.emergencyContact}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Registration Date</label>
            <p className="text-lg font-medium text-gray-700">
              {new Date(attendee.registrationDate).toLocaleDateString('en-IN')}
            </p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">T-Shirt Size</label>
            <p className="text-lg font-medium text-gray-700">{attendee.tshirtSize}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dietary Requirements</label>
            <p className="text-lg font-medium text-gray-700">{attendee.dietaryRequirements || 'None'}</p>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default AttendeeCard;
