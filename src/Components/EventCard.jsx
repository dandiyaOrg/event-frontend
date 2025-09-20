// EventCard.jsx
import React from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  if (!event) {
    return <div className="bg-white p-4 rounded-lg">No event data</div>;
  }

  const handleViewEvent = () => {
    navigate(`/events/${event.event_id}`);
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
      {event.event_image && (
        <img 
          src={event.event_image} 
          alt={event.event_name} 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h5 className="font-bold text-gray-500 mb-2">
            EVENT NUMBER - {event.event_number}
          </h5>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {event.event_name}
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
            {new Date(event.date_start).toLocaleDateString()}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Start Date</div>
          <div className="font-medium">
            {new Date(event.date_end).toLocaleDateString()}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Venue</div>
          <div className="font-medium text-sm">{event.venue}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Number of Days</div>
          <div className="font-medium">{event.number_of_days}</div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <a 
          href={event.event_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          View Event Form
        </a>
        {event.event_qr && (
          <div className="p-2 bg-white rounded">
            <QRCode value={event.event_qr} size={64} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
