// stores/user.jsx
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        devtools((set) => ({
            user: null,
            login: (userData) => set({ user: userData }),
            logout: () => set({ user: null }),
        })),
        {
            name: "user-storage",
            getStorage: () => localStorage,
        }
    )
);

export default useUserStore;
