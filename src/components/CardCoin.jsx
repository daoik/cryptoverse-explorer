import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, body, button, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 flex flex-col"
    >
      <h3 className="text-xl font-semibold mb-4 text-teal-700 dark:text-teal-300">
        {title}
      </h3>
      <p className="text-gray-700 mb-4 dark:text-white">{body}</p>
      <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded dark:bg-teal-700 dark:hover:bg-teal-600 mt-auto">
        {button}
      </button>
    </motion.div>
  );
};

export default Card;
