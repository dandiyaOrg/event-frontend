import React from "react";
import { useSelector } from "react-redux";

const BioGraph = ({
  firstName,
  lastName,
  country,
  birthday,
  occupation,
  mobile,
  email,
  phone,
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const containerClasses = `rounded-b-lg shadow p-6 border-t-4 w-full h-full mx-auto ${
    darkMode ? "bg-gray-900 border-gray-700 text-gray-300" : "bg-white border-gray-300 text-gray-600"
  }`;

  const labelClasses = "min-w-[7rem]";

  return (
    <div className={containerClasses}>
      <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? "text-gray-200" : "text-gray-600"}`}>Bio Graph</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-3">
        <div className="flex">
          <span className={`${labelClasses} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>First Name</span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>: {firstName}</span>
        </div>
        <div className="flex">
          <span className={`${labelClasses} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Last Name</span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>: {lastName}</span>
        </div>
        <div className="flex">
          <span className={`${labelClasses} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Country</span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>: {country}</span>
        </div>
        <div className="flex">
          <span className={`${labelClasses} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Birthday</span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>: {birthday}</span>
        </div>
        <div className="flex">
          <span className={`${labelClasses} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Occupation</span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>: {occupation}</span>
        </div>
        <div className="flex">
          <span className={`${labelClasses} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email</span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>: {email}</span>
        </div>
        <div className="flex">
          <span className={`${labelClasses} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Mobile</span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>: {mobile}</span>
        </div>
        <div className="flex">
          <span className={`${labelClasses} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Phone</span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>: {phone}</span>
        </div>
      </div>
    </div>
  );
};

export default BioGraph;
