import React from "react";
import CryptoTop100Table from "../components/CryptoTop100Table";
import { AiOutlineCompass } from "react-icons/ai";
import BackToTopButton from "../components/BackToTopButton";

function Top100Page() {
  return (
    <div className="transition-all duration-50 flex-grow bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-neutral-200  w-full">
      <div className="text-xl opacity-80 mt-4 mb-10 inline-flex items-center   space-x-5">
        Cryptoverse <AiOutlineCompass className="mx-2" /> Explorer
      </div>
      <div className="mx-auto mb-24">
        <CryptoTop100Table />
      </div>
      <BackToTopButton />
    </div>
  );
}

export default Top100Page;
