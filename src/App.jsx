// App.js
import React, { useEffect } from "react";
import "./index.css"; // Import Tailwind CSS
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useDarkModeStore from "./store/darkModeStore";
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
