import React from 'react';

const Input = ({ label, type = "text", value, onChange, placeholder, required }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1.5"
        required={required}
      />
    </div>
  );
};

export default Input;
