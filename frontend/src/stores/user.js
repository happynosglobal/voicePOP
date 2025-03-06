import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    devtools((set) => ({
      isAuthenticated: false,
      user: null,
      login: (userData, multipleBrandCode) => set({ user: userData, isAuthenticated: !multipleBrandCode }), // 브랜드 권한 여부에 따라 접속권한 다르게
      selectBrand: (selectedBrand) => set({ isAuthenticated: true }), // 브랜치 선택 후 접속 선택한 브랜드데이터 활용은 추후 적용
      logout: () => set({ user: null, isAuthenticated: false }),
    })),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
