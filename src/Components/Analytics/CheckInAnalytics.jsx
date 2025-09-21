// src/Components/analytics/CheckInsAnalytics.jsx
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
import { allAttendeesData,checkInData } from '../../Data/AttendeeData.json';
import CustomTooltip from './CustomTooltip';
import CustomPieTooltip from './CustomPieTooltip';

const CheckInsAnalytics = () => {
  // Prepare data for charts
  const dailyCheckInsData = [
    { date: '13 Sep', checkIns: 0, hour: '09:00' },
    { date: '14 Sep', checkIns: 0, hour: '09:00' },
    { date: '15 Sep', checkIns: 12, hour: '09:00' },
    { date: '16 Sep', checkIns: 0, hour: '09:00' },
    { date: '17 Sep', checkIns: 0, hour: '09:00' },
    { date: '18 Sep', checkIns: 0, hour: '09:00' },
  ];

  const hourlyCheckInsData = [
    { hour: '08:00', checkIns: 1 },
    { hour: '09:00', checkIns: 3 },
    { hour: '10:00', checkIns: 4 },
    { hour: '11:00', checkIns: 2 },
    { hour: '12:00', checkIns: 1 },
    { hour: '13:00', checkIns: 0 },
    { hour: '14:00', checkIns: 1 },
    { hour: '15:00', checkIns: 1 },
    { hour: '16:00', checkIns: 0 },
  ];

  const checkInTypeData = [
    { name: 'Entry', value: 4, color: '#4B5563' },
    { name: 'Session Entry', value: 4, color: '#6B7280' },
    { name: 'Meal', value: 1, color: '#9CA3AF' },
    { name: 'Workshop Entry', value: 2, color: '#374151' },
    { name: 'VIP Entry', value: 1, color: '#D1D5DB' },
  ];

  const gateUtilizationData = [
    { gate: 'Gate A', checkIns: 2, capacity: 50, utilization: 4 },
    { gate: 'Hall 1', checkIns: 2, capacity: 100, utilization: 2 },
    { gate: 'Dining Hall', checkIns: 1, capacity: 200, utilization: 0.5 },
    { gate: 'Workshop Room 2', checkIns: 1, capacity: 30, utilization: 3.3 },
    { gate: 'Hall 2', checkIns: 1, capacity: 150, utilization: 0.7 },
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-800 via-blue-700 to-indigo-600 bg-clip-text text-transparent mb-2">
            Check-ins Analytics
          </h1>
          <p className="text-slate-600 text-lg">Real-time insights into event access patterns and gate management</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Today's Check-ins Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Today's Check-ins</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">0</p>
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="text-red-600 font-medium">3% vs yesterday</span>
              </div>
            </div>
          </div>

          {/* Total Check-ins Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Check-ins</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">12</p>
              <p className="text-sm text-slate-500 font-medium">across all events</p>
            </div>
          </div>

          {/* Peak Hour Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Peak Hour</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">10:00 AM</p>
              <p className="text-sm text-blue-600 font-medium">4 check-ins</p>
            </div>
          </div>

          {/* Avg Check-in Time Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Avg Check-in Time</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">2.3 min</p>
              <p className="text-sm text-slate-500 font-medium">per attendee</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Daily Check-ins Trend */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Daily Check-ins Trend</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyCheckInsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="checkIns"
                      stroke="#0891B2"
                      fill="#0891B2"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Hourly Check-ins Pattern */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Hourly Check-ins Pattern</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hourlyCheckInsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="hour" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="checkIns" fill="url(#hourlyGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="hourlyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.9}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Check-in Type Distribution */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Check-in Type Distribution</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={checkInTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {checkInTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl">
                {checkInTypeData.map((entry, index) => (
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

          {/* Gate Utilization */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Gate Utilization</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gateUtilizationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="gate"
                      stroke="#64748B"
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="utilization" fill="url(#gateGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="gateGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EC4899" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#BE185D" stopOpacity={0.9}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Check-in Performance Metrics */}
        <div className="group relative overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-2xl opacity-15 group-hover:opacity-20 transition duration-300 blur"></div>
          <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Check-in Performance Metrics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">92%</p>
                  <p className="text-sm font-semibold text-slate-700">QR Code Success Rate</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">1.8 sec</p>
                  <p className="text-sm font-semibold text-slate-700">Average Scan Time</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">5</p>
                  <p className="text-sm font-semibold text-slate-700">Active Gates</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-violet-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">3</p>
                  <p className="text-sm font-semibold text-slate-700">Staff on Duty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInsAnalytics;
