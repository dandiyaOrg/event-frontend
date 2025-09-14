// src/components/analytics/CheckInsAnalytics.jsx
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
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Today's Check-ins</h3>
          <p className="text-2xl font-bold text-gray-900">0</p>
          <p className="text-sm text-red-600">↓ 3% vs yesterday</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Check-ins</h3>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-500">across all events</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Peak Hour</h3>
          <p className="text-2xl font-bold text-gray-900">10:00 AM</p>
          <p className="text-sm text-blue-600">4 check-ins</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg Check-in Time</h3>
          <p className="text-2xl font-bold text-gray-900">2.3 min</p>
          <p className="text-sm text-gray-500">per attendee</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Check-ins Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Check-ins Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyCheckInsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="checkIns"
                stroke="#6B7280"
                fill="#6B7280"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Check-ins Pattern */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Check-ins Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyCheckInsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="checkIns" fill="#6B7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Check-in Type Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Check-in Type Distribution</h3>
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
              <Tooltip
                content={<CustomPieTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            {checkInTypeData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gate Utilization */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gate Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gateUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="gate"
                stroke="#6B7280"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="utilization" fill="#6B7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Check-in Performance Metrics */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Check-in Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">92%</p>
            <p className="text-sm text-gray-600">QR Code Success Rate</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">1.8 sec</p>
            <p className="text-sm text-gray-600">Average Scan Time</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-600">Active Gates</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Staff on Duty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInsAnalytics;
