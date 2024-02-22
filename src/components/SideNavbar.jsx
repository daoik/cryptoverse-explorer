import React, { useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion, useCycle } from "framer-motion";
import { Link } from "react-router-dom";
import { GoHome, GoRocket, GoStar } from "react-icons/go";
import useDarkModeStore from "../store/darkModeStore";
import "../App.css";

const SideNavbar = () => {
  const { darkMode, toggleDarkMode } = useDarkModeStore();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const toggleNavbar = () => {
    document.body.classList.toggle("nav-open");
    toggleOpen();
  };

  const Navigation = () => {
    const variants = (i) => ({
      open: { opacity: 1, x: 0, transition: { delay: 0.1 + i * 0.1 } },
      closed: { opacity: 0, x: "-200%", transition: { delay: 0.1 + i * 0.1 } },
    });
    return (
      <motion.ul
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "-100%" },
        }}
      >
        {[
          { label: "Home", link: "/" },
          { label: "Top 100", link: "/top100" },
          { label: "Favs", link: "/" },
        ].map(({ label, link }, i) => (
          <motion.li key={i} variants={variants(i)}>
            <MenuItem
              i={i}
              label={label}
              link={link}
              toggleNavbar={toggleNavbar}
            />
          </motion.li>
        ))}
      </motion.ul>
    );
  };
  const MenuToggle = ({ toggle }) => {
    const Path = (props) => (
      <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
      />
    );
    return (
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
  };
  const MenuItem = ({ i, label, link, toggleNavbar }) => {
    const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
    const style = { color: `${colors[i]}`, border: `2px solid ${colors[i]}` };

    const handleClick = () => {
      // Close the navbar when a link is clicked
      toggleNavbar();
    };

    return (
      <motion.li
        className="group pointer-cursor"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to={link} className="flex items-center" onClick={handleClick}>
          <div
            className="icon-placeholder transition-all group-hover:shadow items-center flex justify-center"
            style={style}
          >
            {label === "Home" ? (
              <GoHome
                className="transition-all group-hover:scale-125"
                size={20}
              />
            ) : label === "Top 100" ? (
              <GoRocket
                className="transition-all group-hover:scale-125"
                size={20}
              />
            ) : label === "Favs" ? (
              <GoStar
                className="transition-all group-hover:scale-125"
                size={20}
              />
            ) : null}
          </div>
          <div
            className="text-placeholder transition-all group-hover:shadow px-2"
            style={style}
          >
            {label}
          </div>
        </Link>
      </motion.li>
    );
  };
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
  return (
    <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
      <motion.div className="nav-background" variants={sidebar}>
        <div className="w-80 bg-zinc-200 shadow-2xl z-50 h-full ">
          <MenuToggle toggle={toggleNavbar} />
          <button
            onClick={toggleDarkMode}
            className="outline-none border-none  bg-transparent hover:scale-125 transition-transform ease-in-out duration-200"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <Navigation />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default SideNavbar;
