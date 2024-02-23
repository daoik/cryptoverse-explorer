import React, { useState, useEffect } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import useFavoriteStore from "../store/favoriteStore";

const FavoriteButton = ({ id, className }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = useFavoriteStore((state) => state.favorites);
  const addToFavorites = useFavoriteStore((state) => state.addToFavorites);
  const removeFromFavorites = useFavoriteStore(
    (state) => state.removeFromFavorites
  );

  useEffect(() => {
    setIsFavorite(favorites.includes(id));
  }, [favorites, id]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      // Check if the id already exists before adding it
      if (!favorites.includes(id) && id) {
        addToFavorites(id);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex-inline items-center bg-transparent outline-none border-none p-0 z-0 ${className}`}
    >
      {isFavorite ? (
        <GoStarFill size={25} className="mr-1 text-yellow-500" />
      ) : (
        <GoStar size={25} className="mr-1 hover:fill-yellow-300" />
      )}
    </button>
  );
};

export default FavoriteButton;
