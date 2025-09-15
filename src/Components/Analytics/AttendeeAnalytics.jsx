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
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Attendees</h3>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-sm text-green-600">↑ 8% vs last month</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Confirmed</h3>
          <p className="text-2xl font-bold text-gray-900">7</p>
          <p className="text-sm text-gray-500">87.5% confirmation rate</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Checked In</h3>
          <p className="text-2xl font-bold text-gray-900">4</p>
          <p className="text-sm text-blue-600">50% check-in rate</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">No Shows</h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-red-600">37.5% no-show rate</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Registrations */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Registration Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRegistrationsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="registrations"
                stroke="#6B7280"
                fill="#6B7280"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="confirmed"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Ticket Type Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Type Distribution</h3>
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
              <Tooltip
                content={<CustomPieTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            {ticketTypeData.map((entry, index) => (
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

        {/* Check-in Rate by Event */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Check-in Rate by Event</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={checkInRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="event"
                stroke="#6B7280"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" fill="#6B7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendee Status */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendee Status Overview</h3>
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
              <Tooltip
                content={<CustomPieTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demographics Analysis */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendee Demographics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">62%</p>
            <p className="text-sm text-gray-600">Corporate Professionals</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">25%</p>
            <p className="text-sm text-gray-600">Students/Academics</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">13%</p>
            <p className="text-sm text-gray-600">Entrepreneurs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeesAnalytics;
