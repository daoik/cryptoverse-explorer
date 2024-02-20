import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import CryptoList from "./CryptoList";
import CryptoTable from "./CryptoTable";
import DXChart from "./DXChart";
const Main = () => {
  return (
    <main className="flex-grow bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-4 w-screen">
      <div className="max-w-4xl mx-auto">
        {/* <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-8 text-center text-teal-700 dark:text-teal-300"
        >
          Welcome to CryptoVerse Explorer
        </motion.h2> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            title="Explore Cryptocurrencies"
            body="Discover thousands of cryptocurrencies and learn about their
            prices, market caps, trading volumes, and more."
            button="Browse Cryptos"
          />

          <Card
            title="Search Coins"
            body="Use our powerful search functionality to find specific coins quickly and easily."
            button="Search Coins"
          />
        </div> */}
        {/* <CryptoList /> */}
        {/* <DXChart id="bitcoin" /> */}
        <CryptoTable />
      </div>
    </main>
  );
};

export default Main;
