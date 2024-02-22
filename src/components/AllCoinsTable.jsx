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

import { useNavigate } from "react-router-dom";
const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const AllCoinsTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

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
  }, [page, itemsPerPage]);

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
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
          ? "bg-zinc-200 dark:bg-zinc-700"
          : "bg-gray-50 dark:bg-zinc-800"
      } cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-500 transition-colors whitespace-nowrap `}
      onClick={() => handleRowClick(crypto)}
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
  const handlePagination = (direction) => {
    if (direction === "next") {
      console.log("Current page:", page); // Add this line for debugging
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
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

  return (
    <div className="container mx-auto ">
      <div className="inline-flex w-full ">
        <h2 className="text-3xl font-semibold mb-4">All Coins</h2>
      </div>
      <div className="w-full overflow-x-auto">
        <table
          className="table-auto w-full rounded-lg overflow-hidden border border-white"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="bg-zinc-300 dark:bg-zinc-900 whitespace-nowrap w-full ">
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
