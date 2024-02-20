import React, { useState, useEffect } from "react";
import ReCharts from "./ReChart";
import { addCommasToNumber } from "../scripts/addCommasToNumber";
import { FaChevronDown, FaChevronUp, FaInfoCircle } from "react-icons/fa";
import tooltipData from "./tooltipData.json";
import Tooltip from "./Tooltip";
import InfoTooltipIcon from "./InfoTooltipIcon";
const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

function calculatePercentageFull(currentPrice, lowestPrice, highestPrice) {
  // Calculate the difference between the highest and lowest prices
  let priceRange = highestPrice - lowestPrice;

  // Calculate the difference between the current price and the lowest price
  let priceDifference = currentPrice - lowestPrice;

  // Calculate the percentage of the bar that is full
  let percentageFull = (priceDifference / priceRange) * 100;

  return percentageFull.toFixed(2); // Round to 2 decimal places
}

const CryptoDetails = ({ id }) => {
  const [coin, setCoin] = useState();
  const [percentageDifference, setPercentageDifference] = useState(0);
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/` +
            id +
            `/?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false?x_cg_demo_api_key=${APIKEY}`
        );
        const data = await response.json();
        setCoin(data);
        console.log(data.market_data.current_price.usd);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };
    fetchCoinData();
  }, [id]);
  useEffect(() => {
    setPercentageDifference(
      calculatePercentageFull(
        coin?.market_data?.current_price?.usd,
        coin?.market_data?.low_24h.usd,
        coin?.market_data?.high_24h.usd
      )
    );
  }, [coin]);
  useEffect(() => {
    console.log(percentageDifference);
  }, [percentageDifference]);

  const widthClass = `w-[${percentageDifference}%]`;

  return (
    <div className="flex  ">
      <div className="w-96 p-5 m-1.5 rounded-lg shadow bg-zinc-100 dark:bg-zinc-900">
        <div className="inline-flex items-center">
          <img className="h-12 p-1" src={coin?.image?.large} alt={coin?.name} />
          <h3>{coin?.name}</h3>{" "}
          <span className="inline-block text-gray-700 dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase">
            {coin?.symbol}
          </span>
          <span className="inline-block text-black dark:text-gray-300 px-1 text-xs bg-gray-100 dark:bg-gray-600 dark:border-black border rounded uppercase">
            #{coin?.market_cap_rank}
          </span>
        </div>
        <div className="inline-flex items-center">
          <h2 className="font-bold">
            {" "}
            ${addCommasToNumber(coin?.market_data?.current_price?.usd)}
          </h2>
          <div
            className={`px-4 py-2 inline-flex items-center text-end ${
              coin?.market_data?.price_change_percentage_24h >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {coin?.market_data?.price_change_percentage_24h >= 0 ? (
              <FaChevronUp className="p-0.5 pe-1 inline-flex" />
            ) : (
              <FaChevronDown className="p-0.5 pe-1 inline-flex" />
            )}
            {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </div>
        </div>
        <div className="24hbar my-2">
          <div className="bar w-[100%] h-4  overflow-hidden bg-gray-200 dark:bg-gray-400 rounded-full">
            <div
              style={{ width: `${percentageDifference}%` }}
              className={`bar-fill bg-gradient-to-r rounded-full from-[#f79d00] to-[#64f38c] h-full  w-[${widthClass}%]`}
            />
          </div>
          <div className="inline-flex w-full text-sm  justify-between">
            <div className="lo">
              ${addCommasToNumber(coin?.market_data?.low_24h.usd)}
            </div>
            <div className="timeframe ">24h</div>
            <div className="hi">
              ${addCommasToNumber(coin?.market_data?.high_24h.usd)}
            </div>
          </div>
        </div>
        <div className="values space-y-3 mt-3">
          <div className="market-cap inline-flex w-full justify-between">
            <div className="label inline-flex">
              Market Cap
              <InfoTooltipIcon content={tooltipData.market_cap} />
            </div>
            <div className="value tracking-wide font-semibold">
              {" "}
              ${addCommasToNumber(coin?.market_data?.market_cap.usd)}
            </div>
          </div>
          <div className="fdv inline-flex w-full justify-between">
            <div className="label inline-flex">
              Fully Diluted Valuation{" "}
              <InfoTooltipIcon content={tooltipData.fdv} />
            </div>
            <div className="value tracking-wide font-semibold">
              {" "}
              $
              {addCommasToNumber(
                coin?.market_data?.fully_diluted_valuation.usd
              )}
            </div>
          </div>
          <div className="volume inline-flex w-full justify-between">
            <div className="label inline-flex">
              24h Volume <InfoTooltipIcon content={tooltipData.vol} />
            </div>
            <div className="value tracking-wide font-semibold">
              {" "}
              ${addCommasToNumber(coin?.market_data?.total_volume.usd)}
            </div>
          </div>
          <div className="circ inline-flex w-full justify-between">
            <div className="label inline-flex">
              Circulating Supply <InfoTooltipIcon content={tooltipData.circ} />
            </div>
            <div className="value tracking-wide font-semibold">
              {" "}
              {addCommasToNumber(
                coin?.market_data?.circulating_supply.toFixed(0)
              )}
            </div>
          </div>
          <div className="max inline-flex w-full justify-between">
            <div className="label inline-flex">
              Max Supply <InfoTooltipIcon content={tooltipData.max} />
            </div>
            <div className="value tracking-wide font-semibold">
              {" "}
              {coin?.market_data?.max_suuply
                ? addCommasToNumber(coin?.market_data?.max_suuply.toFixed(0))
                : "∞"}
            </div>
          </div>
        </div>

        {/* <div dangerouslySetInnerHTML={{ __html: coin?.description?.en }} /> */}
      </div>
      <div className="shadow m-1.5 w-2/3 rounded-lg bg-zinc-100 dark:bg-zinc-900 ">
        <ReCharts id={id} />
      </div>
    </div>
  );
};
export default CryptoDetails;
