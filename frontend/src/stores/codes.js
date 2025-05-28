import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { getAllStores } from "../hooks/useStoreCode";

const useCodes = create(
  persist(
    devtools(
      (set) => ({
        allStoreCode: [],
        storeByBrandCode: [],
        regionalGroupData: [],
        storesForTree: [],
        brandOptions: [],
        brandCodes: [],
        isLoading: false,

        // 점포 정보 초기화
        resetStores: () =>
          set({
            allStoreCode: [],
            storeByBrandCode: [],
            regionalGroupData: [],
            storesForTree: [],
            brandOptions: [],
            brandCodes: [],
            isLoading: false,
          }),

        // 점포 데이터 fetch
        fetchStores: async (brandCode) => {
          if (!brandCode) {
            console.error("브랜드 코드가 전달되지 않았습니다.");
            return;
          }

          set({ isLoading: true });
          try {
            const response = await getAllStores(brandCode);

            set({
              allStoreCode: response.allStores,
              storeByBrandCode: response.storeByBrandCode,
              regionalGroupData: response.regionalGroupData,
              storesForTree: [
                ...response.regionalGroupData,
                ...response.nonRegionalData,
              ],
              isLoading: false,
            });
          } catch (err) {
            console.error("점포데이터 조회 오류:", err);
            set({ isLoading: false });
          }
        },

        setBrand: (options) =>
          set({
            brandOptions: options,
            brandCodes: options.map((option) => option.value),
          }),
      }),
      {
        name: "useCodesStore",
      }
    ),
    {
      name: "codes-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCodes;
