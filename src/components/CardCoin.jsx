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
  const handeCardClick = (coin) => {
    navigate(`/cryptoverse-explorer/coins/${coinData.id}`);
  };
  // this component fetches its own data, so it shouldn't be used exessively
  useEffect(() => {
    fetchCoinData(coin)
      .then(setCoinData)
      .catch((error) => console.error("Error fetching crypto data:", error));
  }, [coin]);

  return (
    coinData && (
      <div
        onClick={handeCardClick}
        className="p-3 w-72 h-40  m-3 self-center  transition-all  cursor-pointer hover:outline outline-2 outline-purple-900 hover:bg-zinc-100 rounded-lg shadow-md bg-zinc-200 dark:bg-gray-600 dark:hover:bg-zinc-800 flex flex-col"
      >
        {" "}
        <div className="h-1/3 flex items-center">
          <h3 className="text-xl  inline-flex  w-full justify-center items-center font-semibold mb-4 text-orange-700 dark:text-orange-300">
            <img className="h-6 pe-2" src={coinData?.image?.large} />{" "}
            {coinData?.name}{" "}
            <span className="inline-block text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase">
              {coinData.symbol}
            </span>
            <FavoriteButton className="px-2 ml-auto" id={coinData.id} />
          </h3>
        </div>
        <div className="inline-flex mt-auto">
          <div className="text-3xl">
            ${addCommasToNumber(coinData?.market_data?.current_price.usd)}
          </div>

          <div
            className={`px-4 py-2 inline-flex items-center text-end  ${
              coinData?.market_data?.price_change_percentage_24h >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {coinData?.price_change_percentage_24h >= 0 ? (
              <FaChevronUp className="p-0.5 pe-1 inline-flex" />
            ) : (
              <FaChevronDown className="p-0.5 pe-1 inline-flex" />
            )}
            {coinData?.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </div>
        </div>{" "}
        <div className="flex mt-auto items-center opacity-75">
          <div className="flex flex-col">
            <div className="text-xs text-start tracking-tighter whitespace-nowrap  me-0.5">
              Market Cap:
            </div>
            <div className="text-sm">
              ${addCommasToNumber(coinData?.market_data?.market_cap.usd)}
            </div>
          </div>
          <div className="whitespace-nowrap  ml-auto">
            <div className="flex  items-center flex-col">
              <div className="text-xs tracking-tighter me-0.5">
                H: ${addCommasToNumber(coinData?.market_data?.high_24h.usd)}
              </div>
            </div>
            <div className="whitespace-nowrap ">
              <div className="text-xs tracking-tighter me-0.5">
                L: ${addCommasToNumber(coinData?.market_data?.low_24h.usd)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CardCoin;
