import React from "react";
import FavoriteButton from "../components/FavoriteButton";
import CardCoin from "../components/CardCoin";
import useFavoriteStore from "../store/favoriteStore";
import { AiOutlineCompass } from "react-icons/ai";

const FavoritesPage = () => {
  const favorites = useFavoriteStore((state) => state.favorites);
  console.log(favorites);
  return (
    <div className="transition-all duration-50 flex-grow bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-neutral-200  w-full">
      <div className="text-xl opacity-80 mt-4  inline-flex items-center space-x-5">
        Cryptoverse <AiOutlineCompass className="mx-2" /> Explorer
      </div>
      <div className="m-10 container text-start">
        <div className="inline-flex w-full ">
          <div className="favorites flex-col">
            <h2 className="text-3xl font-semibold mb-4">Favorites</h2>
            {favorites.map(
              (coin) => coin !== null && <CardCoin coin={coin} key={coin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
