import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FavoriteButton from "./FavoriteButton";
import { addCommasToNumber } from "../scripts/addCommasToNumber";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { fetchCoinData } from "./api";

const CardCoin = ({ coin }) => {
  const [coinData, setCoinData] = useState({});
  const navigate = useNavigate();
  const handeCardClick = () => {
    navigate(`/cryptoverse-explorer/coins/${coinData.id}`);
  };

  useEffect(() => {
    setCoinData(coin);
  }, []);

  return (
    coinData && (
      <div
        onClick={handeCardClick}
        className="p-3 w-72 h-32  m-3 self-center transform-all  cursor-pointer hover:outline outline-2 outline-purple-900 hover:bg-zinc-100 rounded-lg shadow-md bg-zinc-200 dark:bg-gray-600 dark:hover:bg-zinc-800 flex flex-col"
      >
        {" "}
        <div className="flex-1 flex items-center">
          <h3 className="text-xl  inline-flex  w-full justify-between items-center font-semibold mb-4 text-orange-700 dark:text-orange-300">
            <img className="h-6 pe-2" src={coinData.image} /> {coinData.name}{" "}
            <span className="inline-block text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase">
              {coinData.symbol}
            </span>
            <FavoriteButton className="px-2" id={coinData.id} />
          </h3>
        </div>
        <div className="inline-flex mt-auto">
          <div className="text-3xl">
            ${addCommasToNumber(coinData?.current_price)}
          </div>
          <div
            className={`px-4 py-2 inline-flex items-center text-end ml-auto ${
              coinData?.price_change_percentage_24h >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {coinData?.price_change_percentage_24h >= 0 ? (
              <FaChevronUp className="p-0.5 pe-1 inline-flex" />
            ) : (
              <FaChevronDown className="p-0.5 pe-1 inline-flex" />
            )}
            {coinData?.price_change_percentage_24h?.toFixed(2)}%
          </div>
        </div>
      </div>
    )
  );
};

export default CardCoin;
