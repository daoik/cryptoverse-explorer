import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { AiOutlineCompass, AiOutlineCaretDown } from "react-icons/ai";
import CryptoSearch from "../components/CryptoSearch";
import CryptoInfoSection from "../components/CryptoInfoSection";
import CTA from "../components/CTA";

const Homepage = () => {
  return (
    <div>
      <div className=" text-white py-20 grid-bg ba-grid anim">
        <div className="inner"></div>
        <div className="container h-[700px] flex items-center space-y-10 justify-evenly flex-col mx-auto text-center ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <AiOutlineCompass size={100} />
          </motion.div>
          <div className="text-5xl font-bold mb-4">Cryptoverse Explorer</div>
          <p className="text-lg mb-8">Explore the world of cryptocurrencies</p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-teal-900 px-6 py-3 z-20 rounded-lg shadow-lg hover:bg-teal-100 transition-colors duration-300 ease-in-out"
            //  onClick={() => {}
          >
            <Link
              activeClass="active"
              to="CryptoSearch"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="z-30"
            >
              Get Started
            </Link>
          </motion.button>
          <AiOutlineCaretDown size={40} className="animate-bounce mt-10 " />
        </div>
      </div>
      <CryptoInfoSection />
      <CryptoSearch />
      <CTA />
    </div>
  );
};

export default Homepage;
