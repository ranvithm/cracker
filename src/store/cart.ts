import { create } from "zustand";

type Store = {
  cartsList: any[];
  setCarts: (_cart: any[]) => void;
};

export const useCartStore = create<Store>()((set) => ({
  cartsList: [],
  setCarts: (_cart: any[]) => set({ cartsList: _cart }),
}));
