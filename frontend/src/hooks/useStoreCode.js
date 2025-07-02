import { toast } from "react-toastify";
import {
  getGroup,
  getGroupDetailList,
  getStoreCodes,
} from "../api/storeGroup/storeGroup";
import useCodes from "../stores/codes";
import { getErrorMessage } from "../utils/constant/messages";
// 그룹 ID별 label
const regionalGroupTypes = [
  { value: "G1", label: "판매1담당" },
  { value: "G2", label: "판매2담당" },
  { value: "G3", label: "판매3담당" },
  { value: "G4", label: "판매4담당" },
];

export const getAllStores = async (brand_code) => {
  try {
    const response = await getStoreCodes();
    const { code, data } = response.data;

    if (code === "0000" && Array.isArray(data)) {
      const allStores = data.sort((a, b) =>
        a.name.localeCompare(b.name, "ko-KR", { sensitivity: "base" })
      );

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
          key: store.id,
          value: store.id,
          label: store.name,
          type: "store",
        }));

      const regionalGroupData = regionalGroupTypes
        .map((group) => {
          const children = groupedStores
            .filter((store) => store.group_id === group.value)
            .map((store) => ({
              key: store.id,
              value: `${store.id}_${group.value}`,
              label: store.name,
              type: "store",
            }));

          if (children.length > 0) {
            return {
              value: group.value,
              label: `${group.label} (${children.length})`,
              type: "group",
              children,
            };
          }

          return null;
        })
        .filter(Boolean);

      return {
        allStores, // 전체 점포
        storeByBrandCode, // 브랜드코드로 필터링된 점포
        regionalGroupData, // 권역 그룹 점포
        nonRegionalData, // 그룹 없음 점포
      };
    }
  } catch (err) {
    const errMsg = getErrorMessage(err?.response?.data?.message);
    toast.error(errMsg);
    console.error(err);
  }
};

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
        type: "store",
      })
    );

    return { groupName, groupedStores };
  } catch (err) {
    const errMsg = getErrorMessage(err?.response?.data?.message);
    toast.error(errMsg);
    console.error(err);
  }
};

export const getStoreNameByCode = (store_code) => {
  if (!store_code) return;
  const allStores = useCodes.getState().allStoreCode;

  const match = allStores.find((store) => store.id === store_code);

  return match?.name || "";
};
