import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Components/InputField';
import { 
  Calendar, 
  MapPin, 
  Globe, 
  FileText, 
  StickyNote, 
  Upload,
  Tag,
  User
} from 'lucide-react';

const EventDetailForm = ({ onClose, onSuccess }) => {
  const navigate = useNavigate();

  // Single state object for all form data [attached_file:1]
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    startDate: "",
    endDate: "",
    numberOfDays: "",
    venue: "",
    mapLink: "",
    description: "",
    extraNotes: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Generic handle change function [attached_file:1]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Image upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    
    if (image) {
      submitData.append('image', image);
    }

    try {
      // Replace with your actual API call
      console.log('Form Data:', formData);
      console.log('Image:', image);
      
      alert("Event created successfully!");
      onSuccess?.("Event created successfully!");
      navigate('/events');
      
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Create New Event</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Event Name */}
        <InputField
          label="Event Name"
          name="eventName"
          type="text"
          placeholder="Enter event name"
          value={formData.eventName}
          onChange={handleChange}
          width="w-1/2"
        />

        {/* Event Type */}
        <InputField
          label="Type of Event"
          name="eventType"
          type="text"
          placeholder="Enter event type (e.g., Conference, Workshop)"
          value={formData.eventType}
          onChange={handleChange}
          width="w-1/2"
        />

        {/* Date Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />

          <InputField
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />

          <InputField
            label="Number of Days"
            name="numberOfDays"
            type="number"
            placeholder="e.g., 3"
            value={formData.numberOfDays}
            onChange={handleChange}
          />
        </div>

        {/* Upload Image */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="upload-image"
            className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer text-gray-700 text-sm hover:bg-gray-400 transition"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="upload-image"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <span className="text-gray-500 text-sm italic">
            {image ? image.name : "No file chosen"}
          </span>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <img 
              src={imagePreview} 
              alt="Event preview" 
              className="w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        {/* Venue */}
        <InputField
          label="Venue"
          name="venue"
          type="text"
          placeholder="Enter event venue"
          value={formData.venue}
          onChange={handleChange}
          width="w-1/2"
        />

        {/* Google Map Link */}
        <InputField
          label="Google Map Link"
          name="mapLink"
          type="url"
          placeholder="https://maps.google.com/..."
          value={formData.mapLink}
          onChange={handleChange}
          width="w-1/2"
        />

        {/* Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter event description"
          value={formData.description}
          onChange={handleChange}
          isTextarea={true}
          rows={5}
        />

        {/* Extra Notes */}
        <InputField
          label="Extra Notes"
          name="extraNotes"
          placeholder="Any additional information"
          value={formData.extraNotes}
          onChange={handleChange}
          isTextarea={true}
          rows={5}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventDetailForm;
