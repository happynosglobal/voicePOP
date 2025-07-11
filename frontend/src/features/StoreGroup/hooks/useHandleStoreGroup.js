import React, { useEffect, useState } from "react";
import useUserStore from "../../../stores/user";
import {
  getGroupDetailList,
  getGroupList,
} from "../../../api/storeGroup/storeGroup";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/constant/messages";
import { removeEmptyString } from "../../../utils/customFormat";

const useHandleStoreGroup = () => {
  const { user } = useUserStore();

  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useState({
    brand_code: "",
    use_yn: "Y",
  });

  const [storeGroupList, setStoreGroupList] = useState([]);

  const getStoreGroupList = async (
    params = searchParams,
    pageNumber = page
  ) => {
    const tempParams = {
      brand_code: user?.brand_code,
      use_yn: params.use_yn,
      page: pageNumber,
      page_size: limit,
      sort_by: params.sort_by,
      sort_order: params.sort_order,
    };

    const newParams = removeEmptyString(tempParams);
    try {
      // 그룹 목록 조회
      const response = await getGroupList(newParams);
      const { status, data } = response;
      if (status === 200) {
        setStoreGroupList(data.data.items);
        setTotal(data.data.count);
        setPage(data.data.page);
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error("그룹 및 점포 조회 오류:", err);
    }
  };

  useEffect(() => {
    getStoreGroupList();
  }, [page]);

  const handleSort = (sortBy, sortOrder) => {
    const newParams = {
      ...searchParams,
      sort_by: sortBy,
      sort_order: sortOrder,
    };
    setSearchParams(newParams);
    getStoreGroupList(newParams, 1);
  };

  return {
    page,
    setPage,
    total,
    limit,
    storeGroupList,
    getStoreGroupList,
    handleSort,
  };
};

export default useHandleStoreGroup;
