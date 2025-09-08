import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import events from '../Data/Events.json';  

const EventDetails = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { eventId } = useParams();

  // Find the event that matches the eventId in URL
  const event = events.find(ev => ev.id === eventId);

  if (!event) {
    return (
      <div className={`max-w-4xl mx-auto p-6 rounded shadow mt-10 text-center ${darkMode ? "bg-gray-800 text-red-400" : "bg-white text-red-600"}`}>
        Event not found.
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto p-8 rounded shadow-sm shadow-amber-50 mt-8 ${darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-900"}`}>
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-64 object-cover rounded mb-6 shadow-lg"
      />
      <h1 className={`text-4xl font-extrabold mb-4 ${darkMode ? "text-blue-400" : "text-blue-900"}`}>
        {event.title}
      </h1>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 text-lg mb-6 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
        <div><strong>Date:</strong> {event.date}</div>
        <div><strong>Time:</strong> {event.time}</div>
        <div><strong>Venue:</strong> {event.venue}</div>
        <div><strong>Location:</strong> {event.location}</div>
        <div><strong>Price:</strong> {event.price}</div>
        <div><strong>Organizer:</strong> {event.organizer}</div>
      </div>
      <p className={`${darkMode ? "text-gray-300" : "text-gray-800"} text-lg leading-relaxed`}>
        {event.description}
      </p>
    </div>
  );
};

export default EventDetails;
