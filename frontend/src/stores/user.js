import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    devtools((set) => ({
      user: null,

      setUser: (userData, brand_code) => {
        set({
          user: {
            id: userData.id,
            user_id: userData.user_id,
            user_name: userData.user_name,
            level: userData.level,
            brand_code: brand_code,
            brandPermissions: userData.brand_code,
            latest_login_at: userData.latest_login_at,
            email: userData.email,
            store_code: userData.store_code,
            menu: userData.menu,
            dashboard_url: userData.dashboard_url,
          },
        });
      },

      modifyUser: (email) => {
        set((state) => ({
          user: {
            ...state.user,
            email: email,
          },
        }));
      },

      logout: () => {
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
        set({ user: null });
      },
    })),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
