import React, { useEffect, useState } from 'react'
import { dummyCompanyList } from '../dummy/data';
import { getAdCompanayList } from '../../../api/advertisement/advertisement';

const useHandleCompany = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useState({
    brand_code: "",
    keyword_type: "number",
    keyword: "",
    use_yn: "Y"
  });

  const [companyList, setCompanyList] = useState([]);

  const getCompanyList = async (pageNumber = page) => {
    /* 예상 광고회사 검색 api */
    const tempParams = {
      brand_code: searchParams.brand_code,
      use_yn: searchParams.use_yn,
      page: pageNumber,
      page_size: limit
    };
    // 선택한 keyword_type 값에 따라 동적으로 키 설정
    if (searchParams.keyword_type === "number") {
      tempParams.business_number = searchParams.keyword;
    } else if (searchParams.keyword_type === "name") {
      tempParams.business_name = searchParams.keyword;
    }

    try {
      const response = await getAdCompanayList(tempParams)
      const { status_code, data } = response.data;
      if (status_code === 200) {
        setCompanyList(data.items);
        setTotal(data.count);
        setPage(data.page);
      } else {
        setCompanyList([]);
        setTotal(0);
        setPage(1);
      }
    } catch (err) {
      console.error("광고업체 조회 오류", err)
    }
  }

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
    limit,
    setLimit,
    page,
    setPage,
    total,
    setTotal,
    searchParams,
    companyList,
    getCompanyList,
    handleInput,
    handleSelectBox
  }
}

export default useHandleCompany;