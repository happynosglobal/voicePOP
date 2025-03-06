import React, { useEffect, useState } from 'react'
import { dummyCompanyList } from '../dummy/data';
import { getAdCompanayList } from '../../../api/advertisement/advertisement';

const useHandleCompany = () => {
  const [companyList, setCompanyList] = useState([]);
  // parameter 미정.. 임시로 적용 추후 수정
  const [searchType, setSearchType] = useState("number");
  const [searchParams, setSearchParams] = useState({
    brand_code: "",
    search_type: "number",
    search: "",
    use_yn: "Y"
  });

  const [activeRow, setActiveRow] = useState(null); // 광고계약관리 리스트 선택 상태

  const getCompanyList = () => {
    /* 예상 광고회사 검색 api */
    // const tempParams = {
    //   brand_code: searchParams.brand_code,
    //   use_yn: searchParams.use_yn,
    // };
    // // 선택한 search_type 값에 따라 동적으로 키 설정
    // if (searchParams.search_type === "number") {
    //   tempParams.business_number = searchParams.search;
    // } else if (searchParams.search_type === "name") {
    //   tempParams.business_name = searchParams.search;
    // }
    // console.log(tempParams);
    // getAdCompanayList(tempParams)
    //   .then(res => {
    //     const { status_code, data } = res.data;
    //     if (status_code === 200) {
    //       setCompanyList(data.item);
    //     }
    //   })
    //   .catch(err => console.error(err));

    //api 추가전 임시로 계약목록 set
    setCompanyList(dummyCompanyList);
  }

  useEffect(() => {
    getCompanyList();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  }

  const handleSelecting = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    setSearchParams({ ...searchParams, [name]: value });
  }

  // console.log(searchParams);

  return {
    searchParams,
    companyList,
    activeRow,
    getCompanyList,
    handleInput,
    handleSelecting
  }
}

export default useHandleCompany;