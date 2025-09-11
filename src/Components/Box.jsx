import React from "react";

const TextareaField = ({
  label,
  id,
  placeholder = "",
  value,
  onChange,
  rows = 5,
  className = "",
  width
}) => (
  <div className={`flex flex-col gap-1 ${width} `}>
    {label && (
      <label
        htmlFor={id}
        className="block mb-1 text-base font-semibold text-gray-700"
      >
        {label}
      </label>
    )}
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={
        "w-full bg-gray-100 border border-gray-300 rounded-md p-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition resize-none " +
        className
      }
      {...rest}
    />
  </div>
);

export default TextareaField;
