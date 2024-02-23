import React from "react";
import { AiOutlineInfoCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { BiBitcoin } from "react-icons/bi";
import Card from "./Card";

const CryptoInfoSection = () => {
  return (
    <div className=" text-white w-full py-20 bg-gradient-radial from-gray-100 to-zinc-200 dark:from-gray-800 dark:to-zinc-800 shadow-xl">
      <div className="container mx-auto  flex flex-col lg:!flex-row w-full items-center space-y-4  justify-around">
        <Card
          icon={<AiOutlineInfoCircle size={40} />}
          title="About"
          description="Learn more about cryptocurrencies"
          delay={0}
        />
        <Card
          icon={<AiOutlineDollarCircle size={40} />}
          title="Market"
          description="Explore cryptocurrency market trends"
          delay={0.25}
        />
        <Card
          icon={<BiBitcoin size={40} />}
          title="Bitcoin"
          description="Information about Bitcoin"
          delay={0.5}
        />
      </div>
    </div>
  );
};

export default CryptoInfoSection;
