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
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Events</h3>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-sm text-green-600">↑ 12% vs last month</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Completed</h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500">60% completion rate</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Active Events</h3>
          <p className="text-2xl font-bold text-gray-900">2</p>
          <p className="text-sm text-blue-600">Currently running</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Avg. Attendees</h3>
          <p className="text-2xl font-bold text-gray-900">159</p>
          <p className="text-sm text-gray-500">per event</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Events Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Events Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyEventsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="events"
                stroke="#6B7280"
                fill="#6B7280"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

     {/* Event Types Distribution */}
<div className="bg-white p-6 rounded-lg border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types Distribution</h3>
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
      <Tooltip
        content={<CustomPieTooltip />}
      />
    </PieChart>
  </ResponsiveContainer>
  <div className="flex flex-wrap gap-4 mt-4">
    {eventTypeData.map((entry, index) => (
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


        {/* Revenue by Event */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Event</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByEventData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#6B7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Event Status */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Status Overview</h3>
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
              <Tooltip
                content={<CustomPieTooltip />}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">87%</p>
            <p className="text-sm text-gray-600">Average Attendance Rate</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">₹82,000</p>
            <p className="text-sm text-gray-600">Average Revenue per Event</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">4.2</p>
            <p className="text-sm text-gray-600">Average Event Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsAnalytics;
