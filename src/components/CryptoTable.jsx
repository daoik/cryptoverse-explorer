import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCaretDown,
  FaCaretUp,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { addCommasToNumber } from "../scripts/addCommasToNumber";

const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");

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
      className={`px-4 py-2 cursor-pointer group w-full text-end ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      {label != "Name" && renderSortIcon(sortKey)}
      {label}
      {label == "Name" && renderSortIcon(sortKey)}
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
          <span className="inline-block text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-semibold  uppercase">
            {crypto.symbol}
          </span>
        </div>
      </td>

      <td className="px-4 py-2">${addCommasToNumber(crypto.current_price)}</td>
      <td className="px-4 py-2">${addCommasToNumber(crypto.market_cap)}</td>
      <td
        className={`px-4 py-2  ${
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
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        className="block w-full border-gray-300 z-50 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
        placeholder="Search by name or symbol"
        value={searchQuery}
        onChange={handleSearch}
      />
      <h2 className="text-3xl font-semibold mb-4">Top 100 Cryptocurrencies</h2>
      <div className="">
        {" "}
        <table className="table-auto w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-800 whitespace-nowrap">
            <tr>
              <TableHeaderCell
                className="w-min"
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

export default CryptoTable;
