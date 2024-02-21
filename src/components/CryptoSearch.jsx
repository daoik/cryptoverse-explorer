import React, { useState } from "react";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const CryptoSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowClearButton(e.target.value.length > 0);
  };

  const handleClear = () => {
    setSearchQuery("");
    setShowClearButton(false);
  };

  const handleSlashKeyDown = (e) => {
    if (e.key === "/" && !showClearButton) {
      e.preventDefault();
    }
  };

  return (
    <div
      id="#CryptoSearch"
      className="h-[700px] flex items-center justify-center w-full bg-gradient-radial from-neutral-200 to-neutral-400 dark:from-slate-600  dark:to-slate-900"
    >
      <form className=" w-full mx-96" onSubmit={(e) => e.preventDefault()}>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10 w-full text-center text-3xl tracking-wide whitespace-nowrap font-bold text-gray-900 dark:text-zinc-100"
        >
          {" "}
          START YOUR JOURNEY TODAY
        </motion.h3>
        <label
          htmlFor="default-search"
          className="mb-2 text-lg font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative group w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="opacity-40" />
          </div>
          <input
            id="default-search"
            className="block w-full p-3 px-10 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search Cryptocurrencies"
            required
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleSlashKeyDown}
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
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CryptoSearch;
