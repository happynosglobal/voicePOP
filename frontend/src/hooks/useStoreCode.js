import { toast } from "react-toastify";
import {
  getGroup,
  getGroupDetailList,
  getStoreCodes,
} from "../api/storeGroup/storeGroup";
import useCodes from "../stores/codes";

const regionalGroupTypes = [
  { value: "G1", label: "권역1" },
  { value: "G2", label: "권역2" },
  { value: "G3", label: "권역3" },
  { value: "G4", label: "권역4" },
];

export const getAllStores = async (brand_code) => {
  try {
    const response = await getStoreCodes();
    const { code, data } = response.data;

    if (code === "0000" && Array.isArray(data)) {
      const allStores = data;

      const filteredData = data.filter(
        (store) => store.com_code === brand_code
      );

      const storeByBrandCode = filteredData.map((store) => ({
        value: store.id,
        label: store.name,
      }));

      const groupedStores = filteredData.filter((store) => store.group_id);

      const nonRegionalData = filteredData
        .filter((store) => !store.group_id)
        .map((store) => ({
          value: store.id,
          label: store.name,
        }));

      const regionalGroupData = regionalGroupTypes
        .map((group) => {
          const children = groupedStores
            .filter((store) => store.group_id === group.value)
            .map((store) => ({
              value: `${store.id}_${group.value}`,
              label: store.name,
            }));
          return children.length > 0 ? { ...group, children } : null;
        })
        .filter(Boolean);

      return {
        allStores, // 전체 점포
        storeByBrandCode, // 로그인시 고른 브랜드코드로 필터링된 점포
        regionalGroupData, // 권역 그룹 점포
        nonRegionalData, // 그룹 없음 점포
      };
    }
  } catch (err) {
    toast.error("점포 정보를 불러오는데 실패했습니다.");
    console.error(err);
  }
};

// export const getAllStores = async () => {
//   try {
//     const response = await getStoreCodes();
//     const { code, data } = response.data;
//     if (code === "0000" && Array.isArray(data)) {
//       return data;
//     }
//   } catch (err) {
//     toast.error("점포 정보를 불러오는데 실패했습니다.");
//     console.error(err);
//   }
// };

// export const getRegionalGroupStores = async (brand_code) => {
//   try {
//     const response = await getStoreCodes({ store_type: brand_code });
//     const { code, data } = response.data;

//     if (code === "0000" && Array.isArray(data)) {
//       // 그룹없이 개별 점포 목록 세팅
//       const storeByBrandCode = data.map((store) => {
//         return { value: store.id, label: store.name };
//       });

//       // group_id가 있는 점포들 필터링
//       const groupedStores = data.filter((store) => store.group_id);

//       // group_id가 없는 점포들 필터링
//       const nonRegionalData = data
//         .filter((store) => !store.group_id)
//         .map((store) => {
//           return { value: store.id, label: store.name };
//         });

//       // regionalGroupTypes와 매핑하여 그룹화
//       const regionalGroupData = regionalGroupTypes
//         .map((group) => {
//           const children = groupedStores
//             .filter((store) => store.group_id === group.value)
//             // .map(store => ({ value: store.id, label: store.name }));
//             .map((store) => ({
//               value: store.id + "_" + group.value,
//               label: store.name,
//             }));

//           return children.length > 0 ? { ...group, children: children } : null;
//         })
//         .filter(Boolean);

//       return { storeByBrandCode, regionalGroupData, nonRegionalData };
//     }
//   } catch (err) {
//     toast.error("점포 정보를 불러오는데 실패했습니다.");
//     console.error(err);
//   }
// };

export const getGroupInfo = async (id) => {
  try {
    const groupResponse = await getGroup(id);

    if (groupResponse.data.status_code !== 200) {
      throw new Error("그룹명 조회 실패");
    }

    const groupId = groupResponse.data.data.id;
    const groupName = groupResponse.data.data.name;
    const params = {
      page_size: 500,
    };
    const groupDetailsResponse = await getGroupDetailList(groupId, params);

    if (groupDetailsResponse.status !== 200) {
      throw new Error("그룹 상세 목록 조회 실패");
    }
    const groupedStores = (groupDetailsResponse.data.data?.items || []).map(
      (store) => ({
        value: store.store_code,
        label: store.store_name,
      })
    );

    return { groupName, groupedStores };
  } catch (err) {
    toast.error("점포 상세 정보를 불러오는데 실패했습니다.");
    console.error(err);
  }
};

export const getStoreNameByCode = (store_code) => {
  if (!store_code) return;
  const allStores = useCodes.getState().allStoreCode;

  const match = allStores.find((store) => store.id === store_code);

  return match?.name || "";
};
