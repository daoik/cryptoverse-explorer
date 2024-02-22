// App.js
import React, { useEffect } from "react";
import "./index.css";
import "./tailwind.css";
import "./bg.css";
import Header from "./components/SideNavbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useDarkModeStore from "./store/darkModeStore";
import SideNavbar from "./components/SideNavbar";
function App() {
  const darkMode = useDarkModeStore((state) => state.darkMode);

  // Apply dark mode class to the body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="flex flex-col min-h-screen w-screen relative overflow-hidden">
      <SideNavbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
