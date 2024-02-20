// Tooltip.js
import React from "react";

const Tooltip = ({ content, className }) => {
  return (
    <div
      id="tooltip3"
      role="tooltip"
      className={`${className} z-999  absolute -left-14 -ml-1 mt-3 transition-all duration-150 ease-in-out bg-gray-800 dark:bg-gray-400 px-3 py-2  rounded`}
    >
      <svg
        className="absolute -top-1 left-1/2 transform -translate-x-1/2 -mt-px fill-gray-800 dark:fill-gray-400"
        width="10px"
        height="6px"
        viewBox="0 0 10 6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0 6 5 0 10 6" />
      </svg>
      <p className="text-xs justify-center flex leading-4 text-white">
        {content}
      </p>
    </div>
  );
};

export default Tooltip;
