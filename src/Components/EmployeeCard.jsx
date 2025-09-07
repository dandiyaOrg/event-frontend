import { MdOutlineMail, MdPhone, MdPerson, MdBadge } from 'react-icons/md';

const EmployeeCard = ({ image, name, role, email, mobile, description }) => (
  <div className="bg-white rounded-lg shadow p-4 border border-gray-200 mx-auto
                  w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md">
    <img
      src={image}
      alt={name}
      className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-md mb-4"
    />
    <div className="space-y-3 text-gray-700">
      <div className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
        <MdPerson className="text-xl" />
        <span>{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <MdBadge className="text-lg text-gray-600" />
        <span>{role}</span>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineMail className="text-lg text-gray-600" />
        <a href={`mailto:${email}`} className="hover:underline text-blue-600 break-words">
          {email}
        </a>
      </div>
      <div className="flex items-center gap-2">
        <MdPhone className="text-lg text-gray-600" />
        <a href={`tel:${mobile}`} className="hover:underline text-blue-600">
          {mobile}
        </a>
      </div>
      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export default EmployeeCard;
