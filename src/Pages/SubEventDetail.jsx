import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User,
  Phone,
  Mail,
  Edit3,
  Trash2,
  Share2,
  Download,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Tag,
  FileText,
  Globe,
  Image as ImageIcon
} from 'lucide-react';
import { useGetSubEventByIdQuery, useDeleteSubEventMutation } from '../features/subEvents/subEventsApi';
import PassTable from '../Components/PassTable';

const SubEventDetail = () => {
  const { eventId, subEventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch subevent data from API
  const { data, error, isLoading } = useGetSubEventByIdQuery(subEventId);
  const [deleteSubEvent] = useDeleteSubEventMutation();

  // Extract subevent from API response or fallback to location state
  const subEvent = data?.data || location.state?.subEvent;

  // Format time to HH:MM
  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sub-event details...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !subEvent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sub Event Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error?.data?.message || 'The requested sub-event could not be found.'}
          </p>
          <button 
            onClick={() => navigate(`/events/${eventId}/subevents`)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Back to Sub Events
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (isActive) => {
    return isActive 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusIcon = (isActive) => {
    return isActive 
      ? <CheckCircle className="w-4 h-4" /> 
      : <XCircle className="w-4 h-4" />;
  };

  const getStatusText = (isActive) => {
    return isActive ? 'Active' : 'Inactive';
  };

  // Calculate availability percentage
  const availabilityPercentage = subEvent.quantity > 0 
    ? ((subEvent.available_quantity || subEvent.quantity) / subEvent.quantity) * 100 
    : 0;

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${subEvent.name}"?`)) {
      try {
        await deleteSubEvent(subEvent.subevent_id).unwrap();
        navigate(`/events/${eventId}/subevents`, {
          state: { message: 'Sub-event deleted successfully!' }
        });
      } catch (err) {
        console.error('Failed to delete sub-event:', err);
        alert('Failed to delete sub-event. Please try again.');
      }
    }
  };

  // Get event image
  const getEventImage = () => {
    if (subEvent.images && Array.isArray(subEvent.images) && subEvent.images.length > 0) {
      return subEvent.images[0];
    }
    return null;
  };

  const eventImage = getEventImage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200  shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(`/events/${eventId}/subevents`)} 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Sub Events</span>
              </button>
            </div>
            
            
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Enhanced Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          {/* Image Header */}
          {eventImage && (
            <div className="relative h-64 sm:h-80">
              <img 
                src={eventImage} 
                alt={subEvent.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold backdrop-blur-sm ${getStatusColor(subEvent.is_active)}`}>
                    {getStatusIcon(subEvent.is_active)}
                    {getStatusText(subEvent.is_active)}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                    Day {subEvent.day}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {subEvent.name}
                </h1>
              </div>
            </div>
          )}

          <div className="p-8">
            {!eventImage && (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium ${getStatusColor(subEvent.is_active)}`}>
                    {getStatusIcon(subEvent.is_active)}
                    {getStatusText(subEvent.is_active)}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                    Day {subEvent.day}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {subEvent.name}
                </h1>
              </>
            )}
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {subEvent.description || 'No description provided for this sub-event.'}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate(`/events/${eventId}/subevents/${subEvent.subevent_id}/edit`)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Sub Event</span>
              </button>
 
              <button 
                onClick={handleDelete}
                className="flex items-center space-x-2 border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Event Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Date</div>
                      <div className="text-gray-700 font-medium">
                        {new Date(subEvent.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-lg">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Time</div>
                      <div className="text-gray-700 font-medium">
                        {formatTime(subEvent.start_time)} - {formatTime(subEvent.end_time)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Capacity</div>
                      <div className="text-gray-700 font-medium">
                        {subEvent.quantity} participants maximum
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-lg">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Day Number</div>
                      <div className="text-gray-700 font-medium">
                        Day {subEvent.day}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Images Gallery */}
            {subEvent.images && subEvent.images.length > 1 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Event Images</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subEvent.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                      <img 
                        src={image} 
                        alt={`${subEvent.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Pass Table  */}
            <PassTable/>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Availability Status</h3>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-black text-blue-600 mb-2">
                  {subEvent.available_quantity || subEvent.quantity}
                </div>
                <div className="text-sm text-gray-600">
                  of {subEvent.quantity} available
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Availability</span>
                  <span>{Math.round(availabilityPercentage)}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3 border border-blue-200">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${availabilityPercentage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {subEvent.quantity}
                  </div>
                  <div className="text-xs text-gray-600">Total Capacity</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {subEvent.available_quantity || subEvent.quantity}
                  </div>
                  <div className="text-xs text-gray-600">Available Spots</div>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Event Details</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(subEvent.is_active)}`}>
                    {getStatusText(subEvent.is_active)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Created:</span>
                  <span className="text-gray-900">
                    {new Date(subEvent.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Last Updated:</span>
                  <span className="text-gray-900">
                    {new Date(subEvent.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-gray-600 font-medium block mb-1">Sub Event ID:</span>
                  <span className="text-gray-900 font-mono text-xs bg-gray-50 px-2 py-1 rounded break-all">
                    {subEvent.subevent_id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  

  );
};

export default SubEventDetail;
