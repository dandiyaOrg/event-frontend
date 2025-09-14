import React from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, Users, Calendar } from "lucide-react";

const SubEventCard = ({
  id,
  eventId,
  name,
  description,
  type,
  startTime,
  endTime,
  date,
  venue,
  capacity,
  attendeeCount,
  status,
  speakers = [],
  tags = [],
  isOptional,
  requiresRegistration
}) => {
  // ✅ Default image based on subevent type
  const getDefaultImage = (type) => {
    const imageMap = {
      'Keynote': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Workshop': 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Panel': 'https://images.unsplash.com/photo-1559223607-b4d0555ae1a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Demo': 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Registration': 'https://images.unsplash.com/photo-1515378791036-0648a814c963?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Break': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'Meal': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'default': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    };
    return imageMap[type] || imageMap.default;
  };

  const image = getDefaultImage(type);

  // ✅ Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // ✅ Type color mapping
  const getTypeColor = (type) => {
    const colors = {
      'Keynote': 'bg-purple-100 text-purple-800',
      'Workshop': 'bg-blue-100 text-blue-800',
      'Panel': 'bg-green-100 text-green-800',
      'Demo': 'bg-orange-100 text-orange-800',
      'Registration': 'bg-gray-100 text-gray-800',
      'Break': 'bg-yellow-100 text-yellow-800',
      'Meal': 'bg-pink-100 text-pink-800',
      'Session': 'bg-indigo-100 text-indigo-800',
      'Hands-on': 'bg-teal-100 text-teal-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.default;
  };

  return (
    <Link 
      to={`/subevent/${id}`} // ✅ Updated route to match your subevent detail page
      className="block hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
    >
      <div className="flex rounded-2xl shadow-lg bg-white border border-gray-200 overflow-hidden w-full">
        {/* Image Section */}
        <div className="w-1/4 relative">
          <div className="w-full h-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.src = getDefaultImage('default');
              }}
            />
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
            {/* Type Badge */}
            <div className="absolute bottom-3 left-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
                {type}
              </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-3/4 p-6 flex flex-col justify-between">
          {/* Top Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-500 font-mono tracking-wider">
                SUB EVENT ID - {id}
              </div>
              <div className="flex items-center gap-2">
                {isOptional && (
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
                    Optional
                  </span>
                )}
                {requiresRegistration && (
                  <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full font-medium">
                    Registration Required
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
              {name}
            </h3>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{startTime} - {endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{venue}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{attendeeCount} / {capacity}</span>
              </div>
            </div>

            {/* Speakers */}
            {speakers && speakers.length > 0 && (
              <div className="mb-3">
                <div className="text-sm font-medium text-gray-700 mb-1">Speakers:</div>
                <div className="flex flex-wrap gap-1">
                  {speakers.slice(0, 3).map((speakerId, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                    >
                      Speaker {speakerId}
                    </span>
                  ))}
                  {speakers.length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                      +{speakers.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {tags.slice(0, 4).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mt-4 bg-gray-50 rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-900 mb-2">
              Description
            </div>
            <div className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubEventCard;
