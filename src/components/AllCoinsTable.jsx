import React, { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
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
import Select from "react-select";
import { fetchCryptoData, searchCoins } from "./api";
import useGridViewStore from "../store/gridViewStore";
import GridCoin from "./GridCoin";

const AllCoinsTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "market_cap",
    direction: "desc",
  });

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const favorites = useFavoriteStore((state) => state.favorites);
  const gridView = useGridViewStore((state) => state.gridView);

  const handleRowClick = (crypto) => {
    navigate(`/cryptoverse-explorer/coins/${crypto.id}`);
  };
  useEffect(() => {
    fetchCryptoData(itemsPerPage, page)
      .then(setCryptoData)
      .catch((error) => console.error("Error fetching crypto data:", error));
  }, [page, itemsPerPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchCoins(searchQuery);
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
      } else if (e.key === "Escape") {
        inputRef.current.blur();
      }
    };

    document.addEventListener("keydown", handleSlashKeyDown);

    return () => {
      document.removeEventListener("keydown", handleSlashKeyDown);
    };
  }, []);

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

    if (sortConfig.key === key) {
      direction = sortConfig.direction === "desc" ? "asc" : "desc";
    }

    let sortedCryptoDataCopy = [...cryptoData];

    if (key === "favorite") {
      sortedCryptoDataCopy = sortedCryptoDataCopy.sort((a, b) => {
        const isAFavorite = favorites.indexOf(a.id);
        const isBFavorite = favorites.indexOf(b.id);

        if (isAFavorite && !isBFavorite) return -1;
        if (!isAFavorite && isBFavorite) return 1;

        // If both are favorites or both are not favorites, compare their positions
        if (isAFavorite && isBFavorite) {
          // When sorting in descending order, prioritize the favorite IDs first
          if (sortConfig.direction === "desc") {
            return favorites.indexOf(a.id) - favorites.indexOf(b.id);
          } else {
            // When sorting in ascending order, prioritize the favorite IDs last
            return favorites.indexOf(b.id) - favorites.indexOf(a.id);
          }
        }

        return 0;
      });
    } else {
      sortedCryptoDataCopy = sortedCryptoDataCopy.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setCryptoData(sortedCryptoDataCopy);
    setSortConfig({ key, direction });
  };

  const sortedCryptoData = [...cryptoData].sort((a, b) => {
    if (sortConfig.direction === "desc") {
      return a[sortConfig.key] > b[sortConfig.key] ? -1 : 1;
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
        {crypto.price_change_percentage_24h?.toFixed(2)}%
      </td>
      <td className="px-4 py-2 text-end">
        ${addCommasToNumber(crypto.market_cap)}
      </td>
      <td className="px-4 py-2 text-end">
        ${addCommasToNumber(crypto.low_24h)}
      </td>
      <td className="px-4 py-2 text-end">
        ${addCommasToNumber(crypto.high_24h)}
      </td>

      <td>
        {" "}
        <FavoriteButton id={crypto.id} />
      </td>
    </tr>
  );
  const handlePagination = (direction) => {
    if (direction === "next") {
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

    setFilteredResults(filtered);
  };
  const filtered = searchResults.filter((result) =>
    result.name.toLowerCase().indexOf(query.toLowerCase())
  );

  return (
    <div className="container mx-auto ">
      <div className="md:inline-flex md:w-full w-full ">
        <h2 className="text-3xl font-semibold mb-4">All Coins</h2>
        <form
          className="md:!ml-auto md:!mr-0 mx-auto w-80 relative"
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
              className="mt-1.5 dark:bg-zinc-800 z-10 bg-zinc-200 text-start rounded-md overflow-auto overflow-x-hidden absolute max-h-64 w-full scroll shadow-lg"
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
                    {coin.name}{" "}
                    <span className="inline-block dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase">
                      {coin.symbol}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </form>{" "}
      </div>
      {gridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {" "}
          {sortedCryptoData.map((crypto, index) => (
            <GridCoin key={crypto.id} coin={crypto} />
          ))}
        </div>
      ) : (
        <div className="">
          <table className="table-auto w-full rounded-lg overflow-hidden">
            <thead className="bg-zinc-300 dark:bg-zinc-900  w-full ">
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
                <TableHeaderCell
                  label="24h Change (%)"
                  sortKey="price_change_percentage_24h"
                />
                <TableHeaderCell
                  label="Market Cap (USD)"
                  sortKey="market_cap"
                />

                <TableHeaderCell label="24h Low" sortKey="low_24h" />
                <TableHeaderCell label="24h High" sortKey="high_24h" />

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
        </div>
      )}{" "}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="items-center justify-center h-full space-x-5 my-5 mx-auto inline-flex  w-full"
      >
        <button
          disabled={page === 1}
          className="h-full text-zinc-800 bg-zinc-100 disabled:border-none disabled:opacity-50 border border-[#ccc] dark:bg-zinc-800  dark:text-zinc-100"
          onClick={() => handlePagination("prev")}
        >
          <FaArrowLeft />
        </button>
        <input
          min={1}
          // type="number"
          value={page}
          // defaultValue={page}
          onChange={(e) => setPage(e.target.value)}
          className="w-10 p-1 py-2 outline-none h-full bg-zinc-100 border hover:border-[#646cff] active:border-[#646cff] border-[#ccc] dark:bg-zinc-800 rounded-lg text-center dark:text-zinc-100"
        />
        <Select
          isSearchable={false}
          defaultValue={itemsPerPage}
          menuPlacement="bottom"
          classNames={{
            menu: () =>
              "bg-zinc-100 dark:bg-zinc-800  !rounded-lg overflow-hidden",
            option: () => " bg-zinc-100 dark:bg-zinc-800 hover:!bg-zinc-500",
            menuPortal: () => "z-40  ",
            selectedOption: () => "bg-red-500",
            singleValue: () => "dark:text-zinc-100 text-zinc-800 ",
            control: () =>
              " dark:!bg-zinc-800 !bg-zinc-100 !rounded-lg !h-full !cursor-pointer hover:!border hover:!border-[#646cff] ",
            placeholder: () => " bg-zinc-100  dark:text-zinc-100",
          }}
          options={[
            { value: 50, label: "50 per page" },
            { value: 100, label: "100 per page" },
            { value: 250, label: "250 per page" },
          ]}
          value={{ value: itemsPerPage, label: `${itemsPerPage} per page` }}
          onChange={(selectedOption) => {
            setItemsPerPage(selectedOption.value);
            setPage(1); // Reset page to 1 when changing items per page
          }}
          className="border-none outline-none rounded-lg color-black"
        />
        <button
          className="h-full text-zinc-800 bg-zinc-100 border border-[#ccc] dark:bg-zinc-800 dark:text-zinc-100"
          onClick={() => handlePagination("next")}
        >
          <FaArrowRight />
        </button>{" "}
      </form>
    </div>
  );
};

export default AllCoinsTable;
