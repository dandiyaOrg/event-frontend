import React, { use } from 'react';
import { IoMdSearch } from "react-icons/io";
import EventCard from '../Components/EventCard';  
import events from '../Data/Events.json'; 
import { Link, useNavigate, } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';

function Events() {
  const navigate=useNavigate();
  const handleAddEvent = () => {
    navigate('/events/new');
  };

  return (
    <div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Events</h1>
      </div>
      {/* Controls */}
      <div className="flex justify-between items-center">
        <SearchBar
          placeholder="Search events..."
          className="w-60"

        />
        <button
          className="border border-gray-400 bg-gray-200 text-gray-700 font-medium rounded-xl px-5 py-2 shadow hover:bg-gray-300 hover:border-gray-500 transition-all"
          onClick={handleAddEvent}
        >
          + New Event
        </button>
      </div>
      {/* Event Cards */}
      <div className="space-y-8">
        {events && events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.eventNumber} {...event} />
          ))
        ) : (
          <>
            <EventCard /> {/* fallback empty card, remove if not needed */}
            <EventCard />
          </>
        )}
      </div>
    </div>
  );
}

export default Events;
