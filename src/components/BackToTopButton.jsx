import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-10 right-5 p-5 dark:bg-zinc-800 group duration-1000 transition-all  bg-zinc-300 shadow-2xl rounded-full flex items-center border-none ${
        isVisible ? "opacity-100 " : "opacity-0 -bottom-10"
      }`}
      onClick={scrollToTop}
    >
      <FaCaretUp className="group-hover:scale-150 transition-all " size={20} />
    </button>
  );
};

export default BackToTopButton;
