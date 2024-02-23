import React, { useState, useEffect } from "react";
import ReCharts from "./ReChart";
import { addCommasToNumber } from "../scripts/addCommasToNumber";
import { FaChevronDown, FaChevronUp, FaTag } from "react-icons/fa";
import tooltipData from "./tooltipData.json";
import Tooltip from "./Tooltip";
import InfoTooltipIcon from "./InfoTooltipIcon";

const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

function calculatePercentageFull(currentPrice, lowestPrice, highestPrice) {
  let priceRange = highestPrice - lowestPrice;
  let priceDifference = currentPrice - lowestPrice;
  let percentageFull = (priceDifference / priceRange) * 100;

  return percentageFull.toFixed(2);
}

const replaceUnnecessary = (str) => {
  return str
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/$/, "")
    .replace(",,", "")
    .replace("en/", "")
    .replace("home/", "");
};
const CryptoDetails = ({ id }) => {
  const [coin, setCoin] = useState();
  const [percentageDifference, setPercentageDifference] = useState(0);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false?x_cg_demo_api_key=${APIKEY}`
        );
        const data = await response.json();
        setCoin(data);
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
    <div className="flex flex-col m-10">
      <div className="flex sm:flex-col lg:flex-row">
        <div className=" xs:w-full  md:w-2/5 p-5 m-1.5 rounded-lg shadow bg-zinc-100 dark:bg-zinc-900">
          <div className="inline-flex items-center ">
            <img
              className="h-12 p-1"
              src={coin?.image?.large}
              alt={coin?.name}
            />
            <h3>{coin?.name}</h3>
            <span className="inline-block text-gray-700  dark:text-gray-300 px-2 py-1 text-xs font-semibold uppercase">
              {coin?.symbol}
            </span>
            {coin?.market_cap_rank && (
              <span className="inline-block text-black dark:text-gray-300 px-1 text-xs bg-gray-100 dark:bg-gray-600 dark:border-black border rounded uppercase">
                #{coin?.market_cap_rank}
              </span>
            )}
          </div>
          <div className="inline-flex items-center">
            <h2 className="font-bold">
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
                ${addCommasToNumber(coin?.market_data?.market_cap.usd)}
              </div>
            </div>
            <div className="fdv inline-flex w-full justify-between">
              <div className="label inline-flex">
                Fully Diluted Valuation{" "}
                <InfoTooltipIcon content={tooltipData.fdv} />
              </div>
              <div className="value tracking-wide font-semibold">
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
                ${addCommasToNumber(coin?.market_data?.total_volume?.usd)}
              </div>
            </div>
            <div className="circ inline-flex w-full justify-between">
              <div className="label inline-flex">
                Circulating Supply{" "}
                <InfoTooltipIcon content={tooltipData.circ} />
              </div>
              <div className="value tracking-wide font-semibold">
                {addCommasToNumber(
                  coin?.market_data?.circulating_supply?.toFixed(0)
                )}
              </div>
            </div>
            <div className="max inline-flex w-full justify-between">
              <div className="label inline-flex">
                Max Supply <InfoTooltipIcon content={tooltipData.max} />
              </div>
              <div className="value tracking-wide font-semibold">
                {coin?.market_data?.max_suuply
                  ? addCommasToNumber(coin?.market_data?.max_supply?.toFixed(0))
                  : "∞"}
              </div>
            </div>
          </div>
        </div>
        <div className="shadow m-1.5  w-full rounded-lg bg-zinc-100 dark:bg-zinc-900 ">
          <ReCharts id={id} />
        </div>
      </div>
      <div className="inline-flex">
        <div className="w-96 flex flex-col p-5 m-1.5 rounded-lg shadow bg-zinc-100 dark:bg-zinc-900">
          <h5 className="font-bold mb-3"> Info </h5>
          <div className="website inline-flex w-full justify-between mb-2">
            <div className="label inline-flex">Website</div>
            <a
              className="font-semibold text-zinc-500 text-sm hover:bg-gray-300 bg-gray-200 p-1 px-2 rounded-lg overflow-x-hidden overflow-ellipsis"
              href={coin?.links?.homepage && coin.links.homepage[0]}
            >
              {coin?.links?.homepage &&
                replaceUnnecessary(coin.links.homepage[0]?.toString())}
            </a>
          </div>
          {coin?.links?.whitepaper && (
            <div className="wp inline-flex w-full justify-between mb-2">
              <div className="label inline-flex">Whitepaper</div>
              <a
                className="font-semibold text-zinc-500 text-sm hover:bg-gray-300 bg-gray-200 p-1 px-2 rounded-lg overflow-x-hidden overflow-ellipsis"
                href={coin?.links?.whitepaper}
              >
                Whitepaper
              </a>
            </div>
          )}
          {coin?.links?.blockchain_site && coin.links.blockchain_site[0] && (
            <div className="bs inline-flex w-full justify-between mb-2">
              <div className="label inline-flex">Blockchain Site</div>
              <a
                className="font-semibold text-zinc-500 text-sm hover:bg-gray-300 bg-gray-200 p-1 px-2 max-w-48 rounded-lg overflow-x-hidden overflow-ellipsis"
                href={coin?.links?.blockchain_site[0]}
              >
                {replaceUnnecessary(
                  coin?.links?.blockchain_site[0]?.toString()
                )}
              </a>
            </div>
          )}
          {coin?.links?.official_forum_url &&
            coin.links.official_forum_url[0] && (
              <div className="forum inline-flex w-full justify-between mb-2">
                <div className="label inline-flex">Official Forum</div>
                <a
                  className="font-semibold text-zinc-500 text-sm hover:bg-gray-300 bg-gray-200 p-1 px-2 rounded-lg overflow-x-hidden overflow-ellipsis"
                  href={coin?.links?.official_forum_url[0]}
                >
                  {replaceUnnecessary(
                    coin?.links?.official_forum_url[0]?.toString()
                  )}
                </a>
              </div>
            )}
          {coin?.links?.chat_url && coin.links.chat_url[0] && (
            <div className="chat inline-flex w-full justify-between mb-2">
              <div className="label inline-flex">Chat URL</div>
              <a
                className="font-semibold text-zinc-500 text-sm hover:bg-gray-300 bg-gray-200 p-1 px-2 rounded-lg overflow-x-hidden overflow-ellipsis"
                href={coin?.links?.chat_url[0]}
              >
                {replaceUnnecessary(coin?.links?.chat_url[0]?.toString())}
              </a>
            </div>
          )}
          {coin?.links?.announcement_url && coin.links.announcement_url[0] && (
            <div className="announcement inline-flex w-full justify-between mb-2">
              <div className="label inline-flex">Announcement URL</div>
              <a
                className="font-semibold text-zinc-500 text-sm hover:bg-gray-300 bg-gray-200 p-1 px-2 rounded-lg overflow-x-hidden overflow-ellipsis"
                href={coin?.links?.announcement_url[0]}
              >
                {replaceUnnecessary(
                  coin?.links?.announcement_url[0]?.toString()
                )}
              </a>
            </div>
          )}
          <div className="divider mb-3 mt-auto opacity-20 w-full h-0.5 bg-gray-500" />
          <div className="categories flex flex-wrap ">
            {coin?.categories?.map((category, index) => (
              <div className="text-xs tracking-tighter flex bg-gray-500 text-neutral-100 p-0.5 px-1.5 rounded m-1 ">
                <div className="whitespace-nowrap inline-flex items-center">
                  {/* <FaTag className="p-0.5" /> */}
                  {category}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full p-5 m-1.5 rounded-lg shadow bg-zinc-100 dark:bg-zinc-900">
          <h5 className="font-bold mb-3"> Description </h5>
          {coin?.description?.en && coin.description.en.length > 0 ? (
            <div dangerouslySetInnerHTML={{ __html: coin.description.en }} />
          ) : (
            "No description available"
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
