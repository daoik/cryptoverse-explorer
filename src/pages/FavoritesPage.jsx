import React from "react";
import CardCoin from "../components/CardCoin";
import useFavoriteStore from "../store/favoriteStore";
import { AiOutlineCompass } from "react-icons/ai";
import moon from "../assets/moon.png";

const FavoritesPage = () => {
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <div className="transition-all duration-50 flex-grow bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-neutral-200  w-full">
      <div className="text-xl opacity-80 mt-4  inline-flex items-center space-x-5">
        Cryptoverse <AiOutlineCompass className="mx-2" /> Explorer
      </div>
      <div className="m-10 container text-start">
        <div className="inline-flex w-full ">
          <div className="favorites w-full items-center  justify-center flex-col">
            <h2 className="text-3xl font-semibold text-center mb-4">
              Favorites
            </h2>
            <div className="flex  justify-center flex-wrap ">
              {favorites.map(
                (coin) => coin !== null && <CardCoin coin={coin} key={coin} />
              )}
            </div>
            <img
              src={moon}
              alt="moon"
              className="w-100vw opacity-20 scale-150 object-contain overflow-visible"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
