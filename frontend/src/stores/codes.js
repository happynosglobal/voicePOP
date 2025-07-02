import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { getAllStores } from "../hooks/useStoreCode";

const useCodes = create(
  persist(
    devtools(
      (set) => ({
        allStoreCode: [], // 전체 점포 코드
        storeByBrandCode: [], // 브랜드별 점포 코드
        regionalGroupData: [], // 그룹 ID별 점포 코드
        storesForTree: [], // 그룹관리 tree형태 점포 코드
        brandCodes: [], // 브랜드 정보
        brandOptions: [], // 브랜드 코드 options
        categoryOptions: [], // MD 카테고리 options
        isLoading: false, // codes 조회 로딩 상태

        // 점포 정보 초기화
        resetStores: () =>
          set({
            allStoreCode: [],
            storeByBrandCode: [],
            regionalGroupData: [],
            storesForTree: [],
            brandCodes: [],
            brandOptions: [],
            categoryOptions: [],
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

        setCategory: (options) =>
          set({
            categoryOptions: options,
          }),
      }),
      {
        name: "useCodesStore",
      }
    ),
    {
      name: "codes",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCodes;
