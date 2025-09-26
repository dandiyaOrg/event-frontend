import React, { useState, useEffect } from "react";
import {
  Calendar,
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

  const temp = data?.data;
  const existingSubEvent = temp

  const [eventDate, setEventDate] = useState(null);
  const eventStart = new Date("2025-09-28");
  const eventEnd = new Date("2025-09-30");

  const [formData, setFormData] = useState({
    name: "",
    event_id: eventId || "",
    date: "",
    start_time: "",
    end_time: "",
    day: "",
    quantity: "",
    description: ""
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  // Pre-fill form when data is loaded (only once per field)
  useEffect(() => {
    if (existingSubEvent) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || existingSubEvent.name || "",
        event_id: prev.event_id || existingSubEvent.event_id || eventId || "",
        date: prev.date || existingSubEvent.date || "",
        start_time: prev.start_time || existingSubEvent.start_time || "",
        end_time: prev.end_time || existingSubEvent.end_time || "",
        day: prev.day || existingSubEvent.day?.toString() || "",
        quantity: prev.quantity || existingSubEvent.quantity?.toString() || "",
        description: prev.description || existingSubEvent.description || ""
      }));

      if (existingSubEvent.date) {
        setEventDate(new Date(existingSubEvent.date));
      }

      if (existingSubEvent.images && Array.isArray(existingSubEvent.images)) {
        setExistingImages(existingSubEvent.images);
      }
    }
  }, [existingSubEvent?.id]);

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sub Event Not Found
          </h2>
          <p className="text-red-600 mb-8">
            {fetchError?.data?.message ||
              "Could not load sub-event details for editing."}
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
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prevData) => ({
        ...prevData,
        [name]: ""
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (selectedDate) => {
    setEventDate(selectedDate);
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";
    setFormData((prevData) => ({
      ...prevData,
      date: formattedDate
    }));
  };

  const handleTimeChange = (timeType, timeValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [timeType]: timeValue
    }));

    if (errors[timeType]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [timeType]: ""
      }));
    }
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Sub Event Name is required";
    if (!formData.event_id) newErrors.event_id = "Event ID is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.start_time) newErrors.start_time = "Start time is required";
    if (!formData.end_time) newErrors.end_time = "End time is required";
    if (!formData.day) newErrors.day = "Day is required";
    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    // HH:MM string comparison
    if (formData.start_time && formData.end_time) {
      if (formData.start_time >= formData.end_time) {
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
      const updateData = {};

      if (formData.name !== existingSubEvent.name) {
        updateData.name = formData.name;
      }
      if (formData.date !== existingSubEvent.date) {
        updateData.date = formData.date;
      }
      if (formData.start_time !== existingSubEvent.start_time) {
        updateData.start_time = formData.start_time; // HH:MM only
      }
      if (formData.end_time !== existingSubEvent.end_time) {
        updateData.end_time = formData.end_time;
      }
      if (parseInt(formData.day) !== existingSubEvent.day) {
        updateData.day = parseInt(formData.day);
      }
      if (parseInt(formData.quantity) !== existingSubEvent.quantity) {
        updateData.quantity = parseInt(formData.quantity);
      }
      if (formData.description !== existingSubEvent.description) {
        updateData.description = formData.description;
      }
      if (image) {
        updateData.image = image;
      }

      if (Object.keys(updateData).length === 0) {
        setErrors({ submit: "No changes were made to update." });
        return;
      }

      console.log("Submitting only changed data:", updateData);

      await updateSubEvent({
        subeventId: subEventId,
        subeventData: updateData
      }).unwrap();

      navigate(`/events/${eventId}/subevents/${subEventId}`, {
        state: {
          message: `Sub-event "${formData.name}" has been updated successfully!`
        }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() =>
                navigate(`/events/${eventId}/subevents/${subEventId}`)
              }
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

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6 rounded-lg">
              <p className="text-sm text-red-800 font-medium">
                {errors.submit}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <User className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Basic Information
                </h3>
              </div>

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

            {/* Date & Time */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Date & Time
                </h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <CustomDatePicker
                  minDate={eventStart}
                  maxDate={eventEnd}
                  value={eventDate}
                  onChange={handleDateChange}
                  placeholder="Select event date"
                  className="w-1/2"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <TimePicker
                    value={formData.start_time}
                    onChange={(time) => handleTimeChange("start_time", time)}
                    placeholder="Select start time"
                    disabled={isUpdating}
                    className="w-full"
                  />
                  {errors.start_time && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.start_time}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <TimePicker
                    value={formData.end_time}
                    onChange={(time) => handleTimeChange("end_time", time)}
                    placeholder="Select end time"
                    disabled={isUpdating}
                    className="w-full"
                  />
                  {errors.end_time && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.end_time}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <FileText className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Event Details
                </h3>
              </div>

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

            {/* Media */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
                <ImageIcon className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">Media</h3>
              </div>

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
                      <p className="text-sm text-gray-600">
                        Drag & drop an image, or click below
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                      >
                        Upload Image
                      </label>
                    </div>
                    {imagePreview && (
                      <div className="mt-4 w-full">
                        <p className="text-xs text-gray-500 mb-2">
                          Preview of new image:
                        </p>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isUpdating}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-medium text-white shadow-lg transition-all duration-200 ${
                  isUpdating
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-[1.02]"
                }`}
              >
                <Save className="w-5 h-5" />
                <span>{isUpdating ? "Updating..." : "Update Sub Event"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubEventEditForm;
