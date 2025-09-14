// src/pages/OrderDetailsPage.jsx
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import OrderCard from '../Components/OrderCard';
import CustomizableTable from '../Components/CustomizableTable';
import mockData from '../Data/MockData.json';

const { ordersData, attendeesData } = mockData;

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order || 
    ordersData.find(order => order.id === orderId);

  const orderAttendees = attendeesData.filter(attendee => attendee.orderId === orderId);

  // Define columns for attendees table
  const attendeeColumns = [
    { key: 'id', label: 'Attendee ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'designation', label: 'Designation' },
    { key: 'company', label: 'Company' },
    { key: 'ticketType', label: 'Ticket Type' },
    { key: 'status', label: 'Status' },
    { key: 'registrationDate', label: 'Registration Date' },
  ];

  const initialAttendeeColumns = ['id', 'name', 'email', 'designation', 'company', 'ticketType', 'status'];

  const handleAttendeeRowClick = (attendee) => {
    console.log('Attendee clicked:', attendee);
    // You can navigate to attendee details page if needed
    // navigate(`/attendees/${attendee.id}`, { state: { attendee } });
  };

  const handleAttendeeEdit = (attendee) => {
    console.log('Edit attendee:', attendee);
    alert(`Edit attendee: ${attendee.name}`);
  };

  const handleAttendeeDelete = (attendee) => {
    console.log('Delete attendee:', attendee);
    if (window.confirm(`Are you sure you want to remove ${attendee.name} from this order?`)) {
      alert(`Removed attendee: ${attendee.name}`);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto pt-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
            <p className="text-gray-600 mb-8">The requested order could not be found.</p>
            <button 
              onClick={() => navigate('/orders')} 
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to Orders
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
              onClick={() => navigate('/orders')} 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Orders</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
        </div>

        {/* Order Card */}
        <OrderCard order={order} />
        
        {/* Attendees Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Event Attendees</h2>
                <p className="text-gray-600">List of all attendees registered for this event</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{orderAttendees.length}</div>
                  <div className="text-gray-500">Total Attendees</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {orderAttendees.filter(att => att.status === 'Confirmed').length}
                  </div>
                  <div className="text-gray-500">Confirmed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {orderAttendees.filter(att => att.status === 'Pending').length}
                  </div>
                  <div className="text-gray-500">Pending</div>
                </div>
              </div>
            </div>
          </div>
          
          {orderAttendees.length > 0 ? (
            <CustomizableTable
              data={orderAttendees}
              allColumns={attendeeColumns}
              initialColumns={initialAttendeeColumns}
              onRowClick={handleAttendeeRowClick}
              onEdit={handleAttendeeEdit}
              onDelete={handleAttendeeDelete}
              rowsPerPageOptions={[5, 10, 25]}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Attendees Found</h3>
              <p className="text-gray-600">No attendees have been registered for this order yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
