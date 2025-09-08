import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { MdDarkMode ,MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/AuthSlice"; 
import ProfilePopup from "../Components/LoginPopUp"; 
import { toggleDarkMode } from '../features/ThemeSlice';

const Navbar = ({ isClicked, setIsClicked }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <>
      <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-[#7A7F17] tracking-wide">EMS</h1>
          <button
            onClick={() => setIsClicked(!isClicked)}
            className="text-2xl ml-2 text-gray-700 block md:hidden"
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
          onClick={() => dispatch(toggleDarkMode())}
          className="text-xl text-gray-600 hover:text-gray-900">
            {darkMode ?<MdLightMode />: <MdDarkMode />  }
          </button>
          <button className="text-xl text-gray-600 hover:text-gray-900">
            <BsBell />
          </button>

          {isLogin ? (
            <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
              <span className="text-gray-800 font-medium">Alison</span>
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="text-gray-800 font-medium px-4 py-1 border border-gray-500 rounded hover:bg-gray-100"
            >
              Log In
            </button>
          )}
        </div>
      </nav>

      {showLogin && (
        <ProfilePopup onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </>
  );
};

export default Navbar;
