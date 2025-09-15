import React from "react";
import InputField from "../Components/Input";
import CustomDatePicker from "../Components/CustomDatePicker";
import { TimePicker } from "../Components/TimePicker";
import { useNavigate } from "react-router-dom";



function App() {

  const [eventName, setEventName] = React.useState("");
    const navigate=useNavigate();
  return (
    <div className=" p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Create New Sub Event</h2>
      
      <form className="flex flex-col gap-6">
        
        {/* Event Name */}
        <InputField
        label="Sub Event Name"
        id="event-name"
        placeholder="Enter Sub event name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
          width="w-1/2"

      />
        
        {/* Dates & Number of Days */}
        <CustomDatePicker/>


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
          <span className="text-gray-500 text-sm italic">No file chosen</span> {/* You can update this dynamically */}
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
         className=""
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
         className=""
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
}

export default App;
