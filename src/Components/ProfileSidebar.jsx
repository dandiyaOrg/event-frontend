import { MdPerson, MdEdit, MdLogout } from "react-icons/md";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ProfileSidebar = () => {
  const [active, setActive] = useState("profile");
  const darkMode = useSelector((state) => state.theme.darkMode);

  if (!isLogin) {
    return (
      <div
        className={`w-72 p-6 rounded-lg shadow text-center ${
          darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
        }`}
      >
        You are logged out.
      </div>
    );
  }

  const activeClasses = "border-l-4 border-gray-600 font-semibold";
  const activeBg = darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-900";
  const inactiveClasses = darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-200 text-gray-700";

  return (
    <div
      className={`w-72 rounded-t-lg shadow divide-y ${
        darkMode ? "bg-gray-900 divide-gray-700" : "bg-gray-100 divide-gray-300"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${
          active === "profile" ? `${activeClasses} ${activeBg}` : inactiveClasses
        }`}
        onClick={() => setActive("profile")}
      >
        <MdPerson className={`text-xl ${active === "profile" ? "text-gray-200" : "text-gray-500"}`} />
        
        <span className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>Profile</span>
      </div>
      <div
        className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${
          active === "edit" ? `${activeClasses} ${activeBg}` : inactiveClasses
        }`}
        onClick={() => setActive("edit")}
      >
        <MdEdit className={`text-xl ${active === "edit" ? "text-gray-200" : "text-gray-500"}`} />
        <span className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>Edit profile</span>
      </div>
      <div
        className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${
          active === "logout" ? `${activeClasses} ${activeBg}` : inactiveClasses
        }`}
        onClick={handleLogout}
      >
        <MdLogout className={`text-xl ${active === "logout" ? "text-gray-200" : "text-gray-500"}`} />
        <span className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>Log out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
