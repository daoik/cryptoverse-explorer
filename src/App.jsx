import React, { useEffect, Suspense } from "react";
import "./index.css";
import "./tailwind.css";
import "./bg.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useDarkModeStore from "./store/darkModeStore";
import FavoritesPage from "./pages/FavoritesPage";
import SideNavbar from "./components/SideNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Dynamically import pages
const Top100Page = React.lazy(() => import("./pages/Top100Page"));
const CryptoDashboardPage = React.lazy(() =>
  import("./pages/CryptoDashboardPage")
);
const AllCoinsPage = React.lazy(() => import("./pages/AllCoinsPage"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/top100" element={<Top100Page />} />
            <Route path="/coins/all" element={<AllCoinsPage />} />
            <Route path="/coins/:id" element={<CryptoDashboardPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
