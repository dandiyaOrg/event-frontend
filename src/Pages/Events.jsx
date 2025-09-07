import React from 'react';
import { Outlet,Link } from 'react-router-dom';
import EventCard from '../Components/EventCard';  
import events from '../Data/Events.json';         

function Events() {
  const handleAddEvent = () => {
    // function for add event (for future use)
    alert('Add New Event clicked!');
  };

  return (
    <div className="p-4">
     <div className="flex justify-between items-center mb-4">
  <h1 className="text-2xl font-bold">Events</h1>
  <button
    onClick={handleAddEvent}
    className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-400 transition"
  >
    Add New Event
  </button>
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Link key={event.id} to={`/events/${event.id}`}>
            <EventCard
              image={event.image}
              title={event.title}
              date={event.date}
              time={event.time}
              venue={event.venue}
              location={event.location}
              price={event.price}
              organizer={event.organizer}
              description={event.description}
            />
          </Link>
        ))}
      </div>

     
    </div>
  );
}

export default Events;
