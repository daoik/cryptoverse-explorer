import React from "react";
import { AiOutlineCompass } from "react-icons/ai";
import AllCoinsTable from "../components/AllCoinsTable";

function AllCoinsPage() {
  return (
    <div className="transition-all duration-50 flex-grow bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-neutral-200  w-full">
      <div className="text-xl opacity-80 mt-4 mb-10 inline-flex items-center   space-x-5">
        Cryptoverse <AiOutlineCompass className="mx-2" /> Explorer
      </div>
      <div className="mx-auto px-32">
        <AllCoinsTable />
      </div>
    </div>
  );
}

export default AllCoinsPage;