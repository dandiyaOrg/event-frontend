
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomizableTable from '../Component/CustomizableTable';
import mockData from '../Data/MockData.json';

const Attendee = () => {
  const navigate = useNavigate();

  // Define all possible columns for the attendees table
  const allColumns = [
    { key: 'id', label: 'Attendee ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'designation', label: 'Designation' },
    { key: 'company', label: 'Company' },
    { key: 'eventName', label: 'Event Name' },
    { key: 'ticketType', label: 'Ticket Type' },
    { key: 'status', label: 'Status' },
    { key: 'checkedIn', label: 'Check-in Status' },
    { key: 'registrationDate', label: 'Registration Date' },
  ];

  // Initial visible columns
  const initialColumns = ['id', 'name', 'email', 'company', 'eventName', 'ticketType', 'status', 'checkedIn'];

  const handleRowClick = (attendee) => {
    navigate(`/attendee/${attendee.id}`, { state: { attendee } });
  };

  const handleEdit = (attendee) => {
    console.log('Edit attendee:', attendee);
    alert(`Edit attendee: ${attendee.name}`);
  };

  const handleDelete = (attendee) => {
    console.log('Delete attendee:', attendee);
    if (window.confirm(`Are you sure you want to delete ${attendee.name}?`)) {
      alert(`Deleted attendee: ${attendee.name}`);
    }
  };

// Assuming attendees is an array of attendee objects
const allAttendeesData = mockData.allAttendeesData || [];

  // Calculate stats
  const totalAttendees = allAttendeesData.length;
  const confirmedAttendees = allAttendeesData.filter(att => att.status === 'Confirmed').length;
  const checkedInAttendees = allAttendeesData.filter(att => att.checkedIn).length;
  const pendingAttendees = allAttendeesData.filter(att => att.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendee Management</h1>
              <p className="text-gray-600">Manage and track all event attendees</p>
            </div>
            
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                <p className="text-2xl font-bold text-gray-900">{totalAttendees}</p>
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
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{confirmedAttendees}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Checked In</p>
                <p className="text-2xl font-bold text-gray-900">{checkedInAttendees}</p>
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
                <p className="text-2xl font-bold text-gray-900">{pendingAttendees}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Attendees Table */}
        <CustomizableTable
          data={allAttendeesData}
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

export default Attendee;
