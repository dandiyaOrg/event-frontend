import { MdPerson, MdEdit, MdLogout } from "react-icons/md";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/AuthSlice"; // Adjust path as needed

const ProfileSidebar = () => {
  const [active, setActive] = useState("profile");
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setActive("logout"); // optionally set active tab to logout or reset it
    // add additional logout flow if required
  };

  if (!isLogin) {
    return (
      <div className="w-72 p-6 bg-gray-100 rounded-lg shadow text-center text-gray-700">
        You are logged out.
      </div>
    );
  }

  return (
    <div className="w-72 bg-gray-100 rounded-t-lg shadow divide-y divide-gray-300">
      <div
        className={`flex items-center gap-3 px-6 py-3 cursor-pointer 
          ${active === "profile"
            ? "border-l-4 border-gray-600 bg-gray-200 font-semibold text-gray-900"
            : "hover:bg-gray-200 text-gray-700"}`}
        onClick={() => setActive("profile")}
      >
        <MdPerson className={`text-xl ${active === "profile" ? "text-gray-800" : "text-gray-500"}`} />
        <span>Profile</span>
      </div>
      <div
        className={`flex items-center gap-3 px-6 py-3 cursor-pointer 
          ${active === "edit"
            ? "border-l-4 border-gray-600 bg-gray-200 font-semibold text-gray-900"
            : "hover:bg-gray-200 text-gray-700"}`}
        onClick={() => setActive("edit")}
      >
        <MdEdit className={`text-xl ${active === "edit" ? "text-gray-800" : "text-gray-500"}`} />
        <span>Edit profile</span>
      </div>
      <div
        className={`flex items-center gap-3 px-6 py-3 cursor-pointer 
          ${active === "logout"
            ? "border-l-4 border-gray-600 bg-gray-200 font-semibold text-gray-900"
            : "hover:bg-gray-200 text-gray-700"}`}
        onClick={handleLogout}
      >
        <MdLogout className={`text-xl ${active === "logout" ? "text-gray-800" : "text-gray-500"}`} />
        <span>Log out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
