import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/user/user";
import { removeEmptyString } from "../../../utils/customFormat";

const useHandleUserList = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useState({
    level: "",
    brand_code: "",
    status: "",
    keyword_type: "user_id",
    keyword: "",
  });
  const [userList, setUserList] = useState([]);

  const handleGetUsers = (params = searchParams, pageNumber = page) => {
    const tempParams = {
      level: params.level,
      brand_code: params.brand_code,
      status: params.status,
      page: pageNumber,
      page_size: limit,
      [params.keyword_type]: params.keyword,
    };

    const newParams = removeEmptyString(tempParams);

    getUsers(newParams)
      .then((res) => {
        const { status_code, data } = res.data;
        if (status_code === 200) {
          setUserList(data.users);
          setTotal(data.total);
          setPage(data.page);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleGetUsers();
  }, [page]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    const newParams = { ...searchParams, [name]: value };
    setSearchParams(newParams);
    if(name !== "keyword_type") {
      handleGetUsers(newParams, 1);
    }
  };
  return {
    userList,
    searchParams,
    page,
    total,
    limit,
    setPage,
    handleGetUsers,
    handleInput,
    handleSelectBox,
  };
};

export default useHandleUserList;
