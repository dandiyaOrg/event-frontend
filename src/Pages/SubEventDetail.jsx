import React from "react";
import { useParams } from "react-router-dom";

// Replace with data fetch if needed
const demoEvent = {
  eventName: "",
  subEventName: "SUB EVENT NAME",
  date: "2025-09-10",
  startTime: "19:00",
  endTime: "00:00",
  venue: "Ashoka Garden",
  description: "A descriptive text about the sub event.",
  images: [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg"
  ]
};

function formatTime(time24) {
  const [h, m] = time24.split(":");
  const hour = ((parseInt(h) % 12) || 12).toString();
  const ampm = parseInt(h) >= 12 ? "PM" : "AM";
  return `${hour}:${m} ${ampm}`;
}

const SubEventDetail = () => {
  const { subEventId } = useParams();
  // In real app, fetch by id/subEventId

  const event = demoEvent;

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="mb-8">
        <div className="text-base text-gray-500 mb-1 font-mono tracking-wide">{event.eventName}</div>
        <div className="text-3xl font-bold mb-6 font-serif">{event.subEventName}</div>
        <div className="flex flex-wrap gap-8 mb-6">
          <div className="rounded-xl px-6 py-3 border font-mono text-lg text-gray-700 bg-gray-50">
            <div className="text-xs text-gray-400">Date</div>
            <div>{new Date(event.date).toLocaleDateString()}</div>
          </div>
          <div className="rounded-xl px-6 py-3 border font-mono text-lg text-gray-700 bg-gray-50">
            <div className="text-xs text-gray-400">Start Time</div>
            <div>{formatTime(event.startTime)}</div>
          </div>
          <div className="rounded-xl px-6 py-3 border font-mono text-lg text-gray-700 bg-gray-50">
            <div className="text-xs text-gray-400">End Time</div>
            <div>{formatTime(event.endTime)}</div>
          </div>
          <div className="rounded-xl px-6 py-3 border font-mono text-lg text-gray-700 bg-gray-50">
            <div className="text-xs text-gray-400">Venue</div>
            <div>{event.venue}</div>
          </div>
        </div>
        <div className="mb-8">
          <div className="font-semibold mb-1">Description -</div>
          <div className="text-gray-700">{event.description}</div>
        </div>
        <div>
          <div className="font-semibold mb-1">Images -</div>
          <div className="flex gap-6 mt-3">
            {event.images.map((src, idx) => (
              <div key={idx} className="w-48 h-36 rounded-xl overflow-hidden border bg-gray-100 flex items-center justify-center">
                <img src={src} alt={`event-img-${idx}`} className="object-cover w-full h-full"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubEventDetail;
