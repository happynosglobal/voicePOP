import React, { useMemo, useState } from 'react'
import useUserStore from '../../../stores/user';

const useAddCompanyForm = () => {
  const { user } = useUserStore();
  const initialFormData = useMemo(() => ({
    business_name: "",
    business_number: "",
    brand_code: "",
    comment: "",
    use_yn: "Y",
    user_id: user?.user_id || "",
  }), [user?.user_id]);

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

  /* MultiSelectBox handler */
  const handleMultiSelectBox = (option) => {
    let tempOption = [];
    option.map(item => tempOption.push(item.value));
    setFormData({ ...formData, brand_code: tempOption });
  }
  console.log(formData);
  return {
    initialFormData,
    formData,
    setFormData,
    businessNumber,
    setBusinessNumber,
    handleInput,
    handleMultiSelectBox,
  }
}

export default useAddCompanyForm;