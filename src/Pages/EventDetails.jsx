import { useParams } from "react-router-dom";
import EventDetailCard from "../Components/EventDetailCard";
import events from "../Data/Events.json";
import SearchBar from "../Components/SearchBar";
import SubEvent from "../Components/SubEvent";

const EventDetails = () => {
  const { eventId } = useParams();
  const event = events.find((e) => String(e.eventNumber) === String(eventId));

  if (!event) {
    return (
      <div className="text-center py-10 text-gray-600">No event found!</div>
    );
  }

  const handleAddSubEvent = () => {
    // Logic to add a new event can be implemented here
    console.log("Add new event");
  };

  return (
    <div className=" bg-gray-50 flex flex-col items-center justify-center ">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl flex flex-row">
        <div className="flex-1 p-8">
          <div className="mb-4">
            <span
              className={
                "px-4 py-2 rounded-xl text-white font-semibold text-sm " +
                (event.status === "Active" ? "bg-green-500" : "bg-gray-400")
              }
            >
              STATUS: {event.status.toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold mb-6 tracking-wide">
            {event.eventName}
          </h1>
          <div className="space-y-3 text-md text-gray-700 font-mono">
            <div>
              <span className="font-bold">Start date</span> - {event.startDate}
            </div>
            <div>
              <span className="font-bold">End date</span> - {event.endDate}
            </div>
            <div>
              <span className="font-bold">Venue</span> - {event.venue}
            </div>
            <div>
              <span className="font-bold">Number of Days</span> - {event.days}{" "}
              Days
            </div>
            <div>
              <span className="font-bold">Type of Event</span> - {event.type}
            </div>
            <div>
              <span className="font-bold">Description</span> -{" "}
              {event.description}
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center min-h-[350px] p-6 bg-gray-100 rounded-r-2xl">
          {/* You can embed a map here, or keep a placeholder */}
          <div className="bg-white border-2 border-dashed border-gray-400 rounded-xl h-72 w-full flex items-center justify-center text-gray-500 text-lg font-bold">
            MAP
          </div>
        </div>
      </div>


      {/* SUBEVENT */}
 
     <SubEvent/>
    </div>
  );
};

export default EventDetails;
