import React from "react";
import { AiOutlineCompass } from "react-icons/ai";

const NotFoundPage = () => {
  return (
    <div className="transition-all duration-50 flex-grow bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-neutral-200  w-full">
      <div className="text-xl opacity-80 mt-4  inline-flex items-center space-x-5">
        Cryptoverse <AiOutlineCompass className="mx-2" /> Explorer
      </div>
      <div className="m-10 relative text-start flex flex-col">
        <div className="inline-flex w-full mt-52">
          <div className="favorites w-full items-center text-center justify-center flex-col">
            <h2 className="text-3xl font-semibold text-center mb-10">
              Page Not Found
            </h2>
            <p className="text-lg mt-10 text-gray-600 dark:text-gray-300">
              Oops! Looks like you've stumbled upon a page that doesn't exist.
            </p>
          </div>
        </div>
        <div className="w-full  absolute scale-y-150 scale-x-110 z-20 top-3 opacity-25 mt-52">
          <div className="favorites w-full items-center text-center justify-center flex-col">
            <h2 className="text-9xl blur font-bold  text-center mb-4">404</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
