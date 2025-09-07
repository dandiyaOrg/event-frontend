import React from 'react';
import { useParams } from 'react-router-dom';
import events from '../data/events.json';  

const EventDetails = () => {
  const { eventId } = useParams();

  // Find the event that matches the eventId in URL
  const event = events.find(ev => ev.id === eventId);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10 text-center text-red-600">
        Event not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow mt-8">
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-64 object-cover rounded mb-6 shadow-lg"
      />
      <h1 className="text-4xl font-extrabold mb-4 text-blue-900">{event.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg mb-6">
        <div><strong>Date:</strong> {event.date}</div>
        <div><strong>Time:</strong> {event.time}</div>
        <div><strong>Venue:</strong> {event.venue}</div>
        <div><strong>Location:</strong> {event.location}</div>
        <div><strong>Price:</strong> {event.price}</div>
        <div><strong>Organizer:</strong> {event.organizer}</div>
      </div>
      <p className="text-gray-800 text-lg leading-relaxed">{event.description}</p>
    </div>
  );
};

export default EventDetails;
