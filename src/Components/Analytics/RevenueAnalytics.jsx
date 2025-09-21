// src/Components/analytics/RevenueAnalytics.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { allAttendeesData} from '../../Data/AttendeeData.json';
import { ordersData } from '../../Data/BillingUserData.json';
import CustomTooltip from './CustomTooltip';
import CustomPieTooltip from './CustomPieTooltip';

const RevenueAnalytics = () => {
  // Calculate total revenue
  const totalRevenue = ordersData.reduce((sum, order) => sum + order.amount, 0);

  // Monthly revenue data
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 325000, target: 300000, orders: 2 },
    { month: 'Feb', revenue: 180000, target: 250000, orders: 1 },
    { month: 'Mar', revenue: 95600, target: 400000, orders: 1 },
    { month: 'Apr', revenue: 0, target: 500000, orders: 0 },
    { month: 'May', revenue: 0, target: 450000, orders: 0 },
    { month: 'Jun', revenue: 0, target: 500000, orders: 0 },
  ];

  // Revenue by event type
  const revenueByTypeData = [
    { name: 'Conference', revenue: 85000, color: '#4B5563' },
    { name: 'Corporate', revenue: 65000, color: '#6B7280' },
    { name: 'Workshop', revenue: 35000, color: '#9CA3AF' },
    { name: 'Wedding', revenue: 180000, color: '#374151' },
    { name: 'Team Building', revenue: 42000, color: '#D1D5DB' },
  ];

  // Payment status distribution
  const paymentStatusData = [
    { name: 'Paid', value: 3, color: '#10B981' },
    { name: 'Pending', value: 1, color: '#F59E0B' },
    { name: 'Overdue', value: 1, color: '#EF4444' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: ₹{entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-teal-600 bg-clip-text text-transparent mb-2">
            Revenue Analytics
          </h1>
          <p className="text-slate-600 text-lg">Comprehensive financial insights and revenue performance tracking</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">₹4.1L</p>
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5m-5-5v12" />
                </svg>
                <span className="text-green-600 font-medium">15% vs last month</span>
              </div>
            </div>
          </div>

          {/* Avg Order Value Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Avg Order Value</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">₹81,400</p>
              <p className="text-sm text-slate-500 font-medium">per order</p>
            </div>
          </div>

          {/* Outstanding Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Outstanding</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">₹77,000</p>
              <p className="text-sm text-red-600 font-medium">2 pending payments</p>
            </div>
          </div>

          {/* Collection Rate Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Collection Rate</h3>
              <p className="text-3xl font-bold text-slate-900 mb-2">81%</p>
              <p className="text-sm text-blue-600 font-medium">this month</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Monthly Revenue vs Target */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Monthly Revenue vs Target</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#D1D5DB"
                      fill="#D1D5DB"
                      fillOpacity={0.2}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.4}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Revenue by Event Type */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Revenue by Event Type</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByTypeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" fill="url(#typeGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="typeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.9}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Revenue Growth Trend */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Revenue Growth Trend</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                    <YAxis stroke="#64748B" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F59E0B"
                      strokeWidth={4}
                      dot={{ fill: '#F59E0B', strokeWidth: 3, r: 5 }}
                      activeDot={{ r: 8, fill: '#D97706', stroke: '#FBBF24', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-2xl opacity-20 group-hover:opacity-25 transition duration-300 blur"></div>
            <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg mr-4 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Payment Status Distribution</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 shadow-inner">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentStatusData.map((entry, index) => (
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

        {/* Financial Metrics */}
        <div className="group relative overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl opacity-15 group-hover:opacity-20 transition duration-300 blur"></div>
          <div className="relative bg-white/85 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Key Financial Metrics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">₹515</p>
                  <p className="text-sm font-semibold text-slate-700">Revenue per Attendee</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">23%</p>
                  <p className="text-sm font-semibold text-slate-700">Profit Margin</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">45 days</p>
                  <p className="text-sm font-semibold text-slate-700">Average Collection Period</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-violet-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                <div className="relative text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 mb-2">₹12L</p>
                  <p className="text-sm font-semibold text-slate-700">Projected Annual Revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
