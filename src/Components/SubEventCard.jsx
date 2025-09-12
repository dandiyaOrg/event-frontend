import React from "react";
import { Link } from "react-router-dom";

const SubEventCard = ({
  subEventId,
  subEventName,
  eventNumber,
  date,
  image,
  description,
}) => {
  return (
    <Link to={`/events/${eventNumber}/${subEventId}`} className="block hover:shadow-xl transition-shadow duration-200">
      <div className="flex rounded-2xl shadow-lg bg-gray-100 p-6 w-full max-w-6xl">
        {/* Image Section */}
        <div className="w-1/4 flex items-center justify-center">
          <div className="w-full aspect-square rounded-xl bg-gray-300 flex items-center justify-center text-gray-500 text-2xl font-semibold overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={`SubEvent ${subEventId}`}
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
              SUB EVENT ID - {subEventId}
            </div>
            <div className="text-2xl font-semibold text-gray-800 mb-3">
            {subEventName}
          </div>
            <div className="text-lg font-semibold text-gray-800 mb-3">
              Date: <span className="font-normal">{date}</span>
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
    </Link>
  );
};

export default SubEventCard;
