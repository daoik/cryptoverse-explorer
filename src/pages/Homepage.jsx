import React from "react";
import { motion } from "framer-motion";
import { AiOutlineInfoCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { BiBitcoin } from "react-icons/bi";
import CryptoSearch from "../components/CryptoSearch";
import astronaut from "../assets/astro.png";
const Homepage = () => {
  return (
    <div>
      <div className=" text-white py-20 grid-bg ba-grid anim">
        <div className="inner"></div>
        <div className="container h-[700px] flex items-center justify-center flex-col mx-auto text-center ">
          <div className="text-5xl font-bold mb-4">Cryptoverse Explorer</div>
          <p className="text-lg mb-8">Explore the world of cryptocurrencies</p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-teal-900 px-6 py-3 rounded-lg shadow-lg hover:bg-teal-100 transition-colors duration-300 ease-in-out"
          >
            Get Started
          </motion.button>
        </div>
      </div>
      <CryptoInfoSection />
      <CryptoSearch />
      <CTA />
    </div>
  );
};

const CryptoInfoSection = () => {
  return (
    <div className=" text-white w-full py-20 bg-gradient-radial from-gray-100 to-zinc-200 dark:from-gray-800 dark:to-zinc-800 shadow-xl">
      <div className="container mx-auto flex w-full  justify-around">
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
const CTA = () => {
  return (
    <div className=" text-white w-full py-20 bg-gradient-radial from-gray-100 to-zinc-200 dark:from-gray-800 dark:to-zinc-800 shadow-xl">
      <div className="container mx-auto flex w-full  flex-col justify-around">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="text-gray-800 dark:text-zinc-300 rounded-lg p-6 
           flex flex-col items-center  "
        >
          <h3>Don't miss your chance</h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className=" my-4 text-gray-800 dark:text-zinc-300 rounded-lg p-6 flex flex-col items-center  "
        >
          <img className="h-96" src={astronaut} alt="astronaut" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className=" text-gray-800 dark:text-zinc-300 rounded-lg p-6 flex flex-col items-center  "
        >
          <h3>Contact us to explore the cryptoverse together</h3>
        </motion.div>
      </div>
    </div>
  );
};

const Card = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay ? delay : 0 }}
      className="bg-white text-gray-800 dark:text-zinc-300 rounded-lg p-6 shadow-lg flex flex-col items-center bg-gradient-to-b from-blue-300 to-purple-300 dark:from-blue-900 dark:to-purple-900 "
      style={{ width: 250 }}
    >
      <div className="text-3xl  fill-zing-50 mb-4">{icon}</div>
      <div className="text-lg text-zinc-800 dark:text-zinc-50 font-bold mb-2">
        {title}
      </div>
      <p className="text-sm text-center">{description}</p>
    </motion.div>
  );
};

export default Homepage;
