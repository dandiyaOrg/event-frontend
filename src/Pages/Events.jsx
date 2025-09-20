import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../Components/EventCard';  
import { useGetEventsQuery } from '../features/events/eventsApi';

//Import mockData safely
import mockData from '../Data/MockData.json';

function Events() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Get events with safety checks
  const { data, error, isLoading } = useGetEventsQuery();
  console.log("Events Data:", data);
  const events = data?.data || [];
  
  //Simple search filter
  const filteredEvents = events.filter(event => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      event.name?.toLowerCase().includes(search) ||
      event.venue?.toLowerCase().includes(search)
    );
  });

  const handleAddEvent = () => {
    navigate('/events/new');
  };

  return (
    <div className="px-8 min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Events
        </h1>
        <p className="text-gray-600 mt-2">
          {events.length} total events
        </p>
      </div>

      {/* Controls
      <div className="flex justify-between items-center mb-8">
        <SearchBar
          placeholder="Search events..."
          className="w-60"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="border border-gray-400 bg-gray-200 text-gray-700 font-medium rounded-xl px-5 py-2 shadow hover:bg-gray-300 hover:border-gray-500 transition-all"
          onClick={handleAddEvent}
        >
          + New Event
        </button>
      </div> */}

      {/* Event Cards */}
      <div className="space-y-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.event_id} event={event} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'No events found' : 'No events yet'}
            </p>
            <button
              onClick={handleAddEvent}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
