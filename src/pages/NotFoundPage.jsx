import React from "react";
import { AiOutlineCompass } from "react-icons/ai";

const NotFoundPage = () => {
  return (
    <div className="transition-all duration-50 flex-grow bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-neutral-200  w-full">
      <div className="text-xl opacity-80 mt-4  inline-flex items-center space-x-5">
        Cryptoverse <AiOutlineCompass className="mx-2" /> Explorer
      </div>
      <div className="m-10 moon-bg ] text-start">
        <div className="inline-flex w-full ">
          <div className="favorites w-full items-center  justify-center flex-col">
            <h2 className="text-3xl font-semibold text-center mb-4">
              Error 404: Page Not Found
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
