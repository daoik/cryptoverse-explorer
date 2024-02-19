import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const APIKEY = import.meta.env.VITE_GECKO_API_KEY;
const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState([]);
  function addCommasToNumber(number) {
    const numberString = number.toString();

    // Split the string into integer and decimal parts (if any)
    const [integerPart, decimalPart] = numberString.split(".");

    // Add commas to the integer part
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    // If there is a decimal part, concatenate it back with the formatted integer part
    if (decimalPart) {
      return `${formattedIntegerPart}.${decimalPart}`;
    } else {
      return formattedIntegerPart;
    }
  }

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false?x_cg_demo_api_key=${APIKEY}`
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Top 10 Cryptocurrencies</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {cryptoData.map((crypto) => (
          <div className="md:hover:scale-110 transition-transform duration-50 ">
            <motion.li
              key={crypto.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 inline-flex md:flex md:flex-col  rounded-lg shadow-md dark:text-white "
            >
              <div className="icon relative inline-flex md:flex justify-center border-e md:border-b md:border-e-0 border-zinc-100 dark:border-zinc-700">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="h-12 mx-auto my-4 rounded-lg w-full"
                />
                <div className="mask absolute rounded-s-lg md:rounded-bl-none md:rounded-t-lg backdrop-blur-[20px] w-full h-full">
                  <img
                    src={crypto.image}
                    alt={crypto.name + " shadow"}
                    className="w-12 h-12 mx-auto my-4 "
                  />
                </div>
              </div>
              <div className="p-4">
                <motion.h3
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg font-semibold dark:text-teal-300"
                >
                  {crypto.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-700 dark:text-white"
                >
                  Price: ${crypto.current_price}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-gray-700 dark:text-white"
                >
                  Market Cap: ${addCommasToNumber(crypto.market_cap)}
                </motion.p>
              </div>
            </motion.li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;
