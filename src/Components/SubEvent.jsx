import React, { use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import SubEventCard from "./SubEventCard";
import subEvents from "../Data/SubEvent.json";

const SubEvent = () => {
  const { eventId } = useParams();
  

  // Filter subEvents for the given eventId
  const filteredSubEvents = subEvents.filter(
    (subEvent) => String(subEvent.eventNumber) === String(eventId)
  );

  const navigate=useNavigate();
    const handleAddSubEvent = () => {
      navigate('/subEvents/new');
    };

  

  return (
    <div className="w-full border-t border-gray-300 mt-8 pt-8">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="p-8  space-y-8 w-full">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Sub Events
            </h1>
          </div>
          {/* Controls */}
          <div className="flex justify-between items-center">
            <SearchBar placeholder="Search sub events..." className="w-60" />
            <button
              className="border border-gray-400 bg-gray-200 text-gray-700 font-medium rounded-xl px-5 py-2 shadow hover:bg-gray-300 hover:border-gray-500 transition-all"
              onClick={handleAddSubEvent}
            >
              + New Sub Event
            </button>
          </div>
        </div>

        {/* SubEvent Cards */}
        <div className="space-y-8 w-full p-8">
          {filteredSubEvents && filteredSubEvents.length > 0 ? (
            filteredSubEvents.map((subEvent) => (
              <SubEventCard key={subEvent.subEventId} {...subEvent} />
            ))
          ) : (
            <p className="text-center text-gray-500">No sub events found for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubEvent;
