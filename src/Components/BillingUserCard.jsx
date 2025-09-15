// src/Component/BillingUserCard.jsx
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Billing User Details</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(billingUser.status)}`}>
            {billingUser.status}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</label>
            <p className="text-lg font-semibold text-gray-900">{billingUser.id}</p>
          </div>
          
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
            <p className="text-lg font-medium text-gray-700">{billingUser.phone}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</label>
            <p className="text-lg font-medium text-gray-700">{billingUser.company}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Orders</label>
            <p className="text-lg font-semibold text-gray-900">{billingUser.totalOrders}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</label>
            <p className="text-lg font-semibold text-green-600">₹{billingUser.totalSpent?.toLocaleString()}</p>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Registration Date</label>
            <p className="text-lg font-medium text-gray-700">
              {new Date(billingUser.registrationDate).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default BillingUserCard;
