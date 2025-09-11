import React, { useState } from "react";

const SearchBar = ({ placeholder = "Search Mockups, Logos...", onSearch }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-xl w-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
    >
      <span className="pl-4 flex items-center text-gray-400">
        {/* Search Icon (SVG) */}
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 bg-transparent outline-none border-0 px-3 py-3 text-sm text-gray-900"
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="bg-gray-500 hover:bg-gray-700 text-white font-medium text-sm px-6 py-2 rounded-lg m-1"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
