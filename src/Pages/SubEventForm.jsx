import React, { useState, useCallback } from "react";
import {
  Calendar,
  Clock,
  Hash,
  Users,
  FileText,
  Image as ImageIcon,
  MapPin,
  Tag,
  User,
} from "lucide-react";
import InputField from "../Components/InputField";
import CustomDatePicker from "../Components/CustomDatePicker";
import { TimePicker } from "../Components/TimePicker";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateSubEventMutation } from "../features/subEvents/subEventsApi";

function App() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { eventId } = useParams();
  
  const [createSubEvent, { isLoading, isSuccess, isError, error }] =
    useCreateSubEventMutation();

  const [eventDate, setEventDate] = useState(null);
  const eventStart = new Date("2025-09-27");
  const eventEnd = new Date("2025-09-30");

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

  // ✅ HELPER FUNCTION: Convert HH:MM to HH:MM:SS format
const convertToHHMM = (timeString) => {
  if (!timeString) return "";

  // If already in HH:MM:SS → keep only HH:MM
  if (timeString.includes(":") && timeString.split(":").length === 3) {
    const [hh, mm] = timeString.split(":");
    return `${hh.padStart(2, "0")}:${mm.padStart(2, "0")}`;
  }

  // If already in HH:MM → normalize and return
  if (timeString.includes(":") && timeString.split(":").length === 2) {
    const [hh, mm] = timeString.split(":");
    return `${hh.padStart(2, "0")}:${mm.padStart(2, "0")}`;
  }

  // If only hours given → make HH:00
  if (/^\d{1,2}$/.test(timeString)) {
    return `${timeString.padStart(2, "0")}:00`;
  }

  return timeString; // fallback
};

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

  // ✅ FIXED: Handle time change with proper format conversion
  const handleTimeChange = useCallback((timeType, timeValue) => {
    console.log("handleTimeChange called with:", timeType, timeValue);
    
    // Convert to HH:MM:SS format
    const formattedTime = convertToHHMM(timeValue);
    
    setFormData((prevData) => {
      if (prevData[timeType] === formattedTime) {
        return prevData; // Return same object if no change
      }
      return {
        ...prevData,
        [timeType]: formattedTime,
      };
    });
  }, []);

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

    if (!image) {
      newErrors.image = "Sub Event Image is required";
    }

    // Time validation with proper format
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
      // ✅ FIXED: Ensure times are in HH:MM:SS format before submission
      const subeventData = {
        ...formData,
        start_time: convertToHHMM(formData.start_time),
        end_time: convertToHHMM(formData.end_time),
        image: image,
      };

      console.log("Submitting data:", subeventData); // Debug log

      await createSubEvent(subeventData).unwrap();

      // Success - redirect to events list
      navigate(`/events/${eventId}/subevents`, {
        state: {
          message: `Sub-event ${formData.name} has been created successfully!`,
        },
      });
    } catch (error) {
      console.error("Failed to create sub-event:", error);

      // Handle API errors
      if (error?.data?.message) {
        setErrors({ submit: error.data.message });
      } else if (error?.data?.errors) {
        // Handle array of error messages
        const errorMessages = error.data.errors;
        if (Array.isArray(errorMessages)) {
          setErrors({ submit: errorMessages.join(", ") });
        } else {
          setErrors(errorMessages);
        }
      } else {
        setErrors({ submit: "Failed to create sub-event. Please try again." });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
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

              {/* Time Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <TimePicker
                      key="start-time-picker"
                      value={formData.start_time ? formData.start_time.substring(0, 5) : ""} // Show only HH:MM in input
                      onChange={(time) => handleTimeChange("start_time", time)}
                      placeholder="Select start time"
                      className="w-1/2"
                    />
                  </div>
                  {errors.start_time && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.start_time}
                    </p>
                  )}
                  {/* Debug display */}
                  <p className="text-xs text-gray-500 mt-1">
                    Format: {formData.start_time || "Not set"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <TimePicker
                      key="end-time-picker"
                      value={formData.end_time ? formData.end_time.substring(0, 5) : ""} // Show only HH:MM in input
                      onChange={(time) => handleTimeChange("end_time", time)}
                      placeholder="Select end time"
                      className="w-1/2"
                    />
                  </div>
                  {errors.end_time && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.end_time}
                    </p>
                  )}
                  {/* Debug display */}
                  <p className="text-xs text-gray-500 mt-1">
                    Format: {formData.end_time || "Not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Rest of your form components remain the same... */}
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

              {/* Upload Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sub Event Image <span className="text-red-500">*</span>
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
                        Choose Image
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

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-6 flex justify-center">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
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
                          ×
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
                onClick={() => navigate(-1)}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                disabled={isLoading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Create Sub Event</span>
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

export default App;
