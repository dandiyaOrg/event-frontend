// EventCard.jsx
import React from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

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
      className="group relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
      onClick={handleViewEvent}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex h-full">
        {/* Left Side - Event Image (1/3 width) */}
        {event.event_image && (
          <div className="relative w-1/3 overflow-hidden">
            <img 
              src={event.event_image} 
              alt={event.event_name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
            
            {/* Event Number Badge */}
            <div className="absolute top-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Event #{event.event_number}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Right Side - Content (2/3 width) */}
        <div className="flex-1 relative p-6 flex flex-col">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {event.event_name}
              </h3>
            </div>
            
            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              event.status === 'Confirmed' ? 'bg-green-500/90 text-white' :
              event.status === 'In Progress' ? 'bg-blue-500/90 text-white' :
              'bg-gray-500/90 text-white'
            }`}>
              {event.status}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {event.description}
            </p>
          </div>

          {/* Event Details with Icons */}
          <div className="space-y-4 mb-6 flex-1">
            {/* Dates */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Duration</div>
                  <div className="font-semibold text-gray-900">
                    {new Date(event.date_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(event.date_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Days</div>
                <div className="text-2xl font-bold text-blue-600">{event.number_of_days}</div>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Venue</div>
                <div className="font-semibold text-gray-900 truncate">{event.venue}</div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            {/* Event Form Link */}
            <a 
              href={event.event_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 group/link"
              onClick={(e) => e.stopPropagation()}
            >
              <span>View Event Form</span>
              <ExternalLink className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-200" />
            </a>
            
            {/* QR Code */}
            {event.event_qr && (
              <div className="relative">
                <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300">
                  <QRCode value={event.event_qr} size={48} />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      {/* Floating Action Hint */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
        <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
