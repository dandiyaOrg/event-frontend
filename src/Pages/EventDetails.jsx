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
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            {/* Left Content */}
            <div className="flex-1 p-8">
              <div className="mb-4">
                <span className={`px-4 py-2 rounded-xl text-white font-semibold text-sm ${
                  event.status === "Confirmed" ? "bg-green-500" : 
                  event.status === "In Progress" ? "bg-blue-500" : "bg-gray-400"
                }`}>
                  STATUS: {event.status.toUpperCase()}
                </span>
              </div>
              
              <h1 className="text-3xl font-extrabold mb-6 tracking-wide text-gray-900">
                {event.name}
              </h1>
              
              <div className="space-y-4 text-md text-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-bold text-gray-900">Start Date</span>
                    <div className="text-lg">{new Date(event.startDate).toLocaleDateString()}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-bold text-gray-900">End Date</span>
                    <div className="text-lg">{new Date(event.endDate).toLocaleDateString()}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-bold text-gray-900">Venue</span>
                    <div className="text-lg">{event.venue}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-bold text-gray-900">Duration</span>
                    <div className="text-lg">{days} {days === 1 ? 'Day' : 'Days'}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="font-bold text-gray-900">Capacity & Registration</span>
                  <div className="mt-2 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{event.capacity}</div>
                      <div className="text-sm text-gray-500">Total Capacity</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{event.totalRegistrations}</div>
                      <div className="text-sm text-gray-500">Registered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{event.capacity - event.totalRegistrations}</div>
                      <div className="text-sm text-gray-500">Available</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="font-bold text-gray-900">Ticket Types</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {event.ticketTypes?.map((type, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="font-bold text-gray-900">Description</span>
                  <div className="mt-2 text-gray-700 leading-relaxed">{event.description}</div>
                </div>

                {eventManager && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-bold text-gray-900">Event Manager</span>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {eventManager.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{eventManager.name}</div>
                        <div className="text-sm text-gray-500">{eventManager.role} • {eventManager.emailId}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Image/Map */}
            <div className="flex-1 flex justify-center items-center min-h-[400px] p-6 bg-gray-100">
              {event.image ? (
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="bg-white border-2 border-dashed border-gray-400 rounded-xl h-72 w-full flex flex-col items-center justify-center text-gray-500 text-lg font-bold">
                <div className="text-6xl mb-4">🗺️</div>
                <div>Event Location</div>
                <div className="text-sm font-normal text-gray-400 mt-2">{event.venue}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Events Section */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Sub Events</h2>
                <p className="text-gray-600 mt-1">{subEvents.length} sessions scheduled</p>
              </div>
              <button
                onClick={handleAddSubEvent}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add Sub Event
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <SubEvent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
