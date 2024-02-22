// App.js
import React, { useEffect } from "react";
import "./index.css";
import "./tailwind.css";
import "./bg.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useDarkModeStore from "./store/darkModeStore";
import CryptoTop100Table from "./components/CryptoTop100Table";
import SideNavbar from "./components/SideNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top100Page from "./pages/Top100Page";
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
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-screen relative overflow-hidden">
        <SideNavbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/top100" element={<Top100Page />} />
          {/* <Route path="/top100" element={<Top100 />} />
          <Route path="/favs" element={<Favs />} /> */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
