// src/Component/OrderCard.jsx
import React from 'react';

const OrderCard = ({ order }) => {
  if (!order) {
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
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeColor = (eventType) => {
    switch (eventType.toLowerCase()) {
      case 'conference':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'wedding':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'corporate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'workshop':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{order.eventName}</h2>
            <p className="text-gray-300">Order ID: {order.id}</p>
          </div>
          <div className="flex gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(order.eventType)}`}>
              {order.eventType}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 leading-relaxed">{order.description}</p>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Billing User</label>
            <p className="text-lg font-semibold text-gray-900">{order.billingUserName}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Date</label>
            <p className="text-lg font-medium text-gray-700">
              {new Date(order.orderDate).toLocaleDateString('en-IN')}
            </p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Date</label>
            <p className="text-lg font-medium text-gray-700">
              {new Date(order.eventDate).toLocaleDateString('en-IN')}
            </p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Amount</label>
            <p className="text-lg font-semibold text-green-600">₹{order.amount?.toLocaleString()}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Attendees</label>
            <p className="text-lg font-semibold text-gray-900">{order.attendees}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Venue</label>
            <p className="text-lg font-medium text-gray-700">{order.venue}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Per Person Cost</label>
            <p className="text-lg font-medium text-gray-700">₹{Math.round(order.amount / order.attendees).toLocaleString()}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Days Until Event</label>
            <p className="text-lg font-medium text-gray-700">
              {Math.max(0, Math.ceil((new Date(order.eventDate) - new Date()) / (1000 * 60 * 60 * 24)))} days
            </p>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default OrderCard;
