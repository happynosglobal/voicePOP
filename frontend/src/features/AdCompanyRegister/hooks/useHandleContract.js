import React, { useState } from 'react'
import { dummyContractList } from '../dummy/data';
import { getAdContractList } from '../../../api/advertisement/advertisement';

const useHandleContract = () => {
  const [contractList, setContractList] = useState([]);

  const getContractList = (rowData) => {
    // console.log(rowData)
    const tempParams = {
      use_yn: "Y",
      company_id: rowData.id,
      brand_code: rowData.brand_code,
    };
    // console.log(tempParams);
    // getAdContractList(tempParams)
    //   .then(res => {
    //     const { status_code, data } = res.data;
    //     if (status_code === 200) {
    //       setContractList(data.items);
    //     }
    //   })
    //   .catch(err => console.error(err));
    setContractList(dummyContractList);
  }



  return {
    contractList,
    getContractList
  }
}

export default useHandleContract;