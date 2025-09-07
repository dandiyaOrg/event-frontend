import {
  MdOutlineEmojiEvents,
  MdOutlineAccessTime,
  MdOutlineLocationOn,
  MdOutlineEventNote,
  MdAttachMoney,
  MdBusiness,
  MdDescription,
} from "react-icons/md";
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
}) => (
  <div className="max-w-sm bg-white rounded-lg shadow-md border border-gray-100 p-4 h-[550px] flex flex-col">
    <img
      src={image}
      alt={title}
      className="h-48 w-full object-cover rounded-md mb-4 flex-shrink-0"
    />
    <div className="space-y-2 flex flex-col flex-grow overflow-hidden">
      <div className="flex items-center gap-2">
        <MdOutlineEmojiEvents className="text-gray-600" />
        <span className="font-semibold">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-gray-600" />
        <span>{date}</span>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineAccessTime className="text-gray-600" />
        <span>{time}</span>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineEventNote className="text-gray-600" />
        <span>{venue}</span>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineLocationOn className="text-gray-600" />
        <span>{location}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaIndianRupeeSign className="text-gray-600" />
        <span>{price}</span>
      </div>
      <div className="flex items-center gap-2">
        <MdBusiness className="text-gray-600" />
        <span>{organizer}</span>
      </div>
      <div className="flex items-center leading-snug gap-2 overflow-auto mt-auto text-gray-700 whitespace-normal">
        <MdDescription className="text-gray-600 mt-1 shrink-0" />
        <span>{description}</span>
      </div>
    </div>
  </div>
);

export default EventCard;
