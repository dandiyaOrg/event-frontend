// src/pages/Orders.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomizableTable from '../components/CustomizableTable';
import mockData from '../Data/MockData.json';

const { ordersData } = mockData;

const Orders = () => {
  const navigate = useNavigate();

  // Define all possible columns for the orders table
  const allColumns = [
    { key: 'id', label: 'Order ID' },
    { key: 'eventName', label: 'Event Name' },
    { key: 'billingUserName', label: 'Billing User' },
    { key: 'orderDate', label: 'Order Date' },
    { key: 'eventDate', label: 'Event Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'attendees', label: 'Attendees' },
    { key: 'status', label: 'Status' },
    { key: 'eventType', label: 'Event Type' },
    { key: 'venue', label: 'Venue' },
  ];

  // Initial visible columns
  const initialColumns = ['id', 'eventName', 'billingUserName', 'orderDate', 'amount', 'attendees', 'status'];

  const handleRowClick = (order) => {
    navigate(`/orders/${order.id}`, { state: { order } });
  };

  const handleEdit = (order) => {
    console.log('Edit order:', order);
    alert(`Edit order: ${order.eventName}`);
  };

  const handleDelete = (order) => {
    console.log('Delete order:', order);
    if (window.confirm(`Are you sure you want to delete order ${order.id}?`)) {
      alert(`Deleted order: ${order.eventName}`);
    }
  };

  // Calculate stats
  const totalRevenue = ordersData.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = ordersData.filter(order => order.status === 'Completed').length;
  const pendingOrders = ordersData.filter(order => order.status === 'Pending').length;
  const inProgressOrders = ordersData.filter(order => order.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
              <p className="text-gray-600">Manage and track all event orders</p>
            </div>
            
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{ordersData.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingOrders + inProgressOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Orders Table */}
        <CustomizableTable
          data={ordersData}
          allColumns={allColumns}
          initialColumns={initialColumns}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </div>
    </div>
  );
};

export default Orders;
