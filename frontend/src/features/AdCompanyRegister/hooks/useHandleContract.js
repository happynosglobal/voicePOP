import React, { useState } from 'react'
import { dummyContractList } from '../dummy/data';

const useHandleContract = () => {
  const [contractList, setContractList] = useState([]);

  const getContractList = () => {
    setContractList(dummyContractList);
  }

  

  return {
    contractList,
    getContractList
  }
}

export default useHandleContract;