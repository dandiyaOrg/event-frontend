import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import BillingUserCard from '../Components/BillingUserCard';
import CustomizableTable from '../Components/CustomizableTable'; // Your original table
import { useGetAllBillingUsersForAdminQuery } from '../features/billingUser/BillingUserAPI';


const BillingUserData = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

const { data: billingUsers } = useGetAllBillingUsersForAdminQuery();

  // Find the billing user from the fetched data or location state
  const billingUser = location.state?.billingUser || billingUsers?.find(user => user.id === userId);

  // Sample orders data - replace with actual data fetching logic if needed
  const userOrders = billingUser?.orders || []; 
  // Define columns for orders table
  const orderColumns = [
    { key: 'id', label: 'Order ID' },
    { key: 'eventName', label: 'Event Name' },
    { key: 'orderDate', label: 'Order Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'attendees', label: 'Attendees' },
    { key: 'status', label: 'Status' },
  ];

  const initialOrderColumns = ['id', 'eventName', 'orderDate', 'amount', 'attendees', 'status'];

  const handleOrderRowClick = (order) => {
    navigate(`/orders/${order.id}`, { state: { order } });
  };



  if (!billingUser) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto pt-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h2>
            <p className="text-gray-600 mb-8">The requested billing user could not be found.</p>
            <button 
              onClick={() => navigate('/billingUsers')} 
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to Billing Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => navigate('/billingUsers')} 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Billing Users</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Billing User Details</h1>
        </div>

        {/* User Card */}
        <BillingUserCard billingUser={billingUser} />
        
        {/* Orders Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Order History</h2>
                <p className="text-gray-600">View all orders placed by this billing user</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{userOrders.length}</div>
                  <div className="text-gray-500">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{userOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-gray-500">Total Value</div>
                </div>
              </div>
            </div>
          </div>
          
          {userOrders.length > 0 ? (
            // Your Original Customizable Table - No changes
            <CustomizableTable
              data={userOrders}
              allColumns={orderColumns}
              initialColumns={initialOrderColumns}
              onRowClick={handleOrderRowClick}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600">This billing user hasn't placed any orders yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingUserData;
