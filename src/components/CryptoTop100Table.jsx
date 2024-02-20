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

const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const CryptoTop100Table = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false?x_cg_demo_api_key=${APIKEY}`
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
  }, []);

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCryptoData = [...cryptoData].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredCryptoData = sortedCryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "desc" ? (
        <FaCaretDown className="inline p-0.5 pe-1" />
      ) : (
        <FaCaretUp className="inline p-0.5 pe-1" />
      );
    }
    return (
      <FaCaretDown className="opacity-0 group-hover:opacity-75 transition-opacity inline p-0.5 pe-1" />
    );
  };

  const TableHeaderCell = ({ label, sortKey, className }) => (
    <th
      className={`px-4 py-2 cursor-pointer group text-end ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      {label !== "Name" && renderSortIcon(sortKey)}
      {label}
      {label === "Name" && renderSortIcon(sortKey)}
    </th>
  );

  const CryptoRow = ({ crypto, index }) => (
    <tr
      key={crypto.id}
      className={`${
        index % 2 === 0
          ? "bg-gray-100 dark:bg-gray-700"
          : "bg-white dark:bg-gray-800"
      } hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap`}
    >
      <td className="px-4 py-2">{crypto.market_cap_rank}</td>
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
    </tr>
  );

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="inline-flex w-full ">
        <h2 className="text-3xl font-semibold mb-4">
          Top 100 Cryptocurrencies
        </h2>
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
      </div>
      <div className="w-full overflow-x-auto">
        <table
          className="table-auto w-full rounded-lg overflow-hidden"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="bg-gray-200 dark:bg-gray-800 whitespace-nowrap w-full sticky z-10 top-0">
            <tr>
              <TableHeaderCell
                className="w-10 text-end"
                label="#"
                sortKey="market_cap_rank"
              />
              <TableHeaderCell
                className="!text-start"
                label="Name"
                sortKey="name"
              />
              <TableHeaderCell
                label="Current Price (USD)"
                sortKey="current_price"
              />
              <TableHeaderCell label="Market Cap (USD)" sortKey="market_cap" />
              <TableHeaderCell
                label="24h Change (%)"
                sortKey="price_change_percentage_24h"
              />
            </tr>
          </thead>
          <tbody>
            {filteredCryptoData.map((crypto, index) => (
              <CryptoRow key={crypto.id} crypto={crypto} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTop100Table;
