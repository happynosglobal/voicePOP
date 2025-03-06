import React, { useEffect, useState } from 'react'
import useUserStore from '../stores/user';

const useBrandCode = () => {
  const { isAuthenticated, user } = useUserStore();
  const [brandList, setBrandList] = useState([
    { value: "", label: "전체 브랜드" },
  ]);

  const getBrandList = () => {
    // 유저마다 관리하는 브랜드가 다르다
    if (user?.brand_code) {
      setBrandList([
        ...brandList,
        ...user.brand_code.map((code) => (
          { value: code, label: code }
        )),
      ]);
    }
  }
  useEffect(() => {
    if (isAuthenticated && user.brand_code.length !== 0) {
      getBrandList();
    }
  }, [isAuthenticated, user?.brand_code])
  return {
    brandList,
    getBrandList,
  }
}

export default useBrandCode;