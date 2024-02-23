import React, { useState, useEffect, useRef } from "react";
import {
  FaCaretDown,
  FaCaretUp,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";
import { addCommasToNumber } from "../scripts/addCommasToNumber";
import Tooltip from "./Tooltip";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import FavoriteButton from "./FavoriteButton";
import useFavoriteStore from "../store/favoriteStore";

const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const AllCoinsTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef(null);
  const favorites = useFavoriteStore((state) => state.favorites);

  const navigate = useNavigate();
  const handleRowClick = (crypto) => {
    navigate(`/coins/${crypto.id}`);
  };

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=${page}&sparkline=false&x_cg_demo_api_key=${APIKEY}`
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptoData();

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
  }, [page, itemsPerPage]);

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
  const handleSort = (key) => {
    let direction = "desc";
    if (key === "favorite") {
      // Sort based on favorites
      const sortedCryptoDataCopy = [...cryptoData].sort((a, b) => {
        const isAFavorite = favorites.includes(a.symbol);
        const isBFavorite = favorites.includes(b.symbol);

        // Move favorites to the beginning
        if (isAFavorite && !isBFavorite) return -1;
        if (!isAFavorite && isBFavorite) return 1;

        // Maintain other sorting order
        return 0;
      });

      setCryptoData(sortedCryptoDataCopy);
      setSortConfig({ key, direction });
    } else {
      if (sortConfig.key === key && sortConfig.direction === "desc") {
        direction = "asc";
      }

      setSortConfig({ key, direction });
    }
  };

  const sortedCryptoData = [...cryptoData].sort((a, b) => {
    if (sortConfig.direction === "desc") {
      return a[sortConfig.key] > b[sortConfig.key] ? -1 : 1;
    }
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return 0;
  });
  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "desc" ? (
        <FaCaretDown className="inline p-0.5 pe-1" />
      ) : (
        <FaCaretUp className="inline p-0.5 pe-1" />
      );
    }
    return (
      <FaCaretDown className="opacity-25 group-hover:opacity-75 transition-opacity inline p-0.5 px-1" />
    );
  };
  const TableHeaderCell = ({ label, sortKey, className }) => (
    <th
      className={`px-4 py-2  cursor-pointer group  ${className} `}
      onClick={() => handleSort(sortKey)}
    >
      {" "}
      {label !== "Name" && renderSortIcon(sortKey)}
      {label}
      {/* {renderSortIcon(sortKey)} */}
      {label === "Name" && renderSortIcon(sortKey)}
    </th>
  );

  const CryptoRow = ({ crypto, index }) => (
    <tr
      key={crypto.id}
      className={`${
        index % 2 === 0
          ? "bg-zinc-200 dark:bg-zinc-700"
          : "bg-gray-50 dark:bg-zinc-800"
      } cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-500 transition-colors whitespace-nowrap `}
      onClick={() => handleRowClick(crypto)}
    >
      <td className="px-4 py-2 ">{crypto.market_cap_rank}</td>

      <td className="px-4 py-2">
        <div className="flex items-center">
          <img
            className="w-8 h-8 p-1"
            src={crypto.image}
            alt={`${crypto.name} Logo`}
          />
          <span className="ml-2">{crypto.name}</span>{" "}
          <span className="inline-block text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase">
            {crypto.symbol}
          </span>
        </div>
      </td>

      <td className="px-4 py-2 text-end">
        ${addCommasToNumber(crypto.current_price)}
      </td>
      <td className="px-4 py-2 text-end">
        ${addCommasToNumber(crypto.market_cap)}
      </td>
      <td
        className={`px-4 py-2 text-end ${
          crypto.price_change_percentage_24h >= 0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {crypto.price_change_percentage_24h >= 0 ? (
          <FaChevronUp className="p-0.5 pe-1 inline-flex" />
        ) : (
          <FaChevronDown className="p-0.5 pe-1 inline-flex" />
        )}
        {crypto.price_change_percentage_24h}%
      </td>
      <td>
        {" "}
        <FavoriteButton id={crypto.id} />
      </td>
    </tr>
  );
  const handlePagination = (direction) => {
    if (direction === "next") {
      console.log("Current page:", page); // Add this line for debugging
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowClearButton(query !== "");

    // Filter search results based on the query
    const filtered = searchResults.filter((result) =>
      result.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div className="container mx-auto ">
      <div className="inline-flex w-full ">
        <h2 className="text-3xl font-semibold mb-4">All Coins</h2>
        <form
          className="ml-auto w-80 relative"
          onSubmit={(e) => e.preventDefault()}
        >
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
              placeholder="Search all coins"
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
          {searchQuery?.length > 0 && filteredResults?.coins?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 dark:bg-zinc-800 bg-zinc-200 text-start rounded-md overflow-auto overflow-x-hidden absolute max-h-64 w-full scroll shadow-lg"
            >
              <ul>
                {filteredResults.coins.map((coin) => (
                  <li
                    key={coin.id}
                    className="px-6 py-2 hover:bg-zinc-700 hover:shadow hover:text-zinc-100 cursor-pointer"
                    onClick={() => {
                      handleRowClick(coin);
                    }}
                  >
                    <img
                      src={coin.thumb}
                      alt=""
                      className="w-6 h-6 inline-block mr-2"
                    />
                    {coin.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </form>{" "}
      </div>
      <div className="">
        <table className="table-auto w-full rounded-lg overflow-hidden">
          <thead className="bg-zinc-300 dark:bg-zinc-900  w-full ">
            <tr>
              <TableHeaderCell
                className="w-10 text-end "
                label="#"
                sortKey="market_cap_rank"
              />
              <TableHeaderCell
                className="text-start "
                label="Name"
                sortKey="name"
              />
              <TableHeaderCell
                className="text-end "
                label="Current Price (USD)"
                sortKey="current_price"
              />
              <TableHeaderCell
                className="text-end "
                label="Market Cap (USD)"
                sortKey="market_cap"
              />
              <TableHeaderCell
                className="text-end "
                label="24h Change (%)"
                sortKey="price_change_percentage_24h"
              />
              <TableHeaderCell
                className="text-end "
                label=""
                sortKey="favorite"
              />
            </tr>
          </thead>
          <tbody>
            {sortedCryptoData.map((crypto, index) => (
              <CryptoRow key={crypto.id} crypto={crypto} index={index} />
            ))}
          </tbody>
        </table>
        <form onSubmit={(e) => e.preventDefault()} className="max-w-sm mx-auto">
          <button onClick={() => handlePagination("prev")}>Previous</button>
          <select
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setPage(1); // Reset page to 1 when changing items per page
            }}
            value={itemsPerPage}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
            <option value={250}>250 per page</option>
          </select>
          <button onClick={() => handlePagination("next")}>Next</button>{" "}
        </form>
      </div>
    </div>
  );
};

export default AllCoinsTable;
