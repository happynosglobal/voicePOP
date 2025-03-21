import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getRegionalGroupStores } from "../hooks/useStoreCode";

const useCodes = create(
  persist(
    devtools((set) => ({
      allStore: [],
      regionalGroupData: [],
      storesforTree: [],
      fetchStores: async (brand_code) => {
        const response = await getRegionalGroupStores(brand_code)
        try {
          set({ allStore: response.allStores, storesforTree: [...response.regionalGroupData, ...response.nonRegionalData], regionalGroupData: response.regionalGroupData })
        } catch (err) {
          console.error(err)
        }
      },

      brandList: [],
      setBrandList: (data) => set({ brandList: data }),

      resetStores: () => set({ allStore: [], regionalGroupData: [], storesforTree: [], brandList: [] }),
    })),

    {
      name: "codes-storage",
      // storage: createJSONStorage(() => sessionStorage),
      getStorage: () => localStorage,
    }
  )
);

export default useCodes;
