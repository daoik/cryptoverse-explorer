import React from "react";
import CryptoTop100Table from "../components/CryptoTop100Table";

function Top100Page() {
  return (
    <div className="transition-all duration-50 flex-grow bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-neutral-200  w-full">
      <CryptoTop100Table />
    </div>
  );
}

export default Top100Page;
