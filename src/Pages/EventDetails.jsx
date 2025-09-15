import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import mockData from "../Data/MockData.json";
import SearchBar from "../Components/SearchBar";
import SubEvent from "../Components/SubEvent";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  // ✅ FIX: Use mockData instead of events.json
  const event = mockData.events?.find((e) => String(e.id) === String(eventId));
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

  const handleAddSubEvent = () => {
    navigate(`/events/${eventId}/subevents/new`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
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
              <h1 className="text-2xl font-bold text-gray-900">Event Details</h1>
              <p className="text-gray-600">{event.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Event Card */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-6">
  <div className="p-6">
    {/* Status Badge */}
    <div className="mb-4">
      <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
        event.status === "Confirmed" ? "bg-green-50 text-green-700" : 
        event.status === "In Progress" ? "bg-blue-50 text-blue-700" : 
        "bg-gray-50 text-gray-700"
      }`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${
          event.status === "Confirmed" ? "bg-green-500" : 
          event.status === "In Progress" ? "bg-blue-500" : "bg-gray-400"
        }`}></div>
        {event.status}
      </span>
    </div>
    
    {/* Event Title */}
    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      {event.name}
    </h1>
    
    {/* Basic Info Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="p-3 bg-gray-50 rounded-md">
        <div className="text-sm text-gray-600 mb-1">Start Date</div>
        <div className="font-medium text-gray-900">
          {new Date(event.startDate).toLocaleDateString()}
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-md">
        <div className="text-sm text-gray-600 mb-1">End Date</div>
        <div className="font-medium text-gray-900">
          {new Date(event.endDate).toLocaleDateString()}
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-md">
        <div className="text-sm text-gray-600 mb-1">Venue</div>
        <div className="font-medium text-gray-900">{event.venue}</div>
      </div>
      <div className="p-3 bg-gray-50 rounded-md">
        <div className="text-sm text-gray-600 mb-1">Duration</div>
        <div className="font-medium text-gray-900">
          {days} {days === 1 ? 'Day' : 'Days'}
        </div>
      </div>
    </div>

    {/* Registration Stats */}
    <div className="p-4 bg-blue-50 rounded-md mb-6">
      <h3 className="font-medium text-gray-900 mb-3">Registration Status</h3>
      <div className="flex justify-between text-center">
        <div>
          <div className="text-lg font-bold text-blue-600">{event.capacity}</div>
          <div className="text-sm text-gray-600">Capacity</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">{event.totalRegistrations}</div>
          <div className="text-sm text-gray-600">Registered</div>
        </div>
        <div>
          <div className="text-lg font-bold text-orange-600">
            {event.capacity - event.totalRegistrations}
          </div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
      </div>
    </div>

    {/* Ticket Types */}
    {event.ticketTypes && event.ticketTypes.length > 0 && (
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-2">Ticket Types</h3>
        <div className="flex flex-wrap gap-2">
          {event.ticketTypes.map((type, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded font-medium"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Description */}
    <div className="mb-6">
      <h3 className="font-medium text-gray-900 mb-2">Description</h3>
      <p className="text-gray-700 leading-relaxed">{event.description}</p>
    </div>

    {/* Event Manager */}
    {eventManager && (
      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Event Manager</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-medium text-sm">
              {eventManager.name.split(' ').map(n => n).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{eventManager.name}</div>
            <div className="text-sm text-gray-600">{eventManager.role}</div>
            <div className="text-sm text-gray-600">{eventManager.emailId}</div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>


        {/* Sub Events Section */}
        <div className="bg-white rounded-xl shadow-sm ">
          
          
          <div className="p-6">
            <SubEvent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
