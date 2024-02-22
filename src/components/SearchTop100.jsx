import React from "react";
import Tooltip from "./Tooltip";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const SearchTop100 = ({ searchQuery, setSearchQuery }) => {
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleSlashKeyDown = (e) => {
      if (e.key === "/") {
        inputRef.current.focus();
        e.preventDefault();
      } else if (e.key === "Escape") {
        inputRef.current.blur();
      }
    };

    document.addEventListener("keydown", handleSlashKeyDown);

    return () => {
      document.removeEventListener("keydown", handleSlashKeyDown);
    };
  }, []);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowClearButton(e.target.value !== "");
  };

  const handleClear = () => {
    setSearchQuery("");
    setShowClearButton(false);
    inputRef.current.focus();
  };

  const handleSlashKeyDown = (e) => {
    if (e.key === "/") {
      inputRef.current.focus();
      e.preventDefault();
    }
  };

  return (
    <form className="ml-auto w-80" onSubmit={(e) => e.preventDefault()}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative group w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FaSearch className="opacity-40" />
        </div>
        <input
          id="default-search"
          className="block w-full p-3 px-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          placeholder="Search Top 100 Cryptocurrencies"
          required
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleSlashKeyDown}
          ref={inputRef}
        />
        {showClearButton ? (
          <button
            type="button"
            className="absolute inset-y-0 hover:scale-105 pointer-cursor border-none end-0 flex items-center pr-3"
            onClick={handleClear}
          >
            <FaTimesCircle className="opacity-40" />
          </button>
        ) : (
          <div className="absolute group group-focus-within:invisible inset-y-0 end-0 flex items-center pr-3">
            <div className="relative">
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                /
              </kbd>
              <Tooltip
                className="opacity-0 z-50 -bottom-12 group-hover:-bottom-10 group-hover:opacity-100 whitespace-nowrap"
                content="Use to trigger search"
                showArrow={false}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchTop100;
