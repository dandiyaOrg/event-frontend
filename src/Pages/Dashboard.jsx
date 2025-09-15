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
      color: "bg-blue-600",
      action: () => navigate("/events/new"),
    },
    {
      title: "Add Attendee",
      icon: Users,
      color: "bg-green-600",
      action: () => navigate("/attendee"),
    },
    {
      title: "New Order",
      icon: CreditCard,
      color: "bg-purple-600",
      action: () => navigate("/orders"),
    },
    {
      title: "View Analytics",
      icon: TrendingUp,
      color: "bg-orange-600",
      action: () => navigate("/analytics"),
    },
  ];

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color = "blue",
    onClick,
  }) => (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div
              className={`flex items-center mt-2 ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span className="text-sm font-medium ml-1">{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, icon: Icon, color, action }) => (
    <div
      onClick={action}
      className={`${color} hover:opacity-90 text-white p-6 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-white/80 text-sm">Click to get started</p>
        </div>
        <Icon className="w-8 h-8" />
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back! Here's what's happening with your events.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {currentTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>View Reports</span>
              </button>
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Quick Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Events"
            value={totalEvents}
            icon={Calendar}
            trend="up"
            trendValue="12% vs last month"
            color="blue"
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
            color="green"
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
            color="purple"
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
            color="orange"
            onClick={() =>
              setAnalyticsModal({
                isOpen: true,
                type: "checkins",
                title: "Check-ins",
              })
            }
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Events
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {activeEvents}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {completedEvents}
                </p>
              </div>
              <CalendarDays className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Orders
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingOrders}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Confirmed Attendees
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {confirmedAttendees}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Orders
                </h2>
                <button
                  onClick={() => navigate("/orders")}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
            </div>
            <div className="p-6">
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

          {/* Recent Activity Feed */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Check-ins
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentCheckIns.map((checkIn, index) => {
                  const attendee = allAttendeesData.find(
                    (att) => att.id === checkIn.attendeeId
                  );
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {attendee?.name || "Unknown"} checked into
                        </p>
                        <p className="text-sm text-blue-600 font-medium">
                          {checkIn.subEventName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {checkIn.checkInTime} • {checkIn.gateNumber} • by{" "}
                          {checkIn.employeeName}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(checkIn.checkInDate).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Upcoming Events
              </h2>
              <button
                onClick={() => navigate("/events")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All →
              </button>
            </div>
          </div>
          <div className="p-6">
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
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Upcoming Events
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first event to get started
                </p>
                <button
                  onClick={() => navigate("/events/new")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Create Event
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Top Performing Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Top Performing Events
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() =>
                      navigate(`/orders/${event.id}`, {
                        state: { order: event },
                      })
                    }
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {event.eventName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {event.attendees} attendees
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        ₹{event.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{event.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                System Overview
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Event Completion Rate
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {Math.round((completedEvents / totalEvents) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(completedEvents / totalEvents) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Attendee Confirmation Rate
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {Math.round((confirmedAttendees / totalAttendees) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (confirmedAttendees / totalAttendees) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Check-in Rate
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {Math.round(
                        (allAttendeesData.filter((att) => att.checkedIn)
                          .length /
                          totalAttendees) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
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

                <div className="pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {billingUsersData.length}
                      </p>
                      <p className="text-sm text-gray-600">Active Clients</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹
                        {Math.round(
                          totalRevenue / totalAttendees
                        ).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
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
