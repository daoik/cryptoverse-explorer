import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./bg.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useDarkModeStore from "./store/darkModeStore";
import FavoritesPage from "./pages/FavoritesPage";
import SideNavbar from "./components/SideNavbar";

// Dynamically import pages
const Top100Page = React.lazy(() => import("./pages/Top100Page"));
const CryptoDashboardPage = React.lazy(() =>
  import("./pages/CryptoDashboardPage")
);
const AllCoinsPage = React.lazy(() => import("./pages/AllCoinsPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage")); // Import your 404 page component

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
            <Route path="/cryptoverse-explorer" element={<Main />} />
            <Route
              path="/cryptoverse-explorer/top100"
              element={<Top100Page />}
            />
            <Route
              path="/cryptoverse-explorer/coins/all"
              element={<AllCoinsPage />}
            />
            <Route
              path="/cryptoverse-explorer/coins/:id"
              element={<CryptoDashboardPage />}
            />
            <Route
              path="/cryptoverse-explorer/favorites"
              element={<FavoritesPage />}
            />
            {/* Route for 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
