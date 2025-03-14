import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getRegionalGroupStores } from "../hooks/useStoreCode";

const useStores = create(
  persist(
    devtools((set) => ({
      stores: [],
      regionalGroupData: [],
      fetchStores: async (brand_code) => {
        const response = await getRegionalGroupStores(brand_code)
        // console.log(response)
        try {
          set({ stores: [...response.regionalGroupData, ...response.stores], regionalGroupData: response.regionalGroupData })
        } catch (err) {
          console.error(err)
        }
      },
      resetStores: () => set({ stores: [], regionalGroupData: [], })
    })),

    {
      name: "store-storage",
      // storage: createJSONStorage(() => sessionStorage),
      getStorage: () => localStorage,
    }
  )
);

export default useStores;
