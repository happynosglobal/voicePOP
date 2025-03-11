import React, { useEffect, useState } from 'react'
import { dummyUserInfo } from '../dummy/data';

const useAddUser = () => {

  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    company_id: '',
    level: 0,
    brand_code: [],
    password: '',
    confirm_password: '',
    store_code: '',
    email: '',
    status: "미승인"
  });

  const [errors, setErrors] = useState({});
  const [isIdChecked, setIsIdChecked] = useState(false); // ID 중복 확인 여부

  const isPasswordMatched = formData.password === formData.confirm_password;
  /* 신청ID 중복확인 */
  const checkIdDuplicate = () => {
    // ..api 추가
    setIsIdChecked(!isIdChecked); // 임시로 중복확인 상태 toggle로 추후 api연결
  };

  /* Input handler */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };
  /* SelectBox handler */
  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    if (name === "level" && value === 0) {
      setFormData({ ...formData, [name]: value, brand_code: [], store_code: "" })
    } else if (name === "level" && value === 1 || value === 2) {
      setFormData({ ...formData, [name]: value, store_code: "" })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }
  /* MultiSelectBox handler */
  const handleMultiSelectBox = (option) => {
    let tempOption = [];
    option.map(item => tempOption.push(item.value));
    setFormData({ ...formData, brand_code: tempOption });
  }
  /* 등록신청 유효체크 */
  const isFormValid = () => {
    let isValid = false;
    isValid =
      formData.user_name &&
      formData.user_id &&
      isIdChecked && // ID 중복체크 확인
      formData.password &&
      isPasswordMatched && // 비밀번호 일치 확인
      (formData.level === "0" || formData.brand_code.length > 0) && //전체관리자이거나 브랜드코드가 골라져야
      (formData.level !== "3" || formData.store_code) && // 점포관리자가 아니거나 점포가 골라져야
      formData.email &&
      formData.status;

    return isValid;
  }

  const handleGetUserInfo = (id) => {
    setUserInfo(dummyUserInfo);
    setFormData({
      user_id: dummyUserInfo.user_id || '',
      user_name: dummyUserInfo.user_name || '',
      company_id: dummyUserInfo.company_id || '',
      level: dummyUserInfo.level,
      brand_code: dummyUserInfo.brand_code || [],
      password: '',  // API 응답에 없으므로 초기화
      confirm_password: '',  // API 응답에 없으므로 초기화
      store_code: dummyUserInfo.store_code || '',
      email: dummyUserInfo.email || '',
      status: dummyUserInfo.status || '미승인'
    });
  }
  // console.log(formData)
  // console.log(userInfo)
  return {
    formData,
    setFormData,
    userInfo,
    setUserInfo,
    errors,
    isIdChecked,
    isPasswordMatched,
    checkIdDuplicate,
    handleInput,
    handleSelectBox,
    handleMultiSelectBox,
    isFormValid,
    handleGetUserInfo
  }
}

export default useAddUser;