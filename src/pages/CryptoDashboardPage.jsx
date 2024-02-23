import React from "react";
import { useParams } from "react-router-dom";
import { AiOutlineCompass } from "react-icons/ai";
import CryptoDetails from "../components/CryptoDetails"; // Add import statement

const CryptoDashboardPage = () => {
  let { id } = useParams();
  return (
    <div className="transition-all duration-50 flex-grow bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-neutral-200  w-full">
      <div className="text-xl opacity-80 mt-4  inline-flex items-center  mb-10 space-x-5">
        Cryptoverse <AiOutlineCompass className="mx-2" /> Explorer
      </div>
      <div className="mx-auto container text-start">
        <CryptoDetails id={id} />
      </div>
    </div>
  );
};

export default CryptoDashboardPage;
