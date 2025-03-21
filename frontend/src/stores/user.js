import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    devtools((set) => ({
      isAuthenticated: false,
      user: null,

      setUser: (loginSuccessResponse) => {

        set({ user: loginSuccessResponse, isAuthenticated: true });
      },
      setStoreName: (storeName) => {
        set((state) => ({
          user: { ...state.user, store_name: storeName },
        }));
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    })),
    {
      name: "user-storage",
      // storage: createJSONStorage(() => sessionStorage),
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
