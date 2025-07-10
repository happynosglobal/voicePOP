import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/user/user";
import { removeEmptyString } from "../../../utils/customFormat";
import { getErrorMessage } from "../../../utils/constant/messages";
import { toast } from "react-toastify";

const useHandleUserList = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useState({
    level: "",
    brand_code: "",
    status: ["normal", "require", "banned"],
    keyword_type: "user_id",
    keyword: "",
  });
  const [userList, setUserList] = useState([]);

  const handleGetUsers = async (params = searchParams, pageNumber = page) => {
    const tempParams = {
      level: params.level,
      brand_code: params.brand_code,
      status: params.status?.join(","),
      page: pageNumber,
      page_size: limit,
      [params.keyword_type]: params.keyword,
      sort_by: params.sort_by,
      sort_order: params.sort_order,
    };

    const newParams = removeEmptyString(tempParams);

    try {
      const res = await getUsers(newParams);
      const { status_code, data } = res.data;
      if (status_code === 200) {
        setUserList(data.users);
        setTotal(data.total);
        setPage(data.page);
      }
    } catch (err) {
      console.error(err);
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, [page]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSelectBox = (option, meta) => {
    const { name } = meta;

    const value = option ? option.value : "";
    const newParams = { ...searchParams, [name]: value };
    setSearchParams(newParams);

    if (name !== "keyword_type") {
      handleGetUsers(newParams, 1);
    }
  };

  const handleMultiSelectBox = (option, meta) => {
    let tempOption = [];
    option.map((item) => tempOption.push(item.value));
    const newParams = { ...searchParams, status: tempOption };
    setSearchParams(newParams);
    handleGetUsers(newParams, 1);
  };

  const handleSort = (sortBy, sortOrder) => {
    const newParams = {
      ...searchParams,
      sort_by: sortBy,
      sort_order: sortOrder,
    };
    setSearchParams(newParams);
    handleGetUsers(newParams, 1);
  };
  return {
    userList,
    searchParams,
    page,
    total,
    limit,
    setPage,
    handleGetUsers,
    handleMultiSelectBox,
    handleInput,
    handleSelectBox,
    handleSort,
  };
};

export default useHandleUserList;
