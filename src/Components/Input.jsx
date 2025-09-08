import React from "react";
import { useSelector } from "react-redux";

const Input = ({ label, type = "text", value, onChange, placeholder, required }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div>
      <label
        className={`block mb-2 text-sm font-medium ${
          darkMode ? "text-gray-300" : "text-gray-900"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`bg-gray-50 border text-sm rounded-lg block w-full px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600
          ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              : "border-gray-300 text-gray-900 placeholder-gray-500"
          }
        `}
      />
    </div>
  );
};

export default Input;
