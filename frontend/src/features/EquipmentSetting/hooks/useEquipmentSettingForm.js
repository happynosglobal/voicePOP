import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadingStore } from "../../../stores/loading";
import { toast } from "react-toastify";
import { getStoreCodes } from "../../../api/storeGroup/storeGroup";
import useCategoryCode from "../../../hooks/useCategoryCode";
import { postSettingDevice } from "../../../api/device/device";

const useEquipmentSettingForm = () => {
  const navigate = useNavigate();
  const initialFormData = {
    serial_number: "",
    brand_code: "",
    category_code: "",
    str_code: null,
    str_name: "",
    place: "",
    name: "",
    memo: "",
  };

  const { categoryOptions4Select, getCategoryCodes } = useCategoryCode();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [storeList, setStoreList] = useState([]);

  /* input text 필드 200byte로 제한 */
  const getByteLength = (str) => {
    return new Blob([str]).size;
  };

  /* Input handler */
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (getByteLength(value) <= 200) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleError = () => {};

  /* SelectBox handler */
  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    if (name === "str_code") {
      setFormData((prev) => ({ ...prev, str_code: value, str_name: label }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* 브랜드별 점포 목록 세팅 */
  const handleClickBrand = async (brand_code) => {
    useLoadingStore.getState().setLoading(true);
    setStoreList([]);
    setFormData((prev) => ({
      ...prev,
      brand_code: brand_code,
      category_code: "",
      str_code: null,
    }));
    const params = { store_type: brand_code };
    try {
      await getCategoryCodes(brand_code);
      const response = await getStoreCodes(params);
      const { code, data } = response.data;
      if (code === "0000") {
        setStores(data);
      }
    } catch (err) {
      toast.error("점포 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  };

  /* 점포 목록 react-select에 맞게 parsing 후 점포 목록에 set */
  const setStores = (data) => {
    const tempStores = [];
    if (data.length !== 0) {
      data.map((item) => tempStores.push({ value: item.id, label: item.name }));
      setStoreList(tempStores);
    }
  };

  /* 등록신청 유효체크 */
  const isFormValid = () => {
    let isValid = false;

    isValid =
      formData.serial_number &&
      formData.brand_code &&
      formData.category_code &&
      formData.str_code;

    return isValid;
  };

  const handleSubmitPost = async () => {
    try {
      const response = await postSettingDevice(formData);
      const { status, data } = response;
      if (status === 200) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response.data.message || "장비 등록 중 오류가 발생했습니다."
      );
    }
  };
  return {
    formData,
    errors,
    categoryOptions4Select,
    storeList,
    setFormData,
    handleInput,
    handleError,
    handleSelectBox,
    handleClickBrand,
    isFormValid,
    handleSubmitPost,
  };
};

export default useEquipmentSettingForm;
