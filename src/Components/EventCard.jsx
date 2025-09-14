// EventCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  if (!event) {
    return <div className="bg-white p-4 rounded-lg">No event data</div>;
  }

  const handleViewEvent = () => {
    navigate(`/events/${event.id}`);
  };

  const handleViewSubEvents = (e) => {
    e.stopPropagation();
    navigate(`/events/${event.id}/subevents`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-all"
      onClick={handleViewEvent}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {event.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {event.description}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          event.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
          event.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {event.status}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Start Date</div>
          <div className="font-medium">
            {new Date(event.startDate).toLocaleDateString()}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Venue</div>
          <div className="font-medium text-sm">{event.venue}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Capacity</div>
          <div className="font-medium">{event.capacity}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Registrations</div>
          <div className="font-medium">{event.totalRegistrations}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {event.ticketTypes?.map((type, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleViewSubEvents}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sub-Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
