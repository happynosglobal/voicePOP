import React, { useEffect, useState } from 'react'
import useUserStore from '../stores/user';
import { getBrandList } from '../api/brand/brand';
import { toast } from 'react-toastify';
import useCodes from '../stores/codes';

const useBrandCode = () => {
  const {setBrand} = useCodes();
  const [brandOptions, setBrandOptions] = useState([]);
  /* 전체 브랜드 목록 조회 */
  const getBrandCodes = () => {
    const params = {
      use_yn: "Y",
    };
    getBrandList(params)
      .then(res => {
        const { status_code, data } = res.data;
        if (status_code === 200) {
          const codes = [];
          data.items.map(item => codes.push({ value: item.code, label: item.name }))
          setBrandOptions(codes);
          setBrand(codes);
        }
      })
      .catch(err => {
        toast.error("브랜드 목록을 불러오는데 실패했습니다.");
        console.error(err)
      });
  }

  // useEffect(() => {
  //   getBrandCodes();
  // }, []);


  return {
    brandOptions,
    getBrandCodes,
  }
}

export default useBrandCode;
