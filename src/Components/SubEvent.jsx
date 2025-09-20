import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Search, Calendar, Users } from 'lucide-react';
import mockData from "../Data/MockData.json";
import SubEventCard from './SubEventCard';
import { useGetSubeventsByEventIdQuery } from '../features/events/eventsApi';

const { SubEvents } = mockData;

const SubEvent = () => {
  const { eventId } = useParams(); 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, isLoading } = useGetSubeventsByEventIdQuery(eventId);
  console.log("Fetched SubEvents Data:", data);

  // Filter sub-events by eventId
  const eventSubEvents = SubEvents.filter(subEvent => 
    String(SubEvents.eventId) === String(eventId)
  );

  // Further filter by search term
  const filteredSubEvents = eventSubEvents.filter(subEvent =>
    subEvent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subEvent.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subEvent.venue?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler functions
  const handleAddNewSubEvent = () => {
    navigate(`/events/${eventId}/subevents/new`);
  };

  const handleView = (subEvent) => {
    navigate(`/events/${eventId}/subevents/${subEvent.id}`, {
      state: { subEvent }
    });
  };

  const handleEdit = (subEvent) => {
    navigate(`/events/${eventId}/subevents/${subEvent.id}/edit`, {
      state: { subEvent }
    });
  };

  const handleDelete = (subEvent) => {
    if (window.confirm(`Are you sure you want to delete "${subEvent.name}"?`)) {
      console.log('Deleting sub-event:', subEvent.id);
      // Implement delete logic here
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sub Events</h2>
          <p className="text-gray-600 mt-1">
            {filteredSubEvents.length} sub-events found for event #{eventId}
          </p>
        </div>
        
        <button
          onClick={handleAddNewSubEvent}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>New Sub Event</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search sub-events by name, description, or venue..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Sub Events</p>
              <p className="text-xl font-bold text-gray-900">{eventSubEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active Events</p>
              <p className="text-xl font-bold text-gray-900">
                {eventSubEvents.filter(e => e.status !== 'cancelled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Capacity</p>
              <p className="text-xl font-bold text-gray-900">
                {eventSubEvents.reduce((sum, e) => sum + (e.capacity || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Registered</p>
              <p className="text-xl font-bold text-gray-900">
                {eventSubEvents.reduce((sum, e) => sum + (e.registrations || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Events Grid */}
      {filteredSubEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubEvents.map(SubEvents => (
            <SubEventCard
              key={SubEvents.id}
              subevent={SubEvents} // Pass the actual subEvent object
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          {/* <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" /> */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No Sub Events Found' : 'No Sub Events Yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? `No sub-events match "${searchTerm}". Try a different search term.`
              : 'This event doesn\'t have any sub-events yet. Create one to get started!'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddNewSubEvent}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Create First Sub Event</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SubEvent;
