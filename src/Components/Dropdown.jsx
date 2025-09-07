import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from 'react';

function Dropdown({options, buttonName}) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex justify-center">
        <button
            onClick={toggleDropdown}
            className=" text-white rounded-md"
        >
            {buttonName}
        </button>
        <div className="text-3xl">
            <RiArrowDropDownLine />
        </div>
      </div>
      {isOpen && (
        <div>
            
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
            <ul>
                {options.map((option, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {option.text}
                </li>
                ))}
            </ul>
            </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;