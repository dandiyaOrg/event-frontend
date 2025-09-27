import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import mockData from "../Data/MockData.json";
import SubEvent from "../Components/SubEvent";
import { useGetEventByIdQuery } from "../features/events/eventsApi";
import GlobalPassTable from "../Components/GlobalPassTable";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  // ✅ FIX: Use mockData instead of events.json
  const { data, error, isLoading } = useGetEventByIdQuery(eventId);
  console.log("Fetched Event Data:", data);
  const event = data?.data;
  // const event = mockData.events?.find((e) => String(e.id) === String(eventId));
  // const subEvents = mockData.subEvents?.filter(sub => sub.eventId === eventId) || [];
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

  const handleAddSubEvent = () => {
    navigate(`/subevents/new`);
  };

  const handleCreateGlobalPass = () => {
    navigate(`/globalpass/create`, { state: eventId });
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
        <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl border border-gray-100 mb-8 overflow-hidden">
  {/* Header Gradient */}
  <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
  
  <div className="p-8">
    {/* Status Badge with Animation */}
    <div className="mb-6 flex justify-between items-center">
      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 ${
        event.status === "Confirmed" ? "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200" : 
        event.status === "In Progress" ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200" : 
        "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200"
      }`}>
        <div className={`w-3 h-3 rounded-full mr-3 animate-pulse ${
          event.status === "Confirmed" ? "bg-green-500 shadow-lg shadow-green-500/50" : 
          event.status === "In Progress" ? "bg-blue-500 shadow-lg shadow-blue-500/50" : 
          "bg-gray-400 shadow-lg shadow-gray-400/50"
        }`}></div>
        {event.status}
      </span>
      
      {/* Additional Info Badge */}
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
          {event.number_of_days} Day Event
        </span>
      </div>
    </div>
    
    {/* Event Title with Gradient Text */}
    <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-8 leading-tight">
      {event.event_name}
    </h1>
    
    {/* Enhanced Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="group p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="text-sm font-medium text-blue-700">Start Date</div>
        </div>
        <div className="text-lg font-bold text-blue-900">
          {new Date(event.date_start).toLocaleDateString('en-US', { 
            weekday: 'short',
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="group p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="text-sm font-medium text-green-700">End Date</div>
        </div>
        <div className="text-lg font-bold text-green-900">
          {new Date(event.date_end).toLocaleDateString('en-US', { 
            weekday: 'short',
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="group p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div className="text-sm font-medium text-purple-700">Venue</div>
        </div>
        <div className="text-lg font-bold text-purple-900 truncate" title={event.venue}>
          {event.venue}
        </div>
      </div>

      <div className="group p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="text-sm font-medium text-orange-700">Duration</div>
        </div>
        <div className="text-lg font-bold text-orange-900">
          {event.number_of_days} {event.number_of_days === 1 ? 'Day' : 'Days'}
        </div>
      </div>
    </div>

    

    {/* Enhanced Description Section */}
    <div className="relative">
      <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50"></div>
      <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Event Description</h3>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {event.description || 'No description provided for this event.'}
          </p>
        </div>
      </div>
    </div>

  
  </div>
</div>

     {/* Global Pass Section */}
<div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-2xl shadow-xl border border-blue-100/50 backdrop-blur-sm mb-8 group hover:shadow-2xl transition-all duration-500">
  {/* Animated Background Elements */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
  
  {/* Main Content */}
  <div className="relative z-10 p-8">
    {/* Header Section */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        {/* Icon Container */}
        <div className="relative">
          <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
            </svg>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        </div>
        
        {/* Title and Description */}
        <div>
          <h3 className="text-2xl font-black bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-1">
            Global Pass
          </h3>
          <p className="text-slate-600 font-medium text-sm">
            Create universal passes valid across all events
          </p>
        </div>
        <div>
          {/* Primary Create Button */}
        <button
          onClick={handleCreateGlobalPass}
          className="group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 border border-blue-500/20"
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          
          {/* Button Content */}
          <div className="relative flex items-center justify-center space-x-3">
            <svg className="w-6 h-6 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-lg">Create Global Pass</span>
            <div className="w-2 h-2 bg-white/60 rounded-full group-hover/btn:bg-white transition-colors duration-300"></div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover/btn:opacity-50 transition-opacity duration-300 -z-10"></div>
        </button>
        </div>
        
      </div>
    </div>
  
    
    <div className="flex flex-col sm:flex-row">
      <GlobalPassTable data={event.passes_list} />
    </div>

   
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
