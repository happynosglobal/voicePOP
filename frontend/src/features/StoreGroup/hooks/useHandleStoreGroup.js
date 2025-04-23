import React, { useEffect, useState } from 'react'
import useUserStore from '../../../stores/user';
import { getGroupDetailList, getGroupList } from '../../../api/storeGroup/storeGroup';
import { toast } from 'react-toastify';

const useHandleStoreGroup = () => {
  const { user } = useUserStore();

  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [storeGroupList, setStoreGroupList] = useState([]);

  const getStoreGroupList = async (pageNumber = page) => {
    try {
      // 그룹 목록 조회
      const response = await getGroupList({
        brand_code: user?.brand_code,
        use_yn: "Y",
        page: pageNumber,
        page_size: limit,
      });
      const { status, data } = response;
      if (status === 200) {
        setStoreGroupList(data.items);
        setTotal(data.count);
        setPage(data.page);
      }
    } catch (error) {
      console.error("그룹 및 점포 조회 오류:", error);
      toast.error("그룹 및 점포 조회 오류:");
    }
  };

  return {
    page,
    setPage,
    total,
    limit,
    storeGroupList,
    getStoreGroupList,
  }
}

export default useHandleStoreGroup
