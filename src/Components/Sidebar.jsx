import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {
  MdOutlineDashboard,
  MdOutlineEmojiEvents,
} from "react-icons/md";
import { GrUserWorker, GrTransaction } from "react-icons/gr";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Controls mobile sidebar visibility
  const [isCollapsed, setIsCollapsed] = useState(false); // Controls expanded/collapsed on desktop

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
    }
  ];

  return (
    <>
      {/* Navbar with hamburger toggle */}
      <Navbar>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-3xl text-gray-700 md:hidden p-1 rounded hover:bg-gray-200"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
      </Navbar>

      <div className="flex h-[calc(100vh-2.5rem)]">
        {/* Sidebar for desktop and mobile */}
        <nav
          className={`fixed top-[2.5rem] left-0 bg-white text-gray-700 h-[calc(100vh-2.5rem)] shadow-2xl shadow-blue-gray-900/5 overflow-y-auto transition-all duration-300 ease-in-out z-40
            md:sticky md:top-[2.5rem]
            ${
              sidebarOpen
                ? "translate-x-0 w-64 p-4"
                : "-translate-x-full md:translate-x-0"
            }
            ${isCollapsed && "md:w-20 md:p-2"} 
            w-64
          `}
        >
          {/* Desktop collapse toggle */}
          <div className="hidden md:flex justify-center mb-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="mr-4 p-3 flex rounded hover:bg-gray-200"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <FaBars className="text-2xl" /> : <AiOutlineClose className="text-2xl left-0" />}
            </button>
          </div>

          <div className="flex flex-col gap-1 font-sans text-base font-normal text-gray-700">
            {navButtons.map((button, index) => (
              <NavLink
                to={button.to}
                key={index}
                role="button"
                tabIndex="0"
                className={({ isActive }) =>
                  `flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80
                   ${
                     isActive
                       ? "bg-gray-200 text-gray-900"
                       : "hover:text-gray-700 focus:text-gray-700 active:text-gray-900"
                   }
                   outline-none`
                }
                onClick={() => setSidebarOpen(false)} // close mobile sidebar on link click
              >
                <div className="grid place-items-center mr-4">{button.iconLink}</div>
                {/* Show text only if sidebar is expanded or on mobile */}
                {(sidebarOpen || !isCollapsed) && button.text}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-auto px-4 sm:px-8 py-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Sidebar;
