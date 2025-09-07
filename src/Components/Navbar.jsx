import { FaBars } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';

const Navbar = () => (
  <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
    {/* Left Section: Logo */}
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold text-[#7A7F17] tracking-wide">EMS</h1>
      {/* Hamburger menu for sidebar on mobile */}
      <button className="text-2xl ml-2 text-gray-700 block md:hidden">
        <FaBars />
      </button>
    </div>

    {/* Right Section: Controls */}
    <div className="flex items-center gap-4">
      <button className="text-xl text-gray-600 hover:text-gray-900">
        <MdDarkMode />
      </button>
      <button className="text-xl text-gray-600 hover:text-gray-900">
        <BsBell />
      </button>
      <div className="flex items-center gap-2">
        {/* User name and avatar */}
        <span className="text-gray-800 font-medium">Alison</span>
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  </nav>
);

export default Navbar;
