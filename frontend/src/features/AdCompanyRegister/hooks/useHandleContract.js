import React, { useEffect, useState } from 'react'
import { getAdContractList } from '../../../api/advertisement/advertisement';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/constant/messages';

const useHandleContract = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [contractList, setContractList] = useState([]);

  const getContractList = async (rowData, pageNumber = page) => {
    const tempParams = {
      use_yn: "Y",
      company_id: rowData.id,
      page: pageNumber,
      page_size: 10,
    };
    try {
      const response = await getAdContractList(tempParams)
      const { status, data } = response;
      if (status === 200) {
        setContractList(data.data.items);
        setPage(data.data.page);
        setTotal(data.data.count);
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  }

  return {
    limit,
    page,
    setPage,
    total,
    contractList,
    getContractList
  }
}

export default useHandleContract;