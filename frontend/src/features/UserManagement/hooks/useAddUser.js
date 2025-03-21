import React, { useEffect, useState } from 'react'
import { dummyUserInfo } from '../dummy/data';
import { getStoreCodes } from '../../../api/storeGroup/storeGroup';

const useAddUser = () => {

  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    company_id: '',
    required_level: 3,
    brand_code: ["EM", "ED"],
    password: '',
    confirm_password: '',
    store_code: null,
    email: '',
    status: "미승인"
  });
  const [storeList, setStoreList] = useState([]);
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
    if (name === "required_level" && value !== 3) {
      setFormData({ ...formData, [name]: value, brand_code: [], store_code: null });
    } else if (name === "required_level" && value === 3) {
      setFormData({ ...formData, [name]: value, brand_code: ["EM", "ED"], store_code: null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }
  /* MultiSelectBox handler */
  const handleMultiSelectBox = (option) => {
    let tempOption = [];
    option.map(item => tempOption.push(item.value));
    setFormData({ ...formData, brand_code: tempOption });
  }
  /* 점포 관리자일 경우 점포 목록 세팅 */
  const handleClickBrand = async (brand_code) => {
    setStoreList([])
    setFormData({ ...formData, brand_code: [brand_code], store_code: null });
    const params = { store_type: brand_code }
    try {
      const response = await getStoreCodes(params);
      const { code, data } = response.data;
      if (code === "0000") {
        setStores(data)
      }
    } catch (err) {
      console.error(err);
    }
  }
  /* 점포 목록 react-select에 맞게 parsing 후 점포 목록에 set */
  const setStores = (data) => {
    const tempStores = [];
    if (data.length !== 0) {
      data.map(item => tempStores.push({ value: item.id, label: item.name }))
      setStoreList(tempStores)
    }
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
      (formData.required_level === 3 || formData.brand_code.length > 0) && //전체관리자이거나 브랜드코드가 골라져야
      (formData.required_level !== 0 || formData.store_code) && // 점포관리자가 아니거나 점포가 골라져야
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
      required_level: dummyUserInfo.level,
      brand_code: dummyUserInfo.brand_code || [],
      password: '',  // API 응답에 없으므로 초기화
      confirm_password: '',  // API 응답에 없으므로 초기화
      store_code: dummyUserInfo.store_code || null,
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
    handleGetUserInfo,
    handleClickBrand,
    storeList
  }
}

export default useAddUser;