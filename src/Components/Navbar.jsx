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

  // Enhanced classes for blue palette design
  const navClasses = `w-full shadow-xl backdrop-blur-lg border-b-2 flex items-center justify-between px-8 py-4 ${
    darkMode 
      ? "bg-slate-900/95 text-blue-100 border-slate-700/50 shadow-slate-900/50" 
      : "bg-white/95 text-slate-800 border-blue-200/50 shadow-blue-500/10"
  } transition-all duration-500 ease-in-out sticky top-0 z-50`;

  const buttonClasses = `text-xl cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 p-3 rounded-xl ${
    darkMode 
      ? "text-blue-300 hover:text-white hover:bg-slate-800/50 hover:shadow-lg hover:shadow-blue-500/20" 
      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-200/30"
  }`;

  const profileClasses = `flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
    darkMode
      ? "hover:bg-slate-800/50 border-2 border-slate-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
      : "hover:bg-blue-50 border-2 border-blue-200/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/30"
  }`;

  return (
    <>
      <nav className={navClasses}>
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 ${
              darkMode 
                ? "bg-blue-600 shadow-blue-600/30" 
                : "bg-blue-500 shadow-blue-500/30"
            }`}>
              <span className="text-white font-black text-lg">E</span>
            </div>
            <h1 className={`text-3xl font-black tracking-tight ${
              darkMode ? "text-blue-100" : "text-slate-800"
            }`}>
              EMS
            </h1>
          </div>

          {/* Sidebar Toggle */}
          <div className={`${isCollapsed ? 'ml-2' : 'ml-20'} transition-all duration-300`}>
            <button
              onClick={() => dispatch(toggleCollapse())}
              className={`group relative p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                darkMode
                  ? "bg-slate-800/50 hover:bg-slate-700/70 border-2 border-slate-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
                  : "bg-blue-50 hover:bg-blue-100 border-2 border-blue-200/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/30"
              }`}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FaBars className={`text-xl transition-all duration-300 ${
                darkMode ? "text-blue-300 group-hover:text-white" : "text-blue-600 group-hover:text-blue-700"
              } ${isCollapsed ? '' : ''}`} />
              
              {/* Tooltip */}
              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${
                darkMode ? "bg-slate-800 text-blue-100" : "bg-slate-800 text-white"
              }`}>
                {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              </div>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <div className="relative group">
            {/* <button
              onClick={() => dispatch(toggleDarkMode())}
              className={buttonClasses}
              aria-label="Toggle dark mode"
            >
              <div className="relative">
                {darkMode ? (
                  <MdLightMode className="transform transition-transform duration-300 group-hover:rotate-12" />
                ) : (
                  <MdDarkMode className="transform transition-transform duration-300 group-hover:rotate-12" />
                )}
              </div>
            </button> */}
            
            {/* Tooltip */}
            {/* <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${
              darkMode ? "bg-slate-800 text-blue-100" : "bg-slate-800 text-white"
            }`}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </div> */}
          </div>

          {/* Notifications */}
          <div className="relative group">
            <button 
              className={buttonClasses} 
              aria-label="Show notifications"
            >
              <div className="relative">
                <BsBell className="transform transition-transform duration-300 group-hover:rotate-12" />
                
                {/* Notification Badge */}
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold animate-pulse ${
                  darkMode ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
                }`}>
                  3
                </div>
              </div>
            </button>
            
            {/* Tooltip */}
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${
              darkMode ? "bg-slate-800 text-blue-100" : "bg-slate-800 text-white"
            }`}>
              Notifications
            </div>
          </div>

          {/* Profile Section */}
          <Link to="/profile" className={`group ${profileClasses}`}>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className={`font-bold text-sm ${
                  darkMode ? "text-blue-100" : "text-slate-800"
                }`}>
                  Welcome Back
                </p>
                <p className={`text-xs ${
                  darkMode ? "text-blue-300" : "text-slate-600"
                }`}>
                  Admin User
                </p>
              </div>
              
              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-2xl object-cover ring-4 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all duration-300 transform group-hover:scale-110 shadow-lg"
                />
                
                {/* Online Status */}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                  darkMode ? "bg-green-500 border-slate-900" : "bg-green-500 border-white"
                } animate-pulse`}></div>
              </div>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsClicked(!isClicked)}
              className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                darkMode
                  ? "bg-slate-800/50 hover:bg-slate-700/70 text-blue-300 hover:text-white border-2 border-slate-700/50 hover:border-blue-500/50"
                  : "bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 border-2 border-blue-200/50 hover:border-blue-400"
              }`}
            >
              {isClicked ? (
                <AiOutlineClose className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Overlay */}
      {isClicked && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsClicked(false)} />
      )}

      {showLogin && (
        <ProfilePopup onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </>
  );
};

export default Navbar;
