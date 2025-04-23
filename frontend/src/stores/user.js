import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

const useUserStore = create(
  persist(
    devtools((set) => ({
      user: null,

      setUser: (userData, brand_code) => {
        set({
          user: {
            user_id: userData.user_id,
            user_name: userData.user_name,
            level: userData.level,
            brand_code: brand_code,
            latest_login_at: userData.latest_login_at,
            email: userData.email,
            store_code: userData.store_code,
            menu: userData.menu,
            dashboard_url: userData.dashboard_url,
          },
        });
      },

      logout: () => {
        Cookies.remove("token");
        Cookies.remove("refresh_token");
        set({ user: null });
      },
    })),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
