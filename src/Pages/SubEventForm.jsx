import React, { useState } from "react";
import InputField from "../Components/InputField";
import CustomDatePicker from "../Components/CustomDatePicker";
import { TimePicker } from "../Components/TimePicker";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateSubeventMutation } from "../features/events/eventsApi";

function App() {
  
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { eventId } = useParams();
  const [createSubevent, { isLoading, isSuccess, isError, error }] = useCreateSubeventMutation();

  const [eventDate, setEventDate] = useState(null);
  const eventStart = new Date("2025-09-23");
  const eventEnd = new Date("2025-10-01");
  
  const [formData, setFormData] = useState({
      name: '',
      event_id: eventId,
      date: '',
      start_time: '',
      end_time: '',
      day: '',
      quantity: '',
      description: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevData => ({
        ...prevData,
        [name]: ''
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

  const validateForm = () => {
    const newErrors = {};



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
      await createSubevent(formData).unwrap();
      // Success - redirect to employees list
      navigate('/employees', { 
        state: { 
          message: `Employee ${formData.name} has been added successfully!` 
        }
      });
    } catch (error) {
      console.error("Failed to create sub-event:", error);
      
      // Handle API errors
      if (error?.data?.message) {
        setErrors({ submit: error.data.message });
      } else if (error?.data?.errors) {
        // Handle validation errors from backend
        setErrors(error.data.errors);
      } else {
        setErrors({ submit: 'Failed to add employee. Please try again.' });
      }
    } 
  };

  return (
    <div className=" p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Create New Sub Event</h2>
      
      <form className="flex flex-col gap-6">
        
        {/* Event Name */}
        <InputField
          label="Sub Event Name"
          id="event-name"
          placeholder="Enter Sub event name"
          value={formData.name}
          onChange={(e) => {}}
          width="w-1/2"
        />
        
        <CustomDatePicker
          minDate={eventStart}
          maxDate={eventEnd}
          value={eventDate}
          onChange={setEventDate}
          placeholder="select event date"
        />

        {/* Time Picker  */}
        <TimePicker/>

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
          />
          <span className="text-gray-500 text-sm italic">No file chosen</span>
        </div>

        {/* Venue */}
        <InputField
          label="Venue"
          type="text"
          id="venue"
          placeholder="Enter event venue"
          value=""
          onChange={() => {}}
          width="w-1/2"
        />

       
        {/* Description */}
        <InputField
          label="Description"
          id="description"
          placeholder="Enter event description"
          value=""
          onChange={() => {}}
          isTextarea={true}
          rows={5}
          width=""
        />

       

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={(e) => navigate(-1)}
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
}

export default App;
