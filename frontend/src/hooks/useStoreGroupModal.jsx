import { useState } from "react";
import { toast } from "react-toastify";
import useUserStore from "../stores/user";
import { getGroupDetailList, getGroupList } from "../api/storeGroup/storeGroup";
import { MdManageAccounts } from "react-icons/md";

const useStoreGroupModal = () => {
  const { user } = useUserStore();

  const [storeGroupListForTree, setStoreGroupListForTree] = useState([]);

  const getStoreGroupListForTree = async () => {
    try {
      const groupResponse = await getGroupList({
        brand_code: user?.brand_code,
        use_yn: "Y",
        page_size: 100,
      });

      let groups = groupResponse.data.data.items
        .filter((item) => item.count > 0 || item.store_names?.length > 0)
        .map((item) => ({
          value: item.id,
          label: item.name,
        }));

      // 그룹에 속한 점포를 조회하는 api 병렬화
      const groupPromises = groups.map((group) =>
        getGroupDetailList(group.value, { page_size: 500 })
      );

      // 그룹에 속한 점포를 한번에 조회
      const storeResponses = await Promise.all(groupPromises);
      // 그룹 목록에 점포명 stores속성으로 추가
      groups = groups.map((group, index) => {
        const stores = storeResponses[index].data.data.items;

        const sortedStores = stores.sort((a, b) =>
          a.store_name.localeCompare(b.store_name, "ko-KR", {
            sensitivity: "base",
          })
        );

        return {
          value: group.value,
          label: `${group.label} (${sortedStores.length})`,
          type: "group",
          children: sortedStores.map((store) => ({
            key: store.store_code,
            value: store.store_code + "_G" + group.value,
            label: store.store_name,
            type: "store",
          })),
        };
      });

      setStoreGroupListForTree([
        {
          value: "my-group",
          label: (
            <>
              <div className="relative top-1 inline-flex items-center gap-1 text-green-600 font-semibold">
                <span className="bg-green-600 items-center justify-center flex h-6 w-6 rounded-lg">
                  <MdManageAccounts className="text-white text-xl" />
                </span>
                My 그룹
              </div>
            </>
          ),
          className: "my-group-wrapper",
          children: groups,
          type: "wrapper",
        },
      ]);
    } catch (error) {
      console.error("그룹 및 점포 조회 오류:", error);
      toast.error("그룹 및 점포 조회 오류:");
    }
  };

  return {
    storeGroupListForTree,
    getStoreGroupListForTree,
  };
};

export default useStoreGroupModal;
