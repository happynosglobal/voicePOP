import React, { useEffect, useState } from 'react'
import useUserStore from '../stores/user';
const dummyBrandList = [
  { value: "EM", label: "이마트" },
  { value: "ED", label: "에브리데이" },
]
const useBrandCode = () => {
  const { isAuthenticated, user } = useUserStore();
  const [brandOptions, setBrandOptions] = useState([]);
  /* 전체 브랜드 목록 조회 */
  const getBrandCodes = () => {
    const params = {
      use_yn: "Y",
    };
    setBrandOptions(dummyBrandList);
    // if (user?.brand_code) {
    //   getBrandCodes(params)
    //     .then(res => {
    //       const { status_code, data } = res.data;
    //       if (status_code === 200) {
    //         const codes = [];
    //         data.items.map(item => codes.push({ value: item.code, label: item.name }))
    //         setBrandList(codes);
    //       }
    //     })
    //     .catch(err => {
    //       alert("브랜드 목록을 불러오는데 실패했습니다.");
    //       console.error(err)
    //     });
    // }
  }

  useEffect(() => {
    getBrandCodes();
  }, []);


  return {
    brandOptions,
    getBrandCodes,
  }
}

export default useBrandCode;
