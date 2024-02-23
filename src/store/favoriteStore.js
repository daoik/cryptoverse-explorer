import { create } from "zustand";

const useFavoriteStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  addToFavorites: (symbol) =>
    set((state) => {
      const updatedFavorites = [...state.favorites, symbol];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),
  removeFromFavorites: (symbol) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((fav) => fav !== symbol);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),
}));

export default useFavoriteStore;
