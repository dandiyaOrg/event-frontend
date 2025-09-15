import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import { toggleDarkMode } from '../features/UI/ThemeSlice';
import { toggleCollapse } from '../features/UI/CollapsedSlice'; 



const Navbar = ({ isClicked, setIsClicked }) => {

  const isCollapsed = useSelector((state) => state.collapsed.isCollapsed);

  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);
  const [showLogin, setShowLogin] = useState(false);

  // Conditional classes for light/dark mode
  const navClasses = `w-full shadow flex items-center justify-between px-6 py-1  ${
    darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
  } transition-all duration-300`;

  const buttonClasses = `text-xl cursor-pointer hover:text-gray-400 ${
    darkMode ? "text-gray-300" : "text-gray-600"
  }`;

  const loginButtonClasses = `font-medium px-4 py-1 border rounded hover:bg-gray-100 ${
    darkMode
      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
      : "border-gray-500 text-gray-800"
  }`;

  return (
    <>
      <nav className={navClasses}>
        <div className="flex items-center gap-6">
          <h1 className={`text-2xl font-bold tracking-wide ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
            EMS
          </h1>
          <div className="hidden md:flex justify-center mb-4">
            <button
              onClick={() => dispatch(toggleCollapse())}

              className={`SidebarCollapsed mx-4 pt-4 justify-center items-center flex flex-col rounded  cursor-pointer `}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <FaBars className={`text-2xl ${darkMode ? "text-gray-200" : "text-gray-700"}`} />
              ) : (
                <FaBars className={`text-2xl ml-28 ${darkMode ? "text-gray-200" : "text-gray-700"}`} />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={buttonClasses}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
          <button className={buttonClasses} aria-label="Show notifications">
            <BsBell />
          </button>

         
            <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
    <span className={`${darkMode ? "text-gray-200" : "text-gray-800"} font-medium`}>
      {"User"}
    </span>
    <img
      src={"https://randomuser.me/api/portraits/men/1.jpg"} // fallback avatar
      alt="User"
      className="w-8 h-8 rounded-full object-cover"
    />
  </Link>

        </div>
      </nav>

      {showLogin && (
        <ProfilePopup onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </>
  );
};

export default Navbar;
