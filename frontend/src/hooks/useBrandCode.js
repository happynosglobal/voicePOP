import React, { useEffect, useState } from 'react'
import useUserStore from '../stores/user';
import { getBrandList } from '../api/brand/brand';
import { toast } from 'react-toastify';
import useCodes from '../stores/codes';
import { getErrorMessage } from '../utils/constant/messages';

const useBrandCode = () => {
  const {setBrand} = useCodes(); // store에 브랜드 목록을 value, label로 캐싱
  const [brandOptions, setBrandOptions] = useState([]); // 브랜드 목록 value, label 값
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
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
        console.error(err)
      });
  }

  return {
    brandOptions,
    getBrandCodes,
  }
}

export default useBrandCode;
