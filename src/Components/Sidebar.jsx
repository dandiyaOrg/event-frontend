import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { RiBillLine } from "react-icons/ri";
import { MdPeopleAlt ,MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineDashboard, MdOutlineEmojiEvents } from "react-icons/md";
import { GrUserWorker, GrTransaction } from "react-icons/gr";
import { useSelector } from "react-redux";

function Sidebar() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isCollapsed = useSelector((state) => state.collapsed.isCollapsed);

  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const navButtons = [
    {
      text: "Dashboard",
      to: "/",
      iconLink: <MdOutlineDashboard className="text-2xl" />,
      notification: false,
    },
    {
      text: "Events",
      to: "/events",
      iconLink: <MdOutlineEmojiEvents className="text-2xl" />,
      notification: false,
    },
    {
      text: "Employees",
      to: "/employees",
      iconLink: <GrUserWorker className="text-2xl" />,
      notification: false,
    },
    {
      text: "Transactions",
      to: "/transactions",
      iconLink: <GrTransaction className="text-2xl" />,
      notification: false,
    },
    {
      text: "Billing Users",
      to: "/billingUsers",
      iconLink: <RiBillLine className="text-2xl" />,
      notification: false,
    },
    {
      text: "Attendee",
      to: "/attendee",
      iconLink: <MdPeopleAlt className="text-2xl" />,
      notification: false,
    },
    {
      text: "Orders",
      to: "/orders",
      iconLink: <MdOutlineShoppingCart className="text-2xl" />,
      notification: false,
    }
  ];

  const sidebarBackground = darkMode 
    ? "bg-slate-900 text-blue-100 shadow-2xl shadow-black/50 border-r border-slate-700/50" 
    : "bg-white text-slate-800 shadow-2xl shadow-blue-500/10 border-r border-blue-200/30 backdrop-blur-xl";
    
  const sidebarOpenClasses = sidebarOpen
    ? "translate-x-0 w-72 p-6"
    : "-translate-x-full md:translate-x-0";
    
  const sidebarCollapsedClasses = isCollapsed ? "md:w-20 md:p-3" : "md:w-72 md:p-6";
  const sidebarPositionClasses = "md:sticky top-[2.5rem]";

  const getNavLinkClasses = (isActive) => {
    if (isActive) {
      return darkMode
        ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30 transform scale-105 border-l-4 border-blue-400"
        : "bg-blue-500 text-white shadow-xl shadow-blue-500/30 transform scale-105 border-l-4 border-blue-300";
    } else {
      return darkMode
        ? "hover:bg-slate-800 hover:text-blue-100 focus:bg-slate-800 focus:text-blue-100 active:bg-slate-700 active:text-white hover:shadow-lg hover:shadow-slate-900/50 hover:transform hover:scale-105 hover:border-l-4 hover:border-slate-600"
        : "hover:bg-blue-50 hover:text-slate-800 focus:bg-blue-50 focus:text-slate-800 active:bg-blue-100 active:text-slate-900 hover:shadow-lg hover:shadow-blue-200/50 hover:transform hover:scale-105 hover:border-l-4 hover:border-blue-400";
    }
  };

  {console.log(isCollapsed);}

  return (
    <>
      <Navbar>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`relative group text-3xl ${darkMode ? "text-blue-300 hover:text-white" : "text-slate-700 hover:text-slate-900"} md:hidden p-3 rounded-2xl transition-all duration-300 hover:shadow-xl ${darkMode ? "hover:bg-slate-800" : "hover:bg-blue-50"} transform hover:scale-110`}
          aria-label="Toggle sidebar"
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            {sidebarOpen ? <AiOutlineClose /> : <FaBars />}
          </div>
        </button>
      </Navbar>

      <div className="flex h-[calc(100vh-2.5rem)]">
        <nav
          className={`fixed top-[2.5rem] left-0 h-[calc(100vh-2.5rem)] overflow-y-auto z-40 
            ${sidebarBackground} 
            ${sidebarOpenClasses} 
            ${sidebarPositionClasses} 
            ${sidebarCollapsedClasses} 
            transition-all duration-500 ease-in-out transform`}
        >
        

          {/* Enhanced Navigation Items */}
          <div className="flex flex-col space-y-3 font-sans text-base font-semibold">
            {navButtons.map((button, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <NavLink
                  to={button.to}
                  role="button"
                  tabIndex="0"
                  className={({ isActive }) =>
                    `relative flex items-center w-full p-4 rounded-2xl text-start leading-tight transition-all duration-300 outline-none overflow-hidden ${getNavLinkClasses(isActive)}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {/* Background Animation */}
                  <div className="absolute inset-0 p-2 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                  
                  {/* Icon Container */}
                  <div className={`relative z-10 grid place-items-center mr-10 p-2 rounded-xl transition-all duration-300 ${darkMode ? "text-blue-300 group-hover:text-white" : "text-slate-700 group-hover:text-blue-600"} group-hover:bg-blue-100/20 group-hover:shadow-lg group-hover:transform group-hover:rotate-12`}>
                    {button.iconLink}
                  </div>
                  
                  {/* Text Container */}
                  {(sidebarOpen || !isCollapsed) && (
                    <span className="relative z-10 font-bold tracking-wide transition-all duration-300 group-hover:translate-x-1">
                      {button.text}
                    </span>
                  )}
                  
                  {/* Notification Badge */}
                  {button.notification && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse"></div>
                  )}
                  
                  {/* Hover Effect Line */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-blue-500 transition-all duration-300 group-hover:h-full rounded-l-full"></div>
                </NavLink>

                {/* Tooltip for collapsed state */}
                {isCollapsed && !sidebarOpen && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                    {button.text}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Footer */}
          <div className={`mt-auto pt-8 ${(sidebarOpen || !isCollapsed) ? 'block' : 'hidden'}`}>
            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-blue-50/50 border border-blue-200/30'} backdrop-blur-sm`}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg animate-pulse"></div>
                <span className={`text-xs font-bold ${darkMode ? 'text-blue-300' : 'text-slate-600'}`}>
                  System Online
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Enhanced Main Content */}
        <main className={`flex-1 overflow-auto px-4 sm:px-8 py-6 transition-all duration-300 ${darkMode ? "bg-slate-900 text-blue-100" : "bg-slate-50 text-slate-900"}`}>
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default Sidebar;
