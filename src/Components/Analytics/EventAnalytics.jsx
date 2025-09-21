// src/Components/analytics/EventsAnalytics.jsx
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
  Area,
  AreaChart
} from 'recharts';
import { ordersData } from '../../Data/BillingUserData.json';
import CustomTooltip from './CustomTooltip';
import CustomPieTooltip from './CustomPieTooltip';

const EventsAnalytics = () => {
  // Prepare data for charts
  const monthlyEventsData = [
    { month: 'Jan', events: 2, completed: 2, pending: 0 },
    { month: 'Feb', events: 1, completed: 1, pending: 0 },
    { month: 'Mar', events: 3, completed: 1, pending: 2 },
    { month: 'Apr', events: 4, completed: 0, pending: 4 },
    { month: 'May', events: 2, completed: 0, pending: 2 },
    { month: 'Jun', events: 3, completed: 0, pending: 3 },
  ];

  const eventTypeData = [
    { name: 'Conference', value: 1, color: '#6B7280' },
    { name: 'Corporate', value: 1, color: '#9CA3AF' },
    { name: 'Workshop', value: 1, color: '#D1D5DB' },
    { name: 'Wedding', value: 1, color: '#4B5563' },
    { name: 'Team Building', value: 1, color: '#374151' },
  ];

  const eventStatusData = [
    { name: 'Completed', value: 3, color: '#10B981' },
    { name: 'In Progress', value: 1, color: '#3B82F6' },
    { name: 'Pending', value: 1, color: '#F59E0B' },
  ];

  const revenueByEventData = ordersData.map(order => ({
    name: order.eventName.substring(0, 15) + '...',
    revenue: order.amount,
    attendees: order.attendees,
  }));

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 bg-clip-text text-transparent mb-2">
            Events Analytics
          </h1>
          <p className="text-slate-600 text-lg">Comprehensive insights into event performance and management</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Events Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Events</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">5</p>
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5m-5-5v12" />
                </svg>
                <span className="text-green-600 font-medium">12% vs last month</span>
              </div>
            </div>
          </div>

          {/* Completed Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Completed</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">3</p>
              <p className="text-sm text-slate-500 font-medium">60% completion rate</p>
            </div>
          </div>

          {/* Active Events Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Active Events</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">2</p>
              <p className="text-sm text-blue-600 font-medium">Currently running</p>
            </div>
          </div>

          {/* Average Attendees Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Avg. Attendees</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">159</p>
              <p className="text-sm text-slate-500 font-medium">per event</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Monthly Events Trend */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Monthly Events Trend</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyEventsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="events"
                      stroke="#6366F1"
                      fill="#6366F1"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Event Types Distribution */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Event Types Distribution</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={eventTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {eventTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl">
                {eventTypeData.map((entry, index) => (
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

          {/* Revenue by Event */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Revenue by Event</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByEventData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="name"
                      stroke="#64748B"
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#059669" stopOpacity={0.9}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Event Status */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Event Status Overview</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={eventStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {eventStatusData.map((entry, index) => (
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

        {/* Detailed Metrics */}
        <div className="group relative overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-2xl opacity-15 group-hover:opacity-20 transition duration-300 blur"></div>
          <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Event Performance Metrics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">87%</p>
                  <p className="text-sm font-semibold text-slate-700">Average Attendance Rate</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">₹82,000</p>
                  <p className="text-sm font-semibold text-slate-700">Average Revenue per Event</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">4.2</p>
                  <p className="text-sm font-semibold text-slate-700">Average Event Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsAnalytics;
