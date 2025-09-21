import React, { useState, useCallback, useEffect } from "react";
import {
  Calendar,
  Clock,
  Hash,
  Users,
  FileText,
  Image as ImageIcon,
  Tag,
  User,
  ArrowLeft,
  Save,
  X
} from "lucide-react";
import InputField from "../Components/InputField";
import CustomDatePicker from "../Components/CustomDatePicker";
import { TimePicker } from "../Components/TimePicker";
import { useNavigate, useParams } from "react-router-dom";
import { 
  useGetSubEventByIdQuery, 
  useUpdateSubEventMutation 
} from "../features/subEvents/subEventsApi";

function SubEventEditForm() {
  const navigate = useNavigate();
  const { eventId, subEventId } = useParams();
  const [errors, setErrors] = useState({});

  // RTK Query hooks
  const { data, error: fetchError, isLoading: isFetching } = useGetSubEventByIdQuery(subEventId);
  const [updateSubEvent, { isLoading: isUpdating }] = useUpdateSubEventMutation();

  // Extract subevent data
  const existingSubEvent = data?.data;

  const [eventDate, setEventDate] = useState(null);
  const eventStart = new Date("2025-09-23");
  const eventEnd = new Date("2025-10-01");

  const [formData, setFormData] = useState({
    name: "",
    event_id: eventId || "",
    date: "",
    start_time: "",
    end_time: "",
    day: "",
    quantity: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  // Pre-fill form when data is loaded
  useEffect(() => {
    if (existingSubEvent) {
      setFormData({
        name: existingSubEvent.name || "",
        event_id: existingSubEvent.event_id || eventId || "",
        date: existingSubEvent.date || "",
        start_time: existingSubEvent.start_time || "",
        end_time: existingSubEvent.end_time || "",
        day: existingSubEvent.day?.toString() || "",
        quantity: existingSubEvent.quantity?.toString() || "",
        description: existingSubEvent.description || "",
      });

      // Set event date for date picker
      if (existingSubEvent.date) {
        setEventDate(new Date(existingSubEvent.date));
      }

      // Set existing images
      if (existingSubEvent.images && Array.isArray(existingSubEvent.images)) {
        setExistingImages(existingSubEvent.images);
      }
    }
  }, [existingSubEvent, eventId]);

  // Loading state
  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sub-event details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (fetchError || !existingSubEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center max-w-md">
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sub Event Not Found</h2>
          <p className="text-red-600 mb-8">
            {fetchError?.data?.message || 'Could not load sub-event details for editing.'}
          </p>
          <button 
            onClick={() => navigate(`/events/${eventId}/subevents`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Back to Sub Events
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevData) => ({
        ...prevData,
        [name]: "",
      }));
    }
  };

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

  const handleDateChange = (selectedDate) => {
    setEventDate(selectedDate);
    // Format date for form data (YYYY-MM-DD)
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";
    setFormData((prevData) => ({
      ...prevData,
      date: formattedDate,
    }));
  };

const handleTimeChange = (timeType, timeValue) => {
  console.log("handleTimeChange called with:", timeType, timeValue);
  
  // Convert HH:MM to HH:MM:SS format for backend storage
  const formatToHHMMSS = (time) => {
    if (!time) return time;
    
    // If already in HH:MM:SS format, return as is
    if (time.length === 8 && time.match(/^\d{2}:\d{2}:\d{2}$/)) {
      return time;
    }
    
    // If in HH:MM format, add :00 for seconds
    if (time.length === 5 && time.match(/^\d{2}:\d{2}$/)) {
      return `${time}:00`;
    }
    
    return time;
  };
  
  const formattedTime = formatToHHMMSS(timeValue);
  
  // ✅ FIXED: Prevent infinite loops by checking if value actually changed
  setFormData((prevData) => {
    if (prevData[timeType] === formattedTime) {
      return prevData; // Return same object if no change
    }
    return {
      ...prevData,
      [timeType]: formattedTime,
    };
  });

  // Clear error when user changes time
  if (errors[timeType]) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [timeType]: "",
    }));
  }
};



  const removeExistingImage = (indexToRemove) => {
    setExistingImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.name.trim()) {
      newErrors.name = "Sub Event Name is required";
    }

    if (!formData.event_id) {
      newErrors.event_id = "Event ID is required";
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

    if (!formData.day) {
      newErrors.day = "Day is required";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    // Time validation
    if (formData.start_time && formData.end_time) {
      const startTime = new Date(`2000-01-01T${formData.start_time}`);
      const endTime = new Date(`2000-01-01T${formData.end_time}`);
      if (startTime >= endTime) {
        newErrors.end_time = "End time must be after start time";
      }
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

  try {
    // ✅ FIXED: Only send fields that have actually changed
    const updateData = {};

    // Compare with original data and only include changed fields
    if (formData.name !== existingSubEvent.name) {
      updateData.name = formData.name;
    }
    
    if (formData.date !== existingSubEvent.date) {
      updateData.date = formData.date;
    }
    
    // For times, ensure HH:MM:SS format
    const currentStartTime = formData.start_time ? (
      formData.start_time.length === 5 ? `${formData.start_time}:00` : formData.start_time
    ) : "";
    if (currentStartTime !== existingSubEvent.start_time) {
      updateData.start_time = currentStartTime;
    }
    
    const currentEndTime = formData.end_time ? (
      formData.end_time.length === 5 ? `${formData.end_time}:00` : formData.end_time
    ) : "";
    if (currentEndTime !== existingSubEvent.end_time) {
      updateData.end_time = currentEndTime;
    }
    
    // Only include day if it has changed
    if (parseInt(formData.day) !== existingSubEvent.day) {
      updateData.day = parseInt(formData.day);
    }
    
    if (parseInt(formData.quantity) !== existingSubEvent.quantity) {
      updateData.quantity = parseInt(formData.quantity);
    }
    
    if (formData.description !== existingSubEvent.description) {
      updateData.description = formData.description;
    }

    // Add image if new one is selected
    if (image) {
      updateData.image = image;
    }

    // If no changes were made, show message and don't submit
    if (Object.keys(updateData).length === 0) {
      setErrors({ submit: "No changes were made to update." });
      return;
    }

    console.log("Submitting only changed data:", updateData);

    await updateSubEvent({ 
      subeventId: subEventId, 
      subeventData: updateData 
    }).unwrap();

    // Success
    navigate(`/events/${eventId}/subevents/${subEventId}`, {
      state: {
        message: `Sub-event "${formData.name}" has been updated successfully!`,
      },
    });
  } catch (error) {
    console.error("Failed to update sub-event:", error);

    if (error?.data?.message) {
      setErrors({ submit: error.data.message });
    } else if (error?.data?.errors) {
      const errorMessages = error.data.errors;
      if (Array.isArray(errorMessages)) {
        setErrors({ submit: errorMessages.join(", ") });
      } else {
        setErrors(errorMessages);
      }
    } else {
      setErrors({ submit: "Failed to update sub-event. Please try again." });
    }
  }
};

// Add this before your return statement for debugging
console.log("Debug Info:", {
  formDataDay: formData.day,
  existingDay: existingSubEvent?.day,
  formDataDayType: typeof formData.day,
  existingDayType: typeof existingSubEvent?.day,
  areEqual: parseInt(formData.day) === existingSubEvent?.day
});



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate(`/events/${eventId}/subevents/${subEventId}`)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group px-3 py-2 rounded-lg hover:bg-white/50"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Details</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Edit Sub Event
              </h1>
              <p className="text-gray-600 mt-1">
                Update the details for "{existingSubEvent?.name}"
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Display submit error if exists */}
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6 rounded-lg">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm text-red-800 font-medium">
                    {errors.submit}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <User className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Basic Information
                </h3>
              </div>

              {/* Sub Event Name */}
              <InputField
                label="Sub Event Name"
                name="name"
                icon={Tag}
                placeholder="Enter sub event name"
                value={formData.name}
                handleChange={handleChange}
                errors={errors}
                required={true}
                variant="filled"
                helperText="Give your sub-event a memorable name"
              />
            </div>

            {/* Date & Time Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Date & Time
                </h3>
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CustomDatePicker
                    minDate={eventStart}
                    maxDate={eventEnd}
                    value={eventDate}
                    onChange={handleDateChange}
                    placeholder="Select event date"
                    className="w-1/2"
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                    <span>{errors.date}</span>
                  </p>
                )}
              </div>


{/* Time Pickers - FIXED */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Start Time <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <TimePicker
        label=""
        value={formData.start_time ? formData.start_time.substring(0, 5) : ""} // ✅ Show only HH:MM
        onChange={(time) => handleTimeChange("start_time", time)}
        placeholder="Select start time"
        disabled={isUpdating}
        className="w-full"
      />
    </div>
    {errors.start_time && (
      <p className="text-red-500 text-sm mt-1">
        {errors.start_time}
      </p>
    )}
    <p className="text-xs text-gray-500 mt-1">
      Current: {formData.start_time ? formData.start_time.substring(0, 5) : "Not set"}
    </p>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      End Time <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <TimePicker
        label=""
        value={formData.end_time ? formData.end_time.substring(0, 5) : ""} // ✅ Show only HH:MM
        onChange={(time) => handleTimeChange("end_time", time)}
        placeholder="Select end time"
        disabled={isUpdating}
        className="w-full"
      />
    </div>
    {errors.end_time && (
      <p className="text-red-500 text-sm mt-1">
        {errors.end_time}
      </p>
    )}
    <p className="text-xs text-gray-500 mt-1">
      Current: {formData.end_time ? formData.end_time.substring(0, 5) : "Not set"}
    </p>
  </div>
</div>


            </div>

            {/* Event Details Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <FileText className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Event Details
                </h3>
              </div>

              {/* Day and Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Day Number"
                  name="day"
                  type="number"
                  icon={Hash}
                  placeholder="Enter day number (e.g., 1, 2, 3)"
                  value={formData.day}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                  min="1"
                  variant="filled"
                  helperText="Which day of the event"
                />

                <InputField
                  label="Quantity/Capacity"
                  name="quantity"
                  type="number"
                  icon={Users}
                  placeholder="Enter quantity/capacity"
                  value={formData.quantity}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                  min="1"
                  variant="filled"
                  helperText="Maximum attendees"
                />
              </div>

              {/* Description */}
              <InputField
                label="Description"
                type="text"
                name="description"
                icon={FileText}
                placeholder="Enter detailed description of the sub event"
                value={formData.description}
                handleChange={handleChange}
                errors={errors}
                required={true}
                isTextarea={true}
                rows={5}
                variant="filled"
                helperText="Provide a comprehensive description"
              />
            </div>

            {/* Media Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <ImageIcon className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">Media</h3>
              </div>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Current Images
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {existingImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={imageUrl} 
                          alt={`Existing ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Add New Image <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="text-center">
                      <label
                        htmlFor="upload-image"
                        className="cursor-pointer inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg hover:shadow-xl"
                      >
                        <ImageIcon className="w-5 h-5 mr-2" />
                        Choose New Image
                      </label>
                      <input
                        type="file"
                        id="upload-image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        {image ? image.name : "PNG, JPG, JPEG up to 10MB"}
                      </p>
                    </div>
                  </div>

                  {/* New Image Preview */}
                  {imagePreview && (
                    <div className="mt-6 flex justify-center">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="New preview"
                          className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                    <span>{errors.image}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(`/events/${eventId}/subevents/${subEventId}`)}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                disabled={isUpdating}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>Update Sub Event</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubEventEditForm;
