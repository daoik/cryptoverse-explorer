import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FavoriteButton from "./FavoriteButton";
const APIKEY = import.meta.env.VITE_GECKO_API_KEY;
import { addCommasToNumber } from "../scripts/addCommasToNumber";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { fetchCoinData } from "./api";

const CardCoin = ({ coin }) => {
  const [coinData, setCoinData] = useState({});
  const navigate = useNavigate();
  const handeCardClick = (coin) => {
    navigate(`/cryptoverse-explorer/coins/${coinData.id}`);
  };
  useEffect(() => {
    fetchCoinData(coin)
      .then(setCoinData)
      .catch((error) => console.error("Error fetching crypto data:", error));
  }, [coin]);

  return (
    coinData && (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={handeCardClick}
        className="p-3 w-72  m-3 self-center transform-all  cursor-pointer hover:outline outline-2 outline-purple-900 hover:bg-zinc-100 rounded-lg shadow-md bg-zinc-200 dark:bg-gray-600 dark:hover:bg-zinc-800 flex flex-col"
      >
        <h3 className="text-xl  inline-flex  w-full justify-between items-center font-semibold mb-4 text-orange-700 dark:text-orange-300">
          <img className="h-6 pe-2" src={coinData.image?.large} />{" "}
          {coinData.name}{" "}
          <span className="inline-block text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase">
            {coinData.symbol}
          </span>
          <FavoriteButton className="px-2" id={coin} />
        </h3>
        <div className="inline-flex ">
          <div className="text-3xl">
            ${addCommasToNumber(coinData?.market_data?.current_price?.usd)}
          </div>
          <div
            className={`px-4 py-2 inline-flex items-center text-end ${
              coinData?.market_data?.price_change_percentage_24h >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {coinData?.market_data?.price_change_percentage_24h >= 0 ? (
              <FaChevronUp className="p-0.5 pe-1 inline-flex" />
            ) : (
              <FaChevronDown className="p-0.5 pe-1 inline-flex" />
            )}
            {coinData?.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </div>
        </div>

        {/* Adjust this line according to the structure of your API response */}
        {/* <p className="text-gray-700 mb-4 dark:text-white">{body}</p> */}
        {/* <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded dark:bg-teal-700 dark:hover:bg-teal-600 mt-auto">
        {button}
      </button> */}
      </motion.div>
    )
  );
};

export default CardCoin;
