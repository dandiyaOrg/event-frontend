import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import {
  MdOutlineDashboard,
  MdOutlineEmojiEvents,
  MdLogout,
} from "react-icons/md";
import { GrUserWorker, GrTransaction } from "react-icons/gr";

function Sidebar() {
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
      text: "Logout",
      to: "/logout",
      iconLink: <MdLogout className="text-2xl" />,
      notification: false,
    },
  ];

  return (
    <>
      {/* Header */}
      <Navbar />

      {/* Main layout */}
      <div className="flex h-[calc(100vh-2.5rem)]">
        {/* Sidebar */}
        <nav
          className={`fixed md:sticky top-[2.5rem] left-0 bg-white text-gray-700 h-[calc(100vh-2.5rem)] max-w-[17rem] w-full p-4 shadow-2xl shadow-blue-gray-900/5 overflow-y-auto transform md:transform-none transition-transform duration-300 ease-in-out z-40
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
          `}
        >
          <div className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
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
                onClick={() => setSidebarOpen(false)} // close sidebar on click (mobile)
              >
                <div className="grid place-items-center mr-4">
                  {button.iconLink}
                </div>
                {button.text}
                {button.notification && (
                  <div className="grid place-items-center ml-auto justify-self-end">
                    <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                      <span>14</span>
                    </div>
                  </div>
                )}
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
