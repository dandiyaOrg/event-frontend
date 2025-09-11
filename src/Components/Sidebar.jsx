import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { RiBillLine } from "react-icons/ri";
import { MdPeopleAlt ,MdOutlineShoppingCart } from "react-icons/md";

import {
  MdOutlineDashboard,
  MdOutlineEmojiEvents,
} from "react-icons/md";
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
      notification: false,},
    {
      text: "Attendee",
      to: "/attendee",
      iconLink: <MdPeopleAlt className="text-2xl" />,
      notification: false,},
    {
      text: "Orders",
      to: "/orders",
      iconLink: <MdOutlineShoppingCart  className="text-2xl" />,
      notification: false,}
  ];

  const sidebarBackground = darkMode ? "bg-gray-900 text-gray-300 shadow-black/40" : "bg-white text-gray-700 shadow-blue-gray-900/5";
  const sidebarOpenClasses = sidebarOpen
  ? "translate-x-0 w-64 p-4"
  : "-translate-x-full md:translate-x-0";
  const sidebarCollapsedClasses = isCollapsed ? "md:w-20 md:p-2" : "md:w-64";
  const sidebarPositionClasses = "md:sticky top-[2.5rem]";

  const getNavLinkClasses = (isActive) => {
    if (isActive) {
      return darkMode
        ? "bg-gray-700 text-gray-200"
        : "bg-gray-200 text-gray-900";
    } else {
      return darkMode
        ? "hover:bg-gray-800 hover:text-gray-300 focus:bg-gray-800 focus:text-gray-300 active:bg-gray-700 active:text-gray-200"
        : "hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-gray-700 focus:text-gray-700 active:text-gray-900";
    }
  };
  {console.log(isCollapsed);
  }

  return (
    <>
      <Navbar>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={` text-3xl ${darkMode ? "text-gray-300" : "text-gray-700"} md:hidden p-1 rounded hover:bg-gray-200 hover:bg-opacity-30 `}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
      </Navbar>

      <div className="flex h-[calc(100vh-2.5rem)] ">
        <nav
           className={`fixed top-[2.5rem] left-0 h-[calc(100vh-2.5rem)] overflow-y-auto shadow-2xl shadow-blue-gray-900/5 z-40 
    ${sidebarBackground} 
    ${sidebarOpenClasses} 
    ${sidebarPositionClasses} 
    ${sidebarCollapsedClasses} 

    transition-transform transition-width duration-300 ease-in-out
  `}
        >
          

          <div className="flex flex-col  font-sans text-base font-normal">
            {navButtons.map((button, index) => (
              <NavLink
                to={button.to}
                key={index}
                role="button"
                tabIndex="0"
                className={({ isActive }) =>
                  `flex items-center w-full p-3 bg  rounded-lg text-start leading-tight transition-all outline-none ${getNavLinkClasses(isActive)}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <div className={`grid place-items-center mr-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {button.iconLink}
                </div>
                {(sidebarOpen || !isCollapsed) && button.text}
              </NavLink>
            ))}
          </div>
        </nav>

        <main className={`flex-1 overflow-auto px-4 sm:px-8 py-4 ${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-900"}`}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Sidebar;
