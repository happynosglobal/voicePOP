import React, { useMemo, useState } from 'react'
import useUserStore from '../../../stores/user';
import { toYYYYMMDD } from '../../../utils/customFormat';
import { getAdTypeList, postAdContract } from '../../../api/advertisement/advertisement';

const useAddContractForm = () => {
  const today = useMemo(() => (new Date()), []);
  const { user } = useUserStore();
  const initialFormData = useMemo(() => ({
    company_id: "",
    ad_type: "",
    contract_from: toYYYYMMDD(today),
    contract_to: toYYYYMMDD(today),
    comment: "",
    status: "N",
    use_yn: "Y",
    user_id: user?.user_id || ""
  }), [user?.user_id, today])
  const [adTypes, setAdTypes] = useState([ // 광고 타입(임시)
    {
      "value": "ace147c4-d792-443b-b4b1-e7c3201cfd95",
      "label": "일반"
    },
    {
      "value": "cce147c4-d792-443b-b4b1-e7c3201cfd95",
      "label": "스텐다드"
    },
    {
      "value": "dce147c4-d792-443b-b4b1-e7c3201cfd95",
      "label": "프리미엄"
    }
  ]);
  const [formData, setFormData] = useState(initialFormData);

  /* 광고타입 조회 */
  const getAdTypes = (code) => {
    const params = {
      use_yn: "Y",
      brand_code: code,
    }
    console.log(params)
      // getAdTypeList(params)
      //   .then(res => {
      //     const { status_code, data } = res.data;
      //     if (status_code === 200) {
      //       const types = [];
      //       data.items.map(item => types.push({value: item.id, label: item.name}))
      //       setAdTypes(types);
      //     }
      //   })
      // .catch(err => {
      //   alert("광고타입을 불러오는데 실패했습니다.");
      //   console.error(err)
      // });
  }
  // console.log(adTypes)

  /* Input handler */
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "business_number") {
      if (value.length >= 13) return;
      let tempValue = value.replace(/\D/g, ""); // 숫자 이외 제거
      setFormData({ ...formData, [name]: tempValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // setErrors({ ...errors, [name]: '' });
  };

  /* SelectBox handler */
  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    setFormData({ ...formData, [name]: value });
  }

  // console.log(formData);

  return {
    adTypes,
    initialFormData,
    formData,
    setFormData,
    getAdTypes,
    handleInput,
    handleSelectBox,
  }
}

export default useAddContractForm;