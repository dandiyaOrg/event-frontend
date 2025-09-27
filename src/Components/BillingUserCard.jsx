// src/Components/BillingUserCard.jsx
import React from 'react';

const BillingUserCard = ({ billingUser }) => {
  if (!billingUser) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Billing User Details</h2>
          <span className="px-3 py-1 rounded-full text-sm font-medium border">
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</label>
            <p className="text-lg font-semibold text-gray-900">{billingUser.name}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
            <p className="text-lg font-medium text-gray-700 break-all">{billingUser.email}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</label>
            <p className="text-lg font-medium text-gray-700">{billingUser.mobile_no}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Whatsapp</label>
            <p className="text-lg font-medium text-gray-700">{billingUser.whatsapp}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</label>
            <p className="text-lg font-semibold text-gray-900">{billingUser.address}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gender</label>
            <p className="text-lg font-semibold text-green-600">{billingUser.gender}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Age</label>
            <p className="text-lg font-medium text-gray-700">
              {billingUser.age} years
            </p>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default BillingUserCard;
