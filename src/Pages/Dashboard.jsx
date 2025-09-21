// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Users,
  CreditCard,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  DollarSign,
  Activity,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  BarChart3,
} from "lucide-react";
import CustomizableTable from "../Components/CustomizableTable";
import AnalyticsModal from "../Components/Analytics/AnalyticsModal";

import mockData from '../Data/MockData.json';

const { billingUsersData, ordersData, allAttendeesData, checkInData } = mockData;

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  //Add state for analytics modal
  const [analyticsModal, setAnalyticsModal] = useState({
    isOpen: false,
    type: "",
    title: "",
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate KPIs
  const totalEvents = ordersData.length;
  const totalAttendees = allAttendeesData.length;
  const totalRevenue = ordersData.reduce((sum, order) => sum + order.amount, 0);
  const checkedInToday = checkInData.filter(
    (checkIn) =>
      new Date(checkIn.checkInDate).toDateString() === new Date().toDateString()
  ).length;

  const activeEvents = ordersData.filter(
    (order) =>
      order.status === "In Progress" ||
      (new Date(order.eventDate) > new Date() && order.status === "Confirmed")
  ).length;

  const completedEvents = ordersData.filter(
    (order) => order.status === "Completed"
  ).length;
  const pendingOrders = ordersData.filter(
    (order) => order.status === "Pending"
  ).length;
  const confirmedAttendees = allAttendeesData.filter(
    (att) => att.status === "Confirmed"
  ).length;

  // Recent activities
  const recentOrders = ordersData
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5);

  const recentCheckIns = checkInData
    .sort(
      (a, b) =>
        new Date(b.checkInDate + " " + b.checkInTime) -
        new Date(a.checkInDate + " " + a.checkInTime)
    )
    .slice(0, 5);

  // Upcoming events
  const upcomingEvents = ordersData
    .filter((order) => new Date(order.eventDate) > new Date())
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
    .slice(0, 5);

  // Top performing events
  const topEvents = ordersData.sort((a, b) => b.amount - a.amount).slice(0, 5);

  // Quick action cards
  const quickActions = [
    {
      title: "Create New Event",
      icon: CalendarDays,
      gradient: "from-blue-500 to-blue-700",
      action: () => navigate("/events/new"),
    },
    {
      title: "Add Attendee",
      icon: Users,
      gradient: "from-emerald-500 to-emerald-700",
      action: () => navigate("/attendee"),
    },
    {
      title: "New Order",
      icon: CreditCard,
      gradient: "from-purple-500 to-purple-700",
      action: () => navigate("/orders"),
    },
    {
      title: "View Analytics",
      icon: TrendingUp,
      gradient: "from-indigo-500 to-indigo-700",
      action: () => navigate("/analytics"),
    },
  ];

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    gradient,
    onClick,
  }) => (
    <div
      className="group relative overflow-hidden bg-white rounded-3xl shadow-xl border border-slate-200 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          {trend && (
            <div
              className={`flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                trend === "up" 
                  ? "bg-emerald-100 text-emerald-700" 
                  : "bg-red-100 text-red-700"
              }`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-slate-600 font-semibold text-sm uppercase tracking-wide mb-2">{title}</p>
          <p className="text-4xl font-black text-slate-900 group-hover:text-blue-700 transition-colors duration-300">{value}</p>
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, icon: Icon, gradient, action }) => (
    <div
      onClick={action}
      className={`group relative overflow-hidden bg-gradient-to-br ${gradient} hover:shadow-2xl text-white p-8 rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-105`}
    >
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black mb-2">{title}</h3>
          <p className="text-white/80 font-medium">Click to get started</p>
        </div>
        <div className="p-3 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );

  // Table configurations
  const recentOrderColumns = [
    { key: "id", label: "Order ID" },
    { key: "eventName", label: "Event" },
    { key: "billingUserName", label: "Client" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
  ];

  const upcomingEventColumns = [
    { key: "id", label: "Event ID" },
    { key: "eventName", label: "Event Name" },
    { key: "eventDate", label: "Date" },
    { key: "attendees", label: "Attendees" },
    { key: "venue", label: "Venue" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-12">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-10 shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-black text-white tracking-tight">
                      Dashboard
                    </h1>
                    <p className="text-blue-100 text-xl font-semibold mt-2">
                      Event Management System
                    </p>
                  </div>
                </div>
                <p className="text-blue-100 font-medium mb-2">
                  Welcome back! Here's what's happening with your events.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold text-sm">Live Data</span>
                  </div>
                  
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Enhanced KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard
            title="Total Events"
            value={totalEvents}
            icon={Calendar}
            trend="up"
            trendValue="12% vs last month"
            gradient="from-blue-500 to-blue-700"
            onClick={() =>
              setAnalyticsModal({
                isOpen: true,
                type: "events",
                title: "Events",
              })
            }
          />
          <StatCard
            title="Total Attendees"
            value={totalAttendees.toLocaleString()}
            icon={Users}
            trend="up"
            trendValue="8% vs last month"
            gradient="from-emerald-500 to-emerald-700"
            onClick={() =>
              setAnalyticsModal({
                isOpen: true,
                type: "attendees",
                title: "Attendees",
              })
            }
          />
          <StatCard
            title="Total Revenue"
            value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
            icon={DollarSign}
            trend="up"
            trendValue="15% vs last month"
            gradient="from-purple-500 to-purple-700"
            onClick={() =>
              setAnalyticsModal({
                isOpen: true,
                type: "revenue",
                title: "Revenue",
              })
            }
          />
          <StatCard
            title="Today's Check-ins"
            value={checkedInToday}
            icon={UserCheck}
            trend="down"
            trendValue="3% vs yesterday"
            gradient="from-indigo-500 to-indigo-700"
            onClick={() =>
              setAnalyticsModal({
                isOpen: true,
                type: "checkins",
                title: "Check-ins",
              })
            }
          />
        </div>

        {/* Enhanced Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-bold text-sm uppercase tracking-wide mb-2">
                  Active Events
                </p>
                <p className="text-3xl font-black text-blue-600">
                  {activeEvents}
                </p>
              </div>
              <div className="p-4 bg-blue-100 rounded-2xl">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-bold text-sm uppercase tracking-wide mb-2">Completed</p>
                <p className="text-3xl font-black text-emerald-600">
                  {completedEvents}
                </p>
              </div>
              <div className="p-4 bg-emerald-100 rounded-2xl">
                <CalendarDays className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-bold text-sm uppercase tracking-wide mb-2">
                  Pending Orders
                </p>
                <p className="text-3xl font-black text-amber-600">
                  {pendingOrders}
                </p>
              </div>
              <div className="p-4 bg-amber-100 rounded-2xl">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-bold text-sm uppercase tracking-wide mb-2">
                  Confirmed Attendees
                </p>
                <p className="text-3xl font-black text-purple-600">
                  {confirmedAttendees}
                </p>
              </div>
              <div className="p-4 bg-purple-100 rounded-2xl">
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-blue-500 rounded-2xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Enhanced Recent Orders */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">
                      Recent Orders
                    </h2>
                    <p className="text-slate-300 font-medium">Latest transactions</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/orders")}
                  className="text-blue-300 hover:text-white font-bold transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>View All</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <CustomizableTable
                data={recentOrders}
                allColumns={recentOrderColumns}
                initialColumns={recentOrderColumns.map((col) => col.key)}
                onRowClick={(order) =>
                  navigate(`/orders/${order.id}`, { state: { order } })
                }
                rowsPerPageOptions={[17]}
              />
            </div>
          </div>

          {/* Enhanced Recent Activity Feed */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Recent Check-ins
                  </h2>
                  <p className="text-slate-300 font-medium">Live activity feed</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {recentCheckIns.map((checkIn, index) => {
                  const attendee = allAttendeesData.find(
                    (att) => att.id === checkIn.attendeeId
                  );
                  return (
                    <div
                      key={index}
                      className="group flex items-center space-x-4 p-6 hover:bg-blue-50 rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <UserCheck className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">
                          {attendee?.name || "Unknown"} checked into
                        </p>
                        <p className="font-bold text-blue-600">
                          {checkIn.subEventName}
                        </p>
                        <p className="text-sm text-slate-600 font-medium">
                          {checkIn.checkInTime} • {checkIn.gateNumber} • by{" "}
                          {checkIn.employeeName}
                        </p>
                      </div>
                      <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {new Date(checkIn.checkInDate).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Upcoming Events */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Upcoming Events
                  </h2>
                  <p className="text-slate-300 font-medium">Events scheduled ahead</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/events")}
                className="text-blue-300 hover:text-white font-bold transition-colors duration-300 flex items-center space-x-2"
              >
                <span>View All</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-8">
            {upcomingEvents.length > 0 ? (
              <CustomizableTable
                data={upcomingEvents}
                allColumns={upcomingEventColumns}
                initialColumns={upcomingEventColumns.map((col) => col.key)}
                onRowClick={(order) =>
                  navigate(`/orders/${order.id}`, { state: { order } })
                }
                rowsPerPageOptions={[17]}
              />
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  No Upcoming Events
                </h3>
                <p className="text-slate-600 mb-8 text-lg">
                  Create your first event to get started
                </p>
                <button
                  onClick={() => navigate("/events/new")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Create Event
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Top Performing Events */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Top Performing Events
                  </h2>
                  <p className="text-slate-300 font-medium">Highest revenue generators</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {topEvents.map((event, index) => (
                  <div
                    key={index}
                    className="group flex items-center space-x-6 p-6 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 rounded-2xl cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-purple-200"
                    onClick={() =>
                      navigate(`/orders/${event.id}`, {
                        state: { order: event },
                      })
                    }
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg font-black text-white">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-slate-900 text-lg">
                        {event.eventName}
                      </p>
                      <p className="font-semibold text-slate-600">
                        {event.attendees} attendees
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-emerald-600 text-xl">
                        ₹{event.amount.toLocaleString()}
                      </p>
                      <p className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {event.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced System Overview */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">
                    System Overview
                  </h2>
                  <p className="text-slate-300 font-medium">Performance metrics</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-700">
                      Event Completion Rate
                    </span>
                    <span className="font-black text-slate-900 text-lg">
                      {Math.round((completedEvents / totalEvents) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-4 rounded-full shadow-lg"
                      style={{
                        width: `${(completedEvents / totalEvents) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-700">
                      Attendee Confirmation Rate
                    </span>
                    <span className="font-black text-slate-900 text-lg">
                      {Math.round((confirmedAttendees / totalAttendees) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full shadow-lg"
                      style={{
                        width: `${
                          (confirmedAttendees / totalAttendees) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-700">
                      Check-in Rate
                    </span>
                    <span className="font-black text-slate-900 text-lg">
                      {Math.round(
                        (allAttendeesData.filter((att) => att.checkedIn)
                          .length /
                          totalAttendees) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full shadow-lg"
                      style={{
                        width: `${
                          (allAttendeesData.filter((att) => att.checkedIn)
                            .length /
                            totalAttendees) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                      <p className="text-3xl font-black text-blue-700">
                        {billingUsersData.length}
                      </p>
                      <p className="font-bold text-blue-600">Active Clients</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl">
                      <p className="text-3xl font-black text-emerald-700">
                        ₹
                        {Math.round(
                          totalRevenue / totalAttendees
                        ).toLocaleString()}
                      </p>
                      <p className="font-bold text-emerald-600">
                        Avg. Revenue/Attendee
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AnalyticsModal
            isOpen={analyticsModal.isOpen}
            onClose={() =>
              setAnalyticsModal({ isOpen: false, type: "", title: "" })
            }
            analyticsType={analyticsModal.type}
            title={analyticsModal.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
