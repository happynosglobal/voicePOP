import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { postAdCompany } from '../../../api/advertisement/advertisement';

const useAddCompanyForm = () => {
  const initialFormData = useMemo(() => ({
    business_name: "",
    business_number: "",
    brand_code: "",
    comment: "",
    use_yn: "Y",
  }), []);

  const [formData, setFormData] = useState(initialFormData);

  const [businessNumber, setBusinessNumber] = useState("");
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

    if (name === "level" && value !== "ADMIN") {
      setFormData(prev => ({ ...prev, [name]: value, brand_code: [], store_code: null }));
    } else if (name === "level" && value === "ADMIN") {
      setFormData(prev => ({ ...prev, [name]: value, brand_code: ["EM", "ED"], store_code: null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  const handlePostCompany = async () => {
    const body = {
      business_name: formData.business_name,
      business_number: formData.business_number,
      brand_code: formData.brand_code,
      comment: formData.comment,
      use_yn: formData.use_yn,
      seq: 1,
    }
    try {
      const response = await postAdCompany(body);
      const { status_code, data } = response.data;
      if (status_code === 200) {
        toast.success("업체 등록에 성공했습니다.");
      }
    } catch (err) {      
      toast.error("업체 등록에 실패했습니다.");
      throw err;
    }
  }
  return {
    initialFormData,
    formData,
    setFormData,
    businessNumber,
    setBusinessNumber,
    handleInput,
    handleSelectBox,
    handlePostCompany
  }
}

export default useAddCompanyForm;