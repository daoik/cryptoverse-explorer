import React from "react";
import { motion } from "framer-motion";

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

export default Card;
