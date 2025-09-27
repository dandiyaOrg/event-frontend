import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSubEventByIdQuery,
  useUpdateSubEventMutation
} from "../features/subEvents/subEventsApi";

function SubEventEditForm() {
  const navigate = useNavigate();
  const { eventId, subEventId } = useParams();
  
  // RTK Query hooks
  const { data, isLoading, error } = useGetSubEventByIdQuery(subEventId);
  const [updateSubEvent, { isLoading: isUpdating }] = useUpdateSubEventMutation();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    day: "",
    quantity: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  
  // Image state
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  // Initialize form when data loads
  useEffect(() => {
    if (data?.data) {
      const subEvent = data.data;
      setFormData({
        name: subEvent.name || "",
        date: subEvent.date || "",
        start_time: subEvent.start_time || "",
        end_time: subEvent.end_time || "",
        day: subEvent.day?.toString() || "",
        quantity: subEvent.quantity?.toString() || "",
        description: subEvent.description || ""
      });
      
      // Set existing images
      if (subEvent.images && Array.isArray(subEvent.images)) {
        setExistingImages(subEvent.images);
      }
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages(prev => 
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const removeNewImage = () => {
    setImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.start_time) {
      newErrors.start_time = "Start time is required";
    }
    if (!formData.end_time) {
      newErrors.end_time = "End time is required";
    }
    if (formData.start_time && formData.end_time && formData.start_time >= formData.end_time) {
      newErrors.end_time = "End time must be after start time";
    }
    if (!formData.day) {
      newErrors.day = "Day number is required";
    } else if (parseInt(formData.day) < 1) {
      newErrors.day = "Day number must be at least 1";
    }
    if (!formData.quantity) {
      newErrors.quantity = "Capacity is required";
    } else if (parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Capacity must be greater than 0";
    }
    
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  if (!data?.data) {
    setErrors({ submit: "Original sub-event data not loaded" });
    return;
  }

  const originalSubEvent = data.data;

  try {
    const changes = {};
    let hasChanges = false;

    // Check each field for changes
    if (formData.name !== originalSubEvent.name) {
      changes.name = formData.name;
      hasChanges = true;
    }

    if (formData.date !== originalSubEvent.date) {
      changes.date = formData.date;
      hasChanges = true;
    }

    const startTimeFormatted = formData.start_time.length === 5 ? `${formData.start_time}:00` : formData.start_time;
    const endTimeFormatted = formData.end_time.length === 5 ? `${formData.end_time}:00` : formData.end_time;

    if (startTimeFormatted !== originalSubEvent.start_time) {
      changes.start_time = startTimeFormatted;
      hasChanges = true;
    }

    if (endTimeFormatted !== originalSubEvent.end_time) {
      changes.end_time = endTimeFormatted;
      hasChanges = true;
    }

    const dayNumber = parseInt(formData.day);
    const quantityNumber = parseInt(formData.quantity);

    if (dayNumber !== originalSubEvent.day) {
      changes.day = dayNumber;
      hasChanges = true;
    }

    if (quantityNumber !== originalSubEvent.quantity) {
      changes.quantity = quantityNumber;
      hasChanges = true;
    }

    if (formData.description !== originalSubEvent.description) {
      changes.description = formData.description;
      hasChanges = true;
    }

    // If there's an image, use FormData
    if (image) {
      const submitFormData = new FormData(); // Changed variable name to avoid confusion
      
      // Add all changes to FormData
      Object.entries(changes).forEach(([key, value]) => {
        submitFormData.append(key, value);
      });
      
      submitFormData.append('image', image);
      
      // Debug: Check FormData contents
      console.log('FormData contents:');
      for (let [key, value] of submitFormData.entries()) {
        console.log(key, ':', value);
      }

      await updateSubEvent({
        subeventId: subEventId,
        subeventData: submitFormData
      }).unwrap();
    } else {
      // No image, check if we have other changes
      if (!hasChanges) {
        setErrors({ submit: "No changes were made to update." });
        return;
      }

      console.log('Sending JSON changes:', changes);

      // Use JSON for text-only updates
      await updateSubEvent({
        subeventId: subEventId,
        subeventData: changes
      }).unwrap();
    }

    navigate(`/events/${eventId}/subevents/${subEventId}`, {
      state: { message: "Sub-event updated successfully!" }
    });
  } catch (error) {
    console.error("Update error:", error);
    setErrors({
      submit: error?.data?.message || error?.data?.errors?.[0] || "Failed to update sub-event"
    });
  }
};




  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading sub-event</p>
          <button
            onClick={() => navigate(`/events/${eventId}/subevents`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Sub Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Sub Event</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sub Event Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter sub event name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Date and Day Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Day Number *
              </label>
              <input
                type="number"
                name="day"
                min="1"
                value={formData.day}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.day ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 1, 2, 3"
              />
              {errors.day && (
                <p className="text-red-500 text-sm mt-1">{errors.day}</p>
              )}
            </div>
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Time *
              </label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.start_time ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.start_time && (
                <p className="text-red-500 text-sm mt-1">{errors.start_time}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                End Time *
              </label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.end_time ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.end_time && (
                <p className="text-red-500 text-sm mt-1">{errors.end_time}</p>
              )}
            </div>
          </div>

          {/* Capacity Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Capacity/Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Maximum number of participants"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Sub Event Image
            </label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Images:</p>
                <div className="flex flex-wrap gap-3">
                  {existingImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Existing ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Image Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              
              {imagePreview ? (
                <div className="text-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto mb-3 max-h-32 object-cover rounded"
                  />
                  <div className="space-x-2">
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                    >
                      Change Image
                    </label>
                    <button
                      type="button"
                      onClick={removeNewImage}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-3">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Upload Image
                  </label>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter detailed description of the sub event"
            />
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Updating..." : "Update Sub Event"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(`/events/${eventId}/subevents/${subEventId}`)}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubEventEditForm;
