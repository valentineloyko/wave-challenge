import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Customer } from "../types/customer";

interface AppState {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  clearCustomers: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      customers: [],

      setCustomers: (customers: Customer[]) => set({ customers }),

      clearCustomers: () => set({ customers: [] }),
    }),
    { name: "AppStore" }
  )
);
