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
      <div className=" text-neutral dark:text-zinc-100 py-20 grid-bg ba-grid anim">
        <div className="inner"></div>
        <div className="container h-[700px] flex items-center space-y-10 justify-evenly flex-col mx-auto text-center ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <AiOutlineCompass size={100} />
          </motion.div>
          <div className="text-5xl font-extrabold mb-4">
            Cryptoverse Explorer
          </div>
          <p className="text-lg  font-semibold mb-8">
            Explore the world of cryptocurrencies
          </p>
          <Link
            activeClass="active"
            to="CryptoSearch"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="z-10"
          >
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-800 cursor-pointer dark:hover:bg-zinc-800 hover:text-[#646cff] text-zinc-100  dark:bg-zinc-800  px-6 py-3 z-20 rounded-lg shadow-lg "
              //  onClick={() => {}
            >
              Get Started
            </motion.button>
          </Link>
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
