import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    devtools((set) => ({
      isAuthenticated: false,
      user: null,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    })),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
