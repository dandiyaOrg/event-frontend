import React from "react";

const EventCard = ({
  eventNumber,
  eventName,
  startDate,
  endDate,
  venue,
  days,
  imageUrl,
  eventLink,
  description,
}) => {
  return (
    <div className="flex rounded-2xl shadow-lg bg-gray-100 p-6 w-full max-w-6xl">
      {/* Image Section */}
      <div className="w-1/4 flex items-center justify-center">
        <div className="w-full aspect-square rounded-xl bg-gray-300 flex items-center justify-center text-gray-500 text-2xl font-semibold overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Event"
              className="object-cover w-full h-full rounded-xl"
            />
          ) : (
            "Image"
          )}
        </div>
      </div>
      {/* Details Section */}
      <div className="w-3/4 pl-8 flex flex-col justify-between">
        {/* Top Info */}
        <div>
          <div className="text-xs text-gray-500 font-mono tracking-wider mb-1">
            EVENT NUMBER - {eventNumber}
          </div>
          <div className="text-2xl font-semibold text-gray-800 mb-3">
            {eventName}
          </div>
          <div className="flex flex-wrap gap-x-16 text-lg text-gray-600 mb-2">
            <div>Start date: 
              <br />
              <span className="text-gray-700 text-sm font-medium">{startDate}</span>
              </div>
            <div>End date:
              <br />
              <span className="text-gray-700 text-sm font-medium">{endDate}</span>
            </div>
            <div>
              Venue
              <br />
              <span className="text-gray-700 text-sm font-medium">{venue}</span>
            </div>
            <div>
              Number of days
              <br />
              <span className="text-gray-700 text-sm font-medium">{days}</span>
            </div>
          </div>
          <div className="text-sm mt-2 text-gray-600 mb-4">
            Event Link -{" "}
            <a
              href={eventLink}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {eventLink}
            </a>
          </div>
        </div>
        {/* Description */}
        <div className="mt-2 rounded-xl bg-gray-200 p-4">
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </div>
          <div className="text-gray-600 text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
