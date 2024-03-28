import { create } from "zustand";

const useGridViewStore = create((set) => ({
  gridView: sessionStorage.getItem("gridView") === "true",
  toggleGridView: () => {
    set((state) => {
      const newGridView = !state.gridView;
      sessionStorage.setItem("gridView", newGridView);
      return { gridView: newGridView };
    });
  },
}));

export default useGridViewStore;
