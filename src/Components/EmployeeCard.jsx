  import React from "react";
  import { useSelector } from "react-redux";
  import { MdOutlineMail, MdPhone, MdPerson, MdBadge } from "react-icons/md";

  const EmployeeCard = ({ image, name, role, email, mobile, description, onEdit, onDelete }) => {
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
      <div
        className={`rounded-lg shadow p-4 border mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md
          ${darkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}
        `}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-md mb-4"
        />
        <div className="space-y-3">
          <div className={`flex items-center gap-2 font-semibold text-lg ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            <MdPerson className="text-xl" />
            <span>{name}</span>
          </div>
          <div className={`flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <MdBadge className="text-lg" />
            <span>{role}</span>
          </div>
          <div className={`flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <MdOutlineMail className="text-lg" />
            <a
              href={`mailto:${email}`}
              className="hover:underline text-blue-600 break-words"
            >
              {email}
            </a>
          </div>
          <div className={`flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <MdPhone className="text-lg" />
            <a href={`tel:${mobile}`} className="hover:underline text-blue-600">
              {mobile}
            </a>
          </div>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm leading-relaxed`}>
            {description}
          </p>
        </div>

        {/* Buttons container */}
        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={onEdit}
            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition"
            aria-label="Edit employee"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition"
            aria-label="Delete employee"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  export default EmployeeCard;
