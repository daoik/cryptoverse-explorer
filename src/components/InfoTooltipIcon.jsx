import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import Tooltip from "./Tooltip";

const InfoTooltipIcon = ({ content }) => {
  // Destructure the content prop
  return (
    <div className="group relative items-center p-1 inline-flex ">
      <FaInfoCircle className="h-3 opacity-80 group-hover:opacity-100" />
      {content && (
        <Tooltip
          className="opacity-0 pointer-events-none group-hover:pointer-events-auto z-50 w-32  h-auto top-8 group-hover:top-4 group-hover:opacity-90 backdrop-blur-sm "
          content={content}
          showArrow={false}
        />
      )}
    </div>
  );
};

export default InfoTooltipIcon;
