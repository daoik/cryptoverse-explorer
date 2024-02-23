import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FavoriteButton from "./FavoriteButton";
const APIKEY = import.meta.env.VITE_GECKO_API_KEY;

const CardCoin = ({ coin }) => {
  const [coinData, setCoinData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}?x_cg_demo_api_key=${APIKEY}`
        );
        const data = await response.json();
        setCoinData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [coin]);

  console.log(coin);

  return (
    coinData && (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-3 self-center rounded-lg shadow-md bg-white dark:bg-gray-600 flex flex-col"
      >
        <h3 className="text-xl  inline-flex items-center font-semibold mb-4 text-orange-700 dark:text-orange-300">
          <img className="h-6 pe-2" src={coinData.image?.large} />{" "}
          {coinData.name}
          <FavoriteButton className="px-2" id={coin} />
        </h3>

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
