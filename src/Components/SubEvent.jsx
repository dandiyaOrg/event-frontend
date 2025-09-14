import React, { useState } from "react"; // ✅ FIX: Remove unused 'use' import, add useState
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import SubEventCard from "./SubEventCard";
import mockData from '../Data/MockData.json';

const { SubEventsData, events } = mockData; // ✅ ADD: Import events for main event info

const SubEvent = () => {
  const { eventId } = useParams();
  const [searchTerm, setSearchTerm] = useState(''); // ✅ ADD: Search functionality
  const navigate = useNavigate();

  // ✅ FIX: Filter subEvents using correct property name 'eventId'
  const filteredSubEvents = SubEventsData.filter(
    (subEvent) => String(subEvent.eventId) === String(eventId)
  );

  // ✅ ADD: Apply search filter
  const searchFilteredSubEvents = filteredSubEvents.filter(subEvent =>
    subEvent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subEvent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subEvent.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ ADD: Get main event details
  const mainEvent = events.find(event => event.id === eventId);

  const handleAddSubEvent = () => {
    navigate(`/events/${eventId}/subevents/new`); // ✅ FIX: More specific route
  };

  return (
    <div className="w-full border-t border-gray-300 mt-8 pt-8">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="p-8 space-y-8 w-full">
          {/* ✅ ADD: Main event info */}
          <div>
            <div className="text-sm text-gray-500 mb-1">
              {mainEvent ? `${mainEvent.name} - ${mainEvent.venue}` : 'Event'}
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Sub Events
            </h1>
            <p className="text-gray-600 mt-2">
              {filteredSubEvents.length} session{filteredSubEvents.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            <SearchBar 
              placeholder="Search sub events..." 
              className="w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // ✅ ADD: Search handler
            />
            <button
              className="border border-gray-400 bg-gray-200 text-gray-700 font-medium rounded-xl px-5 py-2 shadow hover:bg-gray-300 hover:border-gray-500 transition-all"
              onClick={handleAddSubEvent}
            >
              + New Sub Event
            </button>
          </div>

          {/* ✅ ADD: Sub Event Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-gray-900">{filteredSubEvents.length}</div>
              <div className="text-sm text-gray-500">Total Sessions</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-green-600">
                {filteredSubEvents.filter(s => s.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">
                {filteredSubEvents.filter(s => s.status === 'In Progress').length}
              </div>
              <div className="text-sm text-gray-500">In Progress</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-gray-900">
                {filteredSubEvents.reduce((sum, subEvent) => sum + subEvent.attendeeCount, 0)}
              </div>
              <div className="text-sm text-gray-500">Total Attendees</div>
            </div>
          </div>
        </div>

        {/* SubEvent Cards */}
        // In your SubEvent component
<div className="space-y-6">
  {searchFilteredSubEvents.map((subEvent) => (
    <SubEventCard 
      key={subEvent.id}
      id={subEvent.id}
      eventId={subEvent.eventId}
      name={subEvent.name}
      description={subEvent.description}
      type={subEvent.type}
      startTime={subEvent.startTime}
      endTime={subEvent.endTime}
      date={subEvent.date}
      venue={subEvent.venue}
      capacity={subEvent.capacity}
      attendeeCount={subEvent.attendeeCount}
      status={subEvent.status}
      speakers={subEvent.speakers}
      tags={subEvent.tags}
      isOptional={subEvent.isOptional}
      requiresRegistration={subEvent.requiresRegistration}
    />
  ))}
</div>

      </div>
    </div>
  );
};

export default SubEvent;
