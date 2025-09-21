// src/Components/analytics/AttendeesAnalytics.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { allAttendeesData } from '../../Data/AttendeeData.json';
import CustomTooltip from './CustomTooltip';
import CustomPieTooltip from './CustomPieTooltip';

const AttendeesAnalytics = () => {
  // Prepare data for charts
  const monthlyRegistrationsData = [
    { month: 'Jan', registrations: 2, confirmed: 2, pending: 0 },
    { month: 'Feb', registrations: 1, confirmed: 1, pending: 0 },
    { month: 'Mar', registrations: 5, confirmed: 4, pending: 1 },
    { month: 'Apr', registrations: 0, confirmed: 0, pending: 0 },
    { month: 'May', registrations: 0, confirmed: 0, pending: 0 },
    { month: 'Jun', registrations: 0, confirmed: 0, pending: 0 },
  ];

  const ticketTypeData = [
    { name: 'Premium', value: 3, color: '#4B5563' },
    { name: 'Standard', value: 3, color: '#6B7280' },
    { name: 'VIP', value: 1, color: '#374151' },
    { name: 'Family', value: 1, color: '#9CA3AF' },
  ];

  const attendeeStatusData = [
    { name: 'Confirmed', value: 7, color: '#10B981' },
    { name: 'Pending', value: 1, color: '#F59E0B' },
  ];

  const checkInRateData = [
    { event: 'Tech Conference', total: 3, checkedIn: 2, rate: 67 },
    { event: 'Product Launch', total: 2, checkedIn: 1, rate: 50 },
    { event: 'Marketing Workshop', total: 2, checkedIn: 1, rate: 50 },
    { event: 'Team Building', total: 1, checkedIn: 0, rate: 0 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Attendees Analytics
          </h1>
          <p className="text-slate-600 text-lg">Comprehensive insights into event attendance and engagement</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Attendees Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Attendees</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">8</p>
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5m-5-5v12" />
                </svg>
                <span className="text-green-600 font-medium">8% vs last month</span>
              </div>
            </div>
          </div>

          {/* Confirmed Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Confirmed</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">7</p>
              <p className="text-sm text-slate-500 font-medium">87.5% confirmation rate</p>
            </div>
          </div>

          {/* Checked In Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Checked In</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">4</p>
              <p className="text-sm text-blue-600 font-medium">50% check-in rate</p>
            </div>
          </div>

          {/* No Shows Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">No Shows</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">3</p>
              <p className="text-sm text-red-600 font-medium">37.5% no-show rate</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Monthly Registrations */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Monthly Registration Trend</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyRegistrationsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="registrations"
                      stroke="#6366F1"
                      fill="#6366F1"
                      fillOpacity={0.2}
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="confirmed"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.2}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Ticket Type Distribution */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Ticket Type Distribution</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ticketTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {ticketTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl">
                {ticketTypeData.map((entry, index) => (
                  <div key={index} className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div
                      className="w-3 h-3 rounded-full mr-2 shadow-sm"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm font-medium text-slate-700">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Check-in Rate by Event */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Check-in Rate by Event</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={checkInRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="event"
                      stroke="#64748B"
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="rate" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#D97706" stopOpacity={0.9}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Attendee Status */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Attendee Status Overview</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attendeeStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {attendeeStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Demographics Analysis */}
        <div className="group relative overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-2xl opacity-15 group-hover:opacity-20 transition duration-300 blur"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Attendee Demographics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">62%</p>
                  <p className="text-sm font-semibold text-slate-700">Corporate Professionals</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">25%</p>
                  <p className="text-sm font-semibold text-slate-700">Students/Academics</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">13%</p>
                  <p className="text-sm font-semibold text-slate-700">Entrepreneurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeesAnalytics;
