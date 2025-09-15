
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import AttendeeCard from '../Components/AttendeeCard';
import CustomizableTable from '../Components/CustomizableTable';
import mockData from '../Data/MockData.json';


const AttendeeDetailsPage = () => {
  const { attendeeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const attendee = location.state?.attendee || 
    allAttendeesData.find(attendee => attendee.id === attendeeId);


const { allAttendeesData, checkInData } = mockData;
  
  const attendeeCheckIns = checkInData.filter(checkIn => checkIn.attendeeId === attendeeId);

  // Define columns for check-in table
  const checkInColumns = [
    { key: 'id', label: 'Check-in ID' },
    { key: 'subEventName', label: 'Sub Event Name' },
    { key: 'checkInDate', label: 'Check-in Date' },
    { key: 'checkInTime', label: 'Check-in Time' },
    { key: 'employeeName', label: 'Employee Name' },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'gateNumber', label: 'Gate/Location' },
    { key: 'checkInType', label: 'Check-in Type' },
  ];

  const initialCheckInColumns = ['id', 'subEventName', 'checkInDate', 'checkInTime', 'employeeName', 'gateNumber', 'checkInType'];

  const handleCheckInRowClick = (checkIn) => {
    console.log('Check-in clicked:', checkIn);
    // You can add more functionality here if needed
  };

  const handleCheckInEdit = (checkIn) => {
    console.log('Edit check-in:', checkIn);
    alert(`Edit check-in: ${checkIn.subEventName}`);
  };

  const handleCheckInDelete = (checkIn) => {
    console.log('Delete check-in:', checkIn);
    if (window.confirm(`Are you sure you want to delete this check-in record?`)) {
      alert(`Deleted check-in: ${checkIn.subEventName}`);
    }
  };

  if (!attendee) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto pt-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Attendee Not Found</h2>
            <p className="text-gray-600 mb-8">The requested attendee could not be found.</p>
            <button 
              onClick={() => navigate('/attendee')} 
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Back to Attendees
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
              onClick={() => navigate('/attendee')} 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Attendees</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Attendee Details</h1>
        </div>

        {/* Attendee Card */}
        <AttendeeCard attendee={attendee} />
        
        {/* Check-in History Section */}
        <   div className="mt-8">
          
          
          {attendeeCheckIns.length > 0 ? (
            <CustomizableTable
              data={attendeeCheckIns}
              allColumns={checkInColumns}
              initialColumns={initialCheckInColumns}
              onRowClick={handleCheckInRowClick}
              onEdit={handleCheckInEdit}
              onDelete={handleCheckInDelete}
              rowsPerPageOptions={[5, 10, 25]}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Check-ins Found</h3>
              <p className="text-gray-600">This attendee hasn't checked in to any events yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetailsPage;
