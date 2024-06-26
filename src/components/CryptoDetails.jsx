import React, { useState, useEffect, useMemo } from "react";
import ReCharts from "./ReChart";
import { addCommasToNumber } from "../scripts/addCommasToNumber";
import { FaChevronDown, FaChevronUp, FaTag } from "react-icons/fa";
import tooltipData from "./tooltipData.json";
import Tooltip from "./Tooltip";
import InfoTooltipIcon from "./InfoTooltipIcon";
import FavoriteButton from "./FavoriteButton";
import { fetchCoinData } from "./api";

import Select from "react-select";
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
  const [timeframe, setTimeframe] = useState("1");

  useEffect(() => {
    fetchCoinData(id)
      .then(setCoin)
      .catch((error) => console.error("Error fetching crypto data:", error));
  }, [id]);

  const percentageDifference = useMemo(() => {
    if (!coin) return 0;
    return calculatePercentageFull(
      coin?.market_data?.current_price?.usd,
      coin?.market_data?.low_24h.usd,
      coin?.market_data?.high_24h.usd
    );
  }, [coin]);

  const widthClass = `w-[${percentageDifference}%]`;

  return coin ? (
    <div className="flex flex-col ">
      <div className="flex flex-col lg:!flex-row">
        <div className=" xs:w-full flex flex-col flex-1  p-5 m-1.5 rounded-lg shadow bg-zinc-100 dark:bg-zinc-900">
          <div className="inline-flex w-full items-center ">
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
            <FavoriteButton className="ml-auto" id={id} />
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
            <div className="bar w-full h-4  overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner shadow-gray-300 dark:shadow-gray-800">
              <div
                style={{ width: `${percentageDifference}%` }}
                className={`bar-fill bg-gradient-to-r rounded-full from-[#f79d00] to-[#64f38c] h-full  shadow shadow-gray-300 dark:shadow-gray-800 w-[${widthClass}%]`}
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
            <div className="market-cap inline-flex w-full justify-between md:me-3">
              <div className="label inline-flex">
                Market Cap
                <InfoTooltipIcon content={tooltipData.market_cap} />
              </div>
              <div className="value tracking-wide font-semibold">
                ${addCommasToNumber(coin?.market_data?.market_cap.usd)}
              </div>
            </div>
            <div className="fdv inline-flex w-full justify-between md:me-3">
              <div className="label  inline-flex">
                <div className="md:whitespace-nowrap">
                  {" "}
                  Fully Diluted Valuation{" "}
                </div>
                <InfoTooltipIcon content={tooltipData.fdv} />
              </div>
              <div className="value tracking-wide font-semibold">
                $
                {addCommasToNumber(
                  coin?.market_data?.fully_diluted_valuation.usd
                )}
              </div>
            </div>
            <div className="volume inline-flex w-full justify-between md:me-3">
              <div className="label inline-flex">
                24h Volume <InfoTooltipIcon content={tooltipData.vol} />
              </div>
              <div className="value tracking-wide font-semibold">
                ${addCommasToNumber(coin?.market_data?.total_volume?.usd)}
              </div>
            </div>
            <div className="circ inline-flex w-full justify-between md:me-3">
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
            <div className="max inline-flex w-full justify-between md:me-3">
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

        <div className="shadow m-1.5  w-full h-[420px] lg:h-auto rounded-lg bg-zinc-100 dark:bg-zinc-900 ">
          <div className="flex w-full mt-2 -mb-4 items-center justify-end">
            <div className="text-sm opacity-50">Currency:</div>
            <Select
              isSearchable={false}
              isDisabled={true}
              classNames={{
                menu: () =>
                  "bg-zinc-100 dark:bg-zinc-800  !rounded-lg overflow-hidden",
                option: () =>
                  " bg-zinc-100 dark:bg-zinc-800 hover:!bg-zinc-500",
                menuPortal: () => "z-10  ",
                selectedOption: () => "bg-red-500",
                singleValue: () => "dark:text-zinc-100 text-zinc-800 ",
                control: () =>
                  " dark:!bg-zinc-800 !bg-zinc-100 !rounded-lg !h-full !cursor-pointer hover:!border hover:!border-[#646cff] ",
                placeholder: () => " bg-zinc-100  dark:text-zinc-100",
              }}
              defaultValue={{ value: "usd", label: "USD" }}
              className="border-none outline-none scale-75 rounded-lg color-black dark:opacity-50"
            />{" "}
            <div className="text-sm ">Timeframe:</div>
            <Select
              isSearchable={false}
              defaultValue={{ value: 1, label: "24 hours" }}
              classNames={{
                menu: () =>
                  "!bg-zinc-100 dark:!bg-zinc-800  !rounded-lg overflow-hidden",
                option: () =>
                  " bg-zinc-100 dark:bg-zinc-800 hover:!bg-zinc-500",
                menuPortal: () => "!z-50  ",

                singleValue: () => "dark:!text-zinc-100 ",
                control: () =>
                  " dark:!bg-zinc-800 !bg-zinc-100 !rounded-lg !h-full !cursor-pointer hover:!border hover:!border-[#646cff] ",
                placeholder: () =>
                  " text-white !bg-zinc-100  dark:text-zinc-100",
              }}
              options={[
                { value: 1, label: "24 hours" },
                { value: 7, label: "Week" },
                { value: 30, label: "Month" },
                { value: 60, label: "2 Months" },
                { value: 100, label: "100 Days" },
                { value: 200, label: "200 Days" },
                { value: 365, label: "1 Year" },
              ]}
              onChange={(selectedOption) => {
                setTimeframe(selectedOption.value);
              }}
              className="border-none z-40 outline-none scale-75 rounded-lg  "
            />
          </div>
          <div className=" w-full h-96">
            <ReCharts id={id} timeframe={timeframe} />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:!flex-row">
        <div className="md:w-96 flex flex-col p-5 m-1.5 rounded-lg shadow bg-zinc-100 dark:bg-zinc-900">
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
              <div
                key={category}
                className="text-xs tracking-tighter flex bg-gray-500 text-neutral-100 p-0.5 px-1.5 rounded m-1 "
              >
                <div className="whitespace-nowrap inline-flex items-center">
                  {/* <FaTag className="p-0.5" /> */}
                  {category}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-full p-5 m-1.5 rounded-lg shadow bg-zinc-100 dark:bg-zinc-900">
          <h5 className="font-bold mb-3"> Description </h5>
          {coin?.description?.en && coin.description.en.length > 0 ? (
            <div dangerouslySetInnerHTML={{ __html: coin.description.en }} />
          ) : (
            "No description available"
          )}
        </div>
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

export default CryptoDetails;
