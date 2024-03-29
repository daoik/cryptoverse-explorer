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
        className="p-3 w-72 h-40  m-3 self-center  transition-all  cursor-pointer hover:outline outline-2 outline-purple-900 hover:bg-zinc-100 rounded-lg shadow-md bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-gray-600 flex flex-col"
      >
        {" "}
        <div className="h-1/3 flex items-center">
          <h3 className="text-xl  inline-flex  w-full justify-center items-center font-semibold mb-4 text-orange-700 dark:text-orange-300">
            <img className="h-6 pe-2" src={coinData.image} /> {coinData.name}{" "}
            <span className="inline-block text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase">
              {coinData.symbol}
            </span>
            <FavoriteButton className="px-2 ml-auto" id={coinData.id} />
          </h3>
        </div>
        <div className="inline-flex mt-auto">
          <div className="text-3xl">
            ${addCommasToNumber(coinData?.current_price)}
          </div>

          <div
            className={`px-4 py-2 inline-flex items-center text-end  ${
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
        </div>{" "}
        <div className="flex mt-auto items-center opacity-75">
          <div className="flex flex-col">
            <div className="text-xs text-start tracking-tighter whitespace-nowrap  me-0.5">
              Market Cap:
            </div>
            <div className="text-sm">
              ${addCommasToNumber(coinData?.market_cap)}
            </div>
          </div>
          <div className="whitespace-nowrap  ml-auto">
            <div className="flex  items-center flex-col">
              <div className="text-xs tracking-tighter me-0.5">
                H: ${addCommasToNumber(coinData?.high_24h)}
              </div>
            </div>
            <div className="whitespace-nowrap ">
              <div className="text-xs tracking-tighter me-0.5">
                L: ${addCommasToNumber(coinData?.low_24h)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CardCoin;
