import React from "react";

const Tooltip = ({ content, className, showArrow }) => {
  return (
    <div
      id="tooltip3"
      role="tooltip"
      className={`${className} absolute -left-14 -ml-1 mt-3 pointer-events-none transition-all duration-150 ease-in-out bg-gray-800 dark:bg-gray-300 px-3 py-2 rounded`}
    >
      {showArrow && (
        <svg
          className="absolute -top-1 left-1/2 transform -translate-x-1/2 -mt-px fill-gray-800 dark:fill-gray-300"
          width="10px"
          height="6px"
          viewBox="0 0 10 6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0 6 5 0 10 6" />
        </svg>
      )}
      <p className="text-xs justify-center flex leading-tighter tracking-tighter text-white dark:text-gray-900 ">
        {content}
      </p>
    </div>
  );
};

export default Tooltip;
