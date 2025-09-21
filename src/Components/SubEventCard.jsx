import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
  Edit3,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

const SubEventCard = ({ subevent, onView, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    if (subevent.is_active === false) {
      return "bg-red-100 text-red-800";
    }
    switch (status?.toLowerCase()) {
      case "active":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Get the first image or use placeholder
  const getEventImage = () => {
    if (
      subevent.images &&
      Array.isArray(subevent.images) &&
      subevent.images.length > 0
    ) {
      return subevent.images[0];
    }
    return null;
  };

  const eventImage = getEventImage();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        {eventImage ? (
          <img
            src={eventImage}
            alt={subevent.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* Placeholder when no image */}
        <div
          className={`${
            eventImage ? "hidden" : "flex"
          } w-full h-full items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200`}
        >
          <div className="text-center">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm font-medium">No Image</p>
          </div>
        </div>

       

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${getStatusColor(
              subevent.status
            )}`}
          >
            {subevent.is_active === false ? "Inactive" : "Active"}
          </span>
        </div>

        {/* Day Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
            <span className="text-xs font-medium text-gray-600">Day</span>
            <p className="text-lg font-bold text-gray-900">{subevent.day}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
            {subevent.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {subevent.description ||
              "No description available for this sub-event."}
          </p>
        </div>

        {/* Event Info Grid */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg mr-3">
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <span className="font-medium">Date</span>
              <p className="text-gray-600">
                {new Date(subevent.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-lg mr-3">
              <Clock className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <span className="font-medium">Time</span>
              <p className="text-gray-600">
                {subevent.start_time?.substring(0, 5)} -{" "}
                {subevent.end_time?.substring(0, 5)}
              </p>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-50 rounded-lg mr-3">
              <Users className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex-1">
              <span className="font-medium">Capacity</span>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  {subevent.available_quantity || subevent.quantity}/
                  {subevent.quantity}
                </p>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        ((subevent.available_quantity || subevent.quantity) /
                          subevent.quantity) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onView(subevent)}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          View Details
        </button>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
    </div>
  );
};

export default SubEventCard;
