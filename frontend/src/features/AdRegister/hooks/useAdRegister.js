import React, { useMemo, useState } from 'react'
import { toYYYYMMDD } from '../../../utils/customFormat';
import { getAdCompanayList } from '../../../api/advertisement/advertisement';
import { dummyCompanyOption, dummyContractOption } from '../dummy/data';

const useAdRegister = () => {
  const today = useMemo(() => (new Date()), []);
  const initialFormData = useMemo(() => ({
    name: "",
    md: "ag",
    stores: "",
    company: "",
    contract: "",
    start_period: toYYYYMMDD(today),
    end_period: toYYYYMMDD(today),
    start_time: "",
    end_time: "",
    gap: "",
    repeat_count: "",
    interval: "",
    file: null,
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);

  const getCompanyOption = (brand_code) => {
    const params = {
      brand_code: brand_code,
      use_yn: "Y"
    }
    // getAdCompanayList(params)
    //   .then(res => {
    //     const { status_code, data } = res.data;
    //     if (status_code === 200) {
    //       const temp = .......
    //       setCompanyOptions(temp)
    //     }
    //   })
    //   .catch(err => {
    //     alert("업체 정보를 불러오는데 실패했습니다.");
    //     console.error(err);
    //   })
    const options = dummyCompanyOption.map(option=>{
      return { value: option.id, label: option.business_name }
    })
    setCompanyOptions(options)
  }

  const getContractOption = () => {
    const options = dummyContractOption.map(option=>{
      return { value: option.id, label: `${option.ad_type_name} / ${option.contract_from} ~ ${option.contract_to}` }
    })
    setContractOptions(options)
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    setFormData({ ...formData, [name]: value });
  }
  return {
    formData,
    setFormData,
    companyOptions,
    setCompanyOptions,
    getCompanyOption,
    contractOptions,
    setContractOptions,
    getContractOption,
    handleInput,
    handleSelectBox
  }
}

export default useAdRegister;