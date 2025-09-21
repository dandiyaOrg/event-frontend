import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Search, Calendar, Users } from 'lucide-react';
import SubEventCard from './SubEventCard';
import { useGetAllSubeventsOfEventQuery, useDeleteSubEventMutation } from '../features/subEvents/subEventsApi';
import EventDetailCard from './EventDetailCard';

const SubEvent = () => {
  const { eventId } = useParams(); 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // RTK Query hooks
  const { data, error, isLoading } = useGetAllSubeventsOfEventQuery(eventId);
  const [deleteSubEvent] = useDeleteSubEventMutation();

  console.log("Fetched SubEvents Data:", data);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sub-events...</p>
        </div>
      </div>
    );
  }

  // Handle API errors
  const hasApiError = error && error.status !== 404;
  if (hasApiError) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sub Events</h2>
            <p className="text-gray-600 mt-1">Event #{eventId}</p>
          </div>
          
          <button
            onClick={() => navigate(`/events/${eventId}/subevents/new`)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>New Sub Event</span>
          </button>
        </div>

        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error Loading Sub Events
            </h3>
            <p className="text-red-600 mb-4">
              {error?.data?.message || error?.message || 'Failed to fetch sub-events. Please try again.'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ FIXED: Extract data correctly based on your API response structure
  const eventSubEvents = data?.data || []; // Your API returns { data: Array(1) }

  console.log("Extracted eventSubEvents:", eventSubEvents);
  console.log("Array check:", Array.isArray(eventSubEvents));
  console.log("Length:", eventSubEvents.length);

  // Filter subevents by search term
  const filteredSubEvents = eventSubEvents.filter(subEvent =>
    subEvent?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subEvent?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subEvent?.venue?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler functions
  const handleAddNewSubEvent = () => {
    navigate(`/events/${eventId}/subevents/new`);
  };

  const handleView = (subEvent) => {
    navigate(`/events/${eventId}/subevents/${subEvent.subevent_id}`, {
      state: { subEvent }
    });
  };

  const handleEdit = (subEvent) => {
    navigate(`/events/${eventId}/subevents/${subEvent.subevent_id}/edit`, {
      state: { subEvent }
    });
  };

  const handleDelete = async (subEvent) => {
    if (window.confirm(`Are you sure you want to delete "${subEvent.name}"?`)) {
      try {
        await deleteSubEvent(subEvent.subevent_id).unwrap();
        console.log('Sub-event deleted successfully');
      } catch (err) {
        console.error('Failed to delete sub-event:', err);
        alert('Failed to delete sub-event. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">

   
      {/* Header Section - Always show */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
  {/* Left Section - Title & Description */}
  <div className="space-y-2">
    {/* Breadcrumb */}
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
      <span>Dashboard</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
      <span>Events</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
      <span className="text-blue-600 font-medium">Sub Events</span>
    </nav>

    {/* Main Title */}
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          Sub Events
        </h1>
        <p className="text-gray-600 mt-1 flex items-center space-x-2">
          {eventSubEvents.length > 0 ? (
            <>
              <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                {filteredSubEvents.length} Events
              </span>
             
              
            </>
          ) : (
            <>
              <span className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
                No Events
              </span>
              <span className="text-gray-400">•</span>
              <span>Event #{eventId?.substring(0, 8)}...</span>
            </>
          )}
        </p>
      </div>
    </div>
  </div>
  
  {/* Right Section - Action Button */}
  <div className="flex items-center space-x-3">



    {/* Primary Action Button */}
    <button
      onClick={handleAddNewSubEvent}
      className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/25"
    >

      
      
      {/* Button content */}
      <div className="relative flex items-center space-x-2">
        <div className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-md group-hover:bg-white/30 transition-colors duration-200">
          <Plus className="w-3 h-3" />
        </div>
        <span>New Sub Event</span>
      </div>
      
      
    </button>

 
  </div>
</div>

      {/* Only show search and stats if there are subevents */}
      {eventSubEvents.length > 0 && (
       <>
  {/* Enhanced Search Bar */}
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
    </div>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search sub-events by name, description, or venue..."
      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
    />
    {/* Search enhancement indicator */}
    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </div>
  </div>

  {/* Enhanced Statistics Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Total Sub Events Card */}
    <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
        <div className="w-full h-full bg-blue-200 opacity-20 rounded-full"></div>
      </div>
      
      <div className="relative flex items-center">
        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Calendar className="w-7 h-7 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Total Sub Events</p>
          <p className="text-3xl font-black text-blue-900 group-hover:text-blue-800 transition-colors duration-300">
            {eventSubEvents.length}
          </p>
        </div>
      </div>
      
      {/* Animated border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>

    {/* Active Events Card */}
    <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
        <div className="w-full h-full bg-green-200 opacity-20 rounded-full"></div>
      </div>
      
      <div className="relative flex items-center">
        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
          <div className="relative">
            <Users className="w-7 h-7 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-semibold text-green-700 uppercase tracking-wider">Active Events</p>
          <p className="text-3xl font-black text-green-900 group-hover:text-green-800 transition-colors duration-300">
            {eventSubEvents.filter(e => e?.is_active !== false).length}
          </p>
        </div>
      </div>
      
      {/* Animated border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>

    {/* Total Capacity Card */}
    <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
        <div className="w-full h-full bg-purple-200 opacity-20 rounded-full"></div>
      </div>
      
      <div className="relative flex items-center">
        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
          <div className="relative">
            <Users className="w-7 h-7 text-white" />
            <svg className="absolute -top-2 -right-2 w-4 h-4 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Total Capacity</p>
          <p className="text-3xl font-black text-purple-900 group-hover:text-purple-800 transition-colors duration-300">
            {eventSubEvents.reduce((sum, e) => sum + (e?.quantity || 0), 0)}
          </p>
        </div>
      </div>
      
      {/* Animated border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>

    
  </div>
</>

      )}

      {/* Sub Events Grid or Empty State */}
      {filteredSubEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubEvents.map(subEvent => (
            <SubEventCard
              key={subEvent.subevent_id} // ✅ Use correct ID field
              subevent={subEvent}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No Sub Events Found' : 'No Sub Events Yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? `No sub-events match "${searchTerm}". Try a different search term.`
              : 'This event doesn\'t have any sub-events yet. Create one to get started!'
            }
          </p>
          
          <button
            onClick={handleAddNewSubEvent}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>
              {searchTerm ? 'Add New Sub Event' : 'Create First Sub Event'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SubEvent;
