import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react";
import mockData from '../Data/MockData.json';

const EventDetailCard = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  // ✅ Get event data from mockData
  const event = mockData.events?.find(e => e.id === eventId);
  const subEvents = mockData.subEvents?.filter(sub => sub.eventId === eventId) || [];
  const eventManager = mockData.employees?.find(emp => emp.id === event?.eventManagerId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  // ✅ Calculate event duration
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // ✅ Default event image
  const eventImage = event.image || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/events')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
              <p className="text-gray-600">Event Details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status & Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    event.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/events/${eventId}/subevents`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Sub-Events ({subEvents.length})
                  </button>
                  <button 
                    onClick={() => navigate(`/events/${eventId}/edit`)}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Edit Event
                  </button>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h2>
              
              {/* Event Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <Calendar className="w-5 h-5 text-blue-600 mb-2" />
                  <div className="text-sm text-gray-500">Start Date</div>
                  <div className="font-semibold">{startDate.toLocaleDateString()}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <Calendar className="w-5 h-5 text-blue-600 mb-2" />
                  <div className="text-sm text-gray-500">End Date</div>
                  <div className="font-semibold">{endDate.toLocaleDateString()}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <MapPin className="w-5 h-5 text-blue-600 mb-2" />
                  <div className="text-sm text-gray-500">Venue</div>
                  <div className="font-semibold">{event.venue}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <Clock className="w-5 h-5 text-blue-600 mb-2" />
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-semibold">{days} {days === 1 ? 'Day' : 'Days'}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Capacity & Registration</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Capacity:</span>
                      <span className="font-medium">{event.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Registered:</span>
                      <span className="font-medium">{event.totalRegistrations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Available:</span>
                      <span className="font-medium">{event.capacity - event.totalRegistrations}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-2">Ticket Types</div>
                  <div className="flex flex-wrap gap-2">
                    {event.ticketTypes?.map((type, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {eventManager && (
                <div className="mt-6 pt-6 border-t">
                  <div className="font-medium mb-2">Event Manager</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {eventManager.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{eventManager.name}</div>
                      <div className="text-sm text-gray-500">{eventManager.role}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Image */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <img 
                src={eventImage} 
                alt={event.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Event Gallery</h3>
                <p className="text-gray-600 text-sm">View event photos and highlights</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/events/${eventId}/attendees`)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border"
                >
                  <div className="font-medium">View Attendees</div>
                  <div className="text-sm text-gray-500">{event.totalRegistrations} registered</div>
                </button>
                <button 
                  onClick={() => navigate(`/events/${eventId}/checkins`)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border"
                >
                  <div className="font-medium">Check-ins</div>
                  <div className="text-sm text-gray-500">Manage attendee check-ins</div>
                </button>
                <button 
                  onClick={() => navigate(`/events/${eventId}/reports`)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border"
                >
                  <div className="font-medium">Reports</div>
                  <div className="text-sm text-gray-500">Event analytics & insights</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailCard;
