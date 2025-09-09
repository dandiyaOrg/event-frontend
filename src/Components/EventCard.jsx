import {
  MdOutlineEmojiEvents,
  MdOutlineAccessTime,
  MdOutlineLocationOn,
  MdOutlineEventNote,
  MdAttachMoney,
  MdBusiness,
  MdDescription,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

const EventCard = ({
  image,
  title,
  date,
  time,
  venue,
  location,
  price,
  organizer,
  description,
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`max-w-sm rounded-lg shadow-md border p-4 h-[550px] flex flex-col
        ${darkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-100 text-gray-900"}
      `}
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover rounded-md mb-4 flex-shrink-0"
      />
      <div className="space-y-2 flex flex-col flex-grow overflow-hidden">
        <div className="flex items-center gap-2">
          <MdOutlineEmojiEvents className={darkMode ? "text-gray-300" : "text-gray-600"} />
          <span className="font-semibold">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaRegCalendarAlt className={darkMode ? "text-gray-300" : "text-gray-600"} />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-2">
          <MdOutlineAccessTime className={darkMode ? "text-gray-300" : "text-gray-600"} />
          <span>{time}</span>
        </div>

        <div className="flex items-center gap-2">
          <MdOutlineEventNote className={darkMode ? "text-gray-300" : "text-gray-600"} />
          <span>{venue}</span>
        </div>

        <div className="flex items-center gap-2">
          <MdOutlineLocationOn className={darkMode ? "text-gray-300" : "text-gray-600"} />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaIndianRupeeSign className={darkMode ? "text-gray-300" : "text-gray-600"} />
          <span>{price}</span>
        </div>

        <div className="flex items-center gap-2">
          <MdBusiness className={darkMode ? "text-gray-300" : "text-gray-600"} />
          <span>{organizer}</span>
        </div>

        <div
          className={`flex items-center leading-snug gap-2 overflow-auto mt-auto whitespace-normal ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <MdDescription className={`${darkMode ? "text-gray-300" : "text-gray-600"} mt-1 shrink-0`} />
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;



