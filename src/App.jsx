// App.js
import React, { useEffect } from "react";
import "./index.css";
import "./tailwind.css";
import "./bg.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useDarkModeStore from "./store/darkModeStore";
import FavoritesPage from "./pages/FavoritesPage";
import SideNavbar from "./components/SideNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top100Page from "./pages/Top100Page";
import CryptoDashboardPage from "./pages/CryptoDashboardPage";
import AllCoinsPage from "./pages/AllCoinsPage";
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
          <Route path="/coins/all" element={<AllCoinsPage />} />
          <Route path="/coins/:id" element={<CryptoDashboardPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
