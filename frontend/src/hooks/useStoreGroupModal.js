import { useState } from 'react';
import { toast } from 'react-toastify';
import useUserStore from '../stores/user';
import { getGroupDetailList, getGroupList } from '../api/storeGroup/storeGroup';

const useStoreGroupModal = () => {
  const { user } = useUserStore();


  const [storeGroupListForTree, setStoreGroupListForTree] = useState([]);

  const getStoreGroupListForTree = async () => {
    try {
      // 그룹 목록 조회
      const groupResponse = await getGroupList({
        brand_code: user?.brand_code,
        use_yn: "Y",
        page_size: 100,
      });

      let groups = groupResponse.data.items
      .filter(item=>item.count > 0 || item.store_names.length > 0)
      .map(item=>({value: item.id, label: item.name}));

      
      // 그룹에 속한 점포를 조회하는 api 병렬화
      const groupPromises = groups.map(group =>
        getGroupDetailList(group.value, { page_size: 500 })
      );

      // 그룹에 속한 점포를 한번에 조회
      const storeResponses = await Promise.all(groupPromises);
      // 그룹 목록에 점포명 stores속성으로 추가
      groups = groups.map((group, index) => ({
        ...group,
        children: storeResponses[index].data.data.items.map(store => ({ value: store.store_code + "_group" + index, label: store.store_name })) || []
      }));

      setStoreGroupListForTree(groups);

    } catch (error) {
      console.error("그룹 및 점포 조회 오류:", error);
      toast.error("그룹 및 점포 조회 오류:");
    }
  }

  return {
    storeGroupListForTree,
    getStoreGroupListForTree
  }
}

export default useStoreGroupModal
