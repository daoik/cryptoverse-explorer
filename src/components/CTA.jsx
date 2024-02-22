import React from "react";
import astronaut from "../assets/astro.png";
import { motion } from "framer-motion";

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

export default CTA;
