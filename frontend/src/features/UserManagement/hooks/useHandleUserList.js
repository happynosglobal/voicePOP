import React, { useEffect, useState } from 'react'
import { dummyUserList } from '../dummy/data';
import { getUsers } from '../../../api/user/user';
import { removeEmptyString } from '../../../utils/customFormat';

const useHandleUserList = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useState({
    level: "",
    brand_code: "",
    status: "",
    keyword_type: "user_id",
    keyword: ""
  });
  const [userList, setUserList] = useState([]);

  const handleGetUsers = (pageNumber = page) => {
    const tempParams = {
      level: searchParams.level,
      brand_code: searchParams.brand_code,
      status: searchParams.status,
      page: pageNumber,
      page_size: limit,
      [searchParams.keyword_type]: searchParams.keyword,
    }

    const params = removeEmptyString(tempParams)

    getUsers(params)
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
  }

  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    setSearchParams({ ...searchParams, [name]: value });
  }
  return {
    userList,
    searchParams,
    page,
    total,
    limit,
    setPage,
    handleGetUsers,
    handleInput,
    handleSelectBox
  }
}

export default useHandleUserList;
