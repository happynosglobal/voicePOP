import React, { useMemo, useState } from 'react'
import { toDate } from '../../../utils/customFormat';
import { getAdTypeList, patchAdContract, postAdContract } from '../../../api/advertisement/advertisement';
import { toast } from 'react-toastify';

const useAddContractForm = () => {
  const today = useMemo(() => (new Date()), []);
  const initialFormData = useMemo(() => ({
    company_id: "",
    ad_type: "",
    contract_from: toDate(today),
    contract_to: toDate(today),
    comment: "",
    status: "미등록",
    use_yn: "Y",
  }), [today])
  const [adTypes, setAdTypes] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  /* 광고타입 조회 */
  const getAdTypes = (code) => {
    const params = {
      use_yn: "Y",
      brand_code: code,
    }
    getAdTypeList(params)
      .then(res => {
        const { status_code, data } = res.data;
        if (status_code === 200) {
          const types = [];
          data.items.map(item => types.push({ value: item.id, label: item.name }))
          setAdTypes(types);
        }
      })
      .catch(err => {
        toast.error("광고타입을 불러오는데 실패했습니다.");
        console.error(err)
      });
  }

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
  };

  /* SelectBox handler */
  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    setFormData({ ...formData, [name]: value });
  }

  const handlePostContract = async () => {
    try {
      const response = await postAdContract(formData);
      const { status_code } = response.data;
      if (status_code === 200) {
        toast.success("계약 등록에 성공했습니다.");
      }
    } catch (err) {
      toast.error("계약 등록 중 오류가 발생했습니다.\n계약기간을 확인해주세요.", {
        style: { whiteSpace: "pre-line" },
      });
      throw new Error(err);
    }
  }

  const handlePatchContract = async (id) => {
    try {
      const response = await patchAdContract(id, formData);
      const { status_code } = response.data;
      if (status_code === 200) {
        toast.success("계약 수정에 성공했습니다.");
      }
    } catch (err) {
      toast.error("계약 등록 중 오류가 발생했습니다.\n계약기간을 확인해주세요.", {
        style: { whiteSpace: "pre-line" },
      });
      throw new Error(err);
    }
  }

  return {
    adTypes,
    initialFormData,
    formData,
    setFormData,
    getAdTypes,
    handleInput,
    handleSelectBox,
    handlePostContract,
    handlePatchContract
  }
}

export default useAddContractForm;