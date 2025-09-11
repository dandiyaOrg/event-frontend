import React from "react";

const InputField = ({
  label,
  type ,
  id,
  placeholder,
  value,
  onChange,
  width = "w-full",
  
  rows = 1,
  isTextarea = false,
  className = "",
  
}) => {
  const baseClasses =
    "border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition";

  return (
    <div className={`flex flex-col gap-1 ${width} `}>
      {label && (
        <label htmlFor={id} className="text-gray-700 font-medium">
          {label}
        </label>
      )}
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${baseClasses} resize-none ${className}`}
        
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${baseClasses} ${className}`}
          
        />
      )}
    </div>
  );
};

export default InputField;
