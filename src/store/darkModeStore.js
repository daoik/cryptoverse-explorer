import { create } from "zustand";

const useDarkModeStore = create((set) => ({
  darkMode: sessionStorage.getItem("darkMode") === "true",
  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.darkMode;
      sessionStorage.setItem("darkMode", newDarkMode);
      return { darkMode: newDarkMode };
    });
  },
}));

export default useDarkModeStore;
