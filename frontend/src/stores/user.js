import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import apiCall from "../utils/axiosConfig";
import { getUser } from "../api/user/user";
import { userInfo } from "../features/Login/dummy/data";
const initialUserState = {
  uuid: "",
  user_id: "",
  user_name: "",
  company_id: "",
  level: "",
  brand_code: "",
  email: "",
  store_code: "",
  created_at: "",
  updated_at: "",
  creater: "",
  updater: "",
  dashboard_url: "/",
  latest_login_at: "",
  menu: [],
}
const useUserStore = create(
  persist(
    devtools((set) => ({
      isAuthenticated: false,
      user: initialUserState,
      requestLogin: async (loginSuccessResponse, multipleBrandCode) => {
        set({ user: loginSuccessResponse, isAuthenticated: !multipleBrandCode });
        useUserStore.getState().fetchUserInfo(loginSuccessResponse.uuid);
      }, // 브랜드 권한 여부에 따라 접속권한 다르게
      selectBrand: (selectedBrand) => set({ isAuthenticated: true }), // 브랜치 선택 후 접속 선택한 브랜드데이터 활용은 추후 적용
      fetchUserInfo: async (uuid) => {
        try {
          // const userResponse = await getUser(uuid);
          // set({ user: { ...useUserStore.getState().user, ...userResponse.data } });
          set({user: {...useUserStore.getState().user, ...userInfo}})
          
        } catch (error) {
          console.error("유저 정보 조회 실패", error);
        }
      },
      logout: () => set({ user: initialUserState, isAuthenticated: false }),
    })),
    {
      name: "user-storage",
      // storage: createJSONStorage(() => sessionStorage),
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
