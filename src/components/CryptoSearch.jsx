import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import { debounce } from "lodash"; // Import debounce utility

const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const CryptoSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const inputRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(-3200 + window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch data from CoinGecko API with debounce
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${searchQuery}&x_cg_demo_api_key=${APIKEY}`
        );
        const data = await response.json();
        setFilteredResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const debouncedFetchData = debounce(fetchData, 300); // Debounce for 300 milliseconds
    if (searchQuery !== "") {
      debouncedFetchData();
    } else {
      setFilteredResults([]);
    }

    return () => {
      debouncedFetchData.cancel(); // Cancel debounce on component unmount
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleSlashKeyDown = (e) => {
      if (e.key === "/") {
        inputRef.current.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleSlashKeyDown);

    return () => {
      document.removeEventListener("keydown", handleSlashKeyDown);
    };
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowClearButton(query !== "");
  };

  const handleClear = () => {
    setSearchQuery("");
    setShowClearButton(false);
    inputRef.current.focus();
    setFilteredResults([]);
  };

  const navigate = useNavigate();
  const handleRowClick = (crypto) => {
    navigate(`/cryptoverse-explorer/coins/${crypto.id}`);
  };

  return (
    <div
      id="CryptoSearch"
      className="h-[700px] z-0 relative flex items-center justify-center w-full bg-[url('/nebula.jpg')]  bg-cover bg-fixed"
      style={{ backgroundPositionY: `${scrollY * 0.2}px` }} // Adjust the multiplier for the parallax effect
    >
      <div className="dark:bg-black bg-pink-100 opacity-20 dark:opacity-40 z-10 absolute h-full w-full"></div>
      <form
        className="w-full flex flex-col items-center lg:mx-96 z-20"
        onSubmit={(e) => e.preventDefault()}
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10 w-full text-center text-3xl tracking-wide lg:whitespace-nowrap font-bold text-zinc-100"
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
        <div className="relative group sm::w-4/6 ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="opacity-40" />
          </div>
          <input
            id="default-search"
            className="block w-full p-3 px-10 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search Cryptos..."
            required
            value={searchQuery}
            onChange={handleSearch}
            ref={inputRef}
          />
          {showClearButton ? (
            <button
              type="button"
              className="absolute inset-y-0 hover:scale-105 cursor-pointer border-none end-0 flex items-center pr-3"
              onClick={handleClear}
            >
              <FaTimesCircle className="opacity-40" />
            </button>
          ) : (
            <div className="absolute group group-focus-within:invisible inset-y-0 end-0 flex items-center pr-3">
              <div className="relative group3">
                <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                  /
                </kbd>
                <Tooltip
                  className="opacity-0 z-50 -bottom-12 group3-hover:-bottom-10 group-hover:opacity-100 whitespace-nowrap"
                  content="Use to trigger search"
                  showArrow={false}
                />
              </div>
            </div>
          )}

          {/* Dropdown for filtered search results */}
          {searchQuery?.length > 0 && filteredResults?.coins?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 dark:bg-zinc-800 bg-zinc-200 text-start rounded-md overflow-x-hidden absolute max-h-64 w-full scroll shadow-lg"
            >
              <ul>
                {filteredResults.coins.map((coin) => (
                  <li
                    key={coin.id}
                    className="px-6  py-2 hover:bg-zinc-700 hover:shadow hover:text-zinc-100 cursor-pointer"
                    onClick={() => {
                      handleRowClick(coin);
                    }}
                  >
                    <img
                      src={coin.thumb}
                      alt=""
                      className="w-6 h-6 inline-block mr-2"
                    />
                    {coin.name}{" "}
                    <span className="inline-block  hover:text-gray-100 dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase">
                      {coin.symbol}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CryptoSearch;
