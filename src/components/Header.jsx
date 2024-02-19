import React from "react";
import { FaSun, FaMoon, FaCompass } from "react-icons/fa";
import useDarkModeStore from "../store/darkModeStore";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkModeStore();

  return (
    <header className="flex justify-between items-center dark:bg-gray-800 bg-teal-700 text-white p-4">
      <h1 className="text-2xl font-bold inline-flex items-center">
        <FaCompass size={22} className="mx-3" /> CryptoVerse Explorer
      </h1>
      <button
        onClick={toggleDarkMode}
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded dark:bg-teal-700 dark:hover:bg-teal-600"
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </header>
  );
};

export default Header;
