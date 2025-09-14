// src/components/analytics/RevenueAnalytics.jsx
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
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">₹4.1L</p>
          <p className="text-sm text-green-600">↑ 15% vs last month</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg Order Value</h3>
          <p className="text-2xl font-bold text-gray-900">₹81,400</p>
          <p className="text-sm text-gray-500">per order</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Outstanding</h3>
          <p className="text-2xl font-bold text-gray-900">₹77,000</p>
          <p className="text-sm text-red-600">2 pending payments</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Collection Rate</h3>
          <p className="text-2xl font-bold text-gray-900">81%</p>
          <p className="text-sm text-blue-600">this month</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue vs Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#D1D5DB"
                fill="#D1D5DB"
                fillOpacity={0.3}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6B7280"
                fill="#6B7280"
                fillOpacity={0.5}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Event Type */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Event Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#6B7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Growth */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6B7280"
                strokeWidth={3}
                dot={{ fill: '#6B7280', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#374151' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status Distribution</h3>
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
              <Tooltip
                content={<CustomPieTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Financial Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">₹515</p>
            <p className="text-sm text-gray-600">Revenue per Attendee</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">23%</p>
            <p className="text-sm text-gray-600">Profit Margin</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">45 days</p>
            <p className="text-sm text-gray-600">Average Collection Period</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">₹12L</p>
            <p className="text-sm text-gray-600">Projected Annual Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
