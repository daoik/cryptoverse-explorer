import React, { useRef } from "react";
import { FaSun, FaMoon, FaCompass } from "react-icons/fa";
import useDarkModeStore from "../store/darkModeStore";
import { motion, useCycle } from "framer-motion";
import { GoHome, GoRocket, GoStar } from "react-icons/go";
import "../App.css";
const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
export const MenuItem = ({ i, label, link }) => {
  const style = { color: `${colors[i]}`, border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={{ link }}
    >
      <div
        className="icon-placeholder transition-all hover:shadow items-center flex justify-center "
        style={style}
      >
        {label === "Home" ? (
          <GoHome size={20} />
        ) : label === "Top 100" ? (
          <GoRocket size={20} />
        ) : label === "Favs" ? (
          <GoStar size={20} />
        ) : label === "darkMode" ? (
          dark
        ) : (
          label
        )}
      </div>
      <div
        className="text-placeholder transition-all hover:shadow px-2"
        style={style}
      >
        {label}
      </div>
    </motion.li>
  );
};
const variants = (i) => ({
  open: { opacity: 1, x: 0, transition: { delay: 0.1 + i * 0.1 } }, // Add delay to open
  closed: { opacity: 0, x: "-200%", transition: { delay: 0.1 + i * 0.1 } }, // Add delay to close
});

export const Navigation = () => (
  <motion.ul
    variants={{
      open: { opacity: 1, x: 0 },
      closed: { opacity: 0, x: "-100%" },
    }}
  >
    {["Home", "Top 100", "Favs"].map((label, i) => (
      <motion.li variants={variants(i)}>
        <MenuItem i={i} key={i} label={label} />
      </motion.li>
    ))}
  </motion.ul>
);
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }) => (
  <button
    className="nav-button hover:scale-125 transition-transform ease-in-out duration-200"
    onClick={toggle}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);
const SideNavbar = () => {
  // const { darkMode, toggleDarkMode } = useDarkModeStore();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const toggleNavbar = () => {
    document.body.classList.toggle("nav-open");
    toggleOpen();
  };
  return (
    <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
      <motion.div className="nav-background " variants={sidebar}>
        <div className="w-80 bg-zinc-200 shadow-2xl z-50 h-full"></div>
        <MenuToggle
          className="shadow-xl bg-red-300"
          toggle={() => toggleNavbar()}
        />

        <Navigation className="z-20" />
      </motion.div>
    </motion.nav>
    // <header className="flex justify-between items-center dark:bg-gray-800 bg-teal-700 text-white p-4">
    //   <h1 className="text-2xl font-bold inline-flex items-center">
    //     <FaCompass size={22} className="mx-3" /> CryptoVerse Explorer
    //   </h1>
    //   <button
    //     onClick={toggleDarkMode}
    //     className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded dark:bg-teal-700 dark:hover:bg-teal-600"
    //   >
    //     {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    //   </button>
    // </header>
  );
};

export default SideNavbar;
