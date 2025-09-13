import React, { useState } from "react";
import { X, User, Mail, Phone, Lock } from "lucide-react";

const EmployeeCard = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  // Function to mask password
  const getMaskedPassword = (password) => {
    return '*'.repeat(password?.length || 8);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-sm mx-auto border border-white/20 transform transition-all">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-600/90 to-gray-700/90 backdrop-blur-md px-6 py-6 text-white rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
          
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl font-bold mb-3 border-2 border-white/30 shadow-lg">
              {getInitials(employee.name)}
            </div>
            
            {/* Name */}
            <h2 className="text-xl font-bold text-center">{employee.name}</h2>
            <p className="text-gray-200 text-sm">@{employee.username}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Username */}
          <div className="flex items-center gap-3 p-3 bg-gray-50/80 backdrop-blur-sm rounded-xl hover:bg-gray-100/80 transition-all duration-200">
            <div className="p-2 bg-gray-200/60 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Username</p>
              <p className="text-sm font-semibold text-gray-800">{employee.username}</p>
            </div>
          </div>

          {/* Mobile Number */}
          <div className="flex items-center gap-3 p-3 bg-gray-50/80 backdrop-blur-sm rounded-xl hover:bg-gray-100/80 transition-all duration-200">
            <div className="p-2 bg-gray-200/60 rounded-lg">
              <Phone className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Mobile Number</p>
              <p className="text-sm font-semibold text-gray-800">{employee.mobileNumber}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 p-3 bg-gray-50/80 backdrop-blur-sm rounded-xl hover:bg-gray-100/80 transition-all duration-200">
            <div className="p-2 bg-gray-200/60 rounded-lg">
              <Mail className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Email Address</p>
              <p className="text-sm font-semibold text-gray-800">{employee.emailId}</p>
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 p-3 bg-gray-50/80 backdrop-blur-sm rounded-xl hover:bg-gray-100/80 transition-all duration-200">
            <div className="p-2 bg-gray-200/60 rounded-lg">
              <Lock className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Password</p>
              <p className="text-sm font-semibold text-gray-800">{getMaskedPassword(employee.password)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EmployeeCard;