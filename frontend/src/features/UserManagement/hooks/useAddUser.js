import React, { useEffect, useState } from "react";
import { dummyUserInfo } from "../dummy/data";
import { getStoreCodes } from "../../../api/storeGroup/storeGroup";
import {
  checkUser,
  deleteUser,
  getUser,
  patchUser,
  postUser,
} from "../../../api/user/user";
import { toast } from "react-toastify";
import { useLoadingStore } from "../../../stores/loading";
import useCodes from "../../../stores/codes";

const useAddUser = () => {
  const {brandCodes, brandOptions} = useCodes();
  const initialFormData = {
    user_id: "",
    user_name: "",
    company_id: "",
    level: "ADMIN",
    brand_code: brandCodes,
    password: "",
    confirm_password: "",
    store_code: null,
    email: "",
  };
  const [userInfo, setUserInfo] = useState(null);

  const [formData, setFormData] = useState(initialFormData);
  const [storeList, setStoreList] = useState([]);
  const [errors, setErrors] = useState({});
  const [isIdChecked, setIsIdChecked] = useState(false); // ID 중복 확인 여부

  const isPasswordMatched = formData.password === formData.confirm_password;
  /* 신청ID 중복확인 */
  const checkIdDuplicate = async () => {
    if (!formData.user_id) return;
    const body = {
      user_id: formData.user_id,
    };
    checkUser(body)
      .then((res) => {
        const { status_code } = res.data;
        if (status_code === 200) {
          setIsIdChecked(false);
          setErrors({ ...errors, user_id: "사용자가 존재 합니다" });
        } else if (status_code === 404) {
          setIsIdChecked(true);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("중복체크 중 오류가 발생했습니다.");
        setIsIdChecked(false);
      });
  };

  /* Input handler */
  const handleInput = (e) => {
    const { name, value } = e.target;
    //id 변경시마다 중복체크확인 상태 false
    if (name === "user_id") {
      setIsIdChecked(false);
      setErrors((prev) => ({ ...prev, user_id: "" }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Error handler */
  const handleError = (name, errorMessage) => {
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  /* SelectBox handler */
  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;

    if (name === "level" && value !== "ADMIN") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        brand_code: [],
        store_code: null,
      }));
    } else if (name === "level" && value === "ADMIN") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        brand_code: ["EM", "ED", "NB"],
        store_code: null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* MultiSelectBox handler */
  const handleMultiSelectBox = (option) => {
    let tempOption = [];
    option.map((item) => tempOption.push(item.value));
    setFormData((prev) => ({ ...prev, brand_code: tempOption }));
  };

  /* 점포 관리자일 경우 점포 목록 세팅 */
  const handleClickBrand = async (brand_code) => {
    useLoadingStore.getState().setLoading(true);
    setStoreList([]);
    setFormData((prev) => ({
      ...prev,
      brand_code: [brand_code],
      store_code: null,
    }));
    const params = { store_type: brand_code };
    try {
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
  const isFormValid = (mode) => {
    let isValid = false;

    // 모든 에러 값이 빈 문자열인지 검사
    const isErrorsEmpty = Object.values(errors).every((error) => error === "");
    // 수정모드에서 password필드가 빈값일 때 password error 무시
    const isModifyErrorsEmpty = Object.entries(errors).every(([key, error]) => {
      if (key === "password" && formData.password === "") return true;
      return error === "";
    });

    if (mode === "add") {
      isValid =
        formData.user_name &&
        formData.user_id &&
        isIdChecked && // ID 중복체크 확인
        formData.password && // add 모드일 때 password 필수
        formData.company_id &&
        isPasswordMatched && // 비밀번호 일치 확인
        (formData.level === "ADMIN" || formData.brand_code.length > 0) && // 전체관리자이거나 브랜드코드가 골라져야 함
        (formData.level !== "STORE" || formData.store_code) && // 점포관리자가 아니거나 점포가 골라져야 함
        formData.email &&
        isErrorsEmpty; // 모든 에러가 없어야 함
    } else if (mode === "modify") {
      isValid =
        formData.user_name &&
        formData.user_id &&
        formData.company_id &&
        isPasswordMatched && // 비밀번호 일치 확인
        (formData.level === "ADMIN" || formData.brand_code.length > 0) && // 전체관리자이거나 브랜드코드가 골라져야 함
        (formData.level !== "STORE" || formData.store_code) && // 점포관리자가 아니거나 점포가 골라져야 함
        formData.email &&
        formData.status && // modify 모드일 때 status 필수
        isModifyErrorsEmpty; // 모든 에러가 없어야 함
    }

    return isValid;
  };

  const handleGetUserInfo = async (id) => {
    useLoadingStore.getState().setLoading(true);
    try {
      const response = await getUser(id);
      const { status_code, data } = response.data;
      if (status_code === 200) {
        if (data.level === "STORE" && data.brand_code.length !== 0) {
          await handleClickBrand(data.brand_code);
        }
        setUserInfo(data);
        setFormData({
          user_id: data.user_id || "",
          user_name: data.user_name || "",
          company_id: data.company_id || "",
          level: data.level,
          brand_code: data.brand_code || [],
          password: "",
          confirm_password: "",
          store_code: data.store_code || null,
          email: data.email || "",
          status: data.status || "미승인",
        });
      }
    } catch (err) {
      toast.error(err?.response.data.message || "");
      throw err;
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  };

  const handlePostUserInfo = async () => {
    const body = {
      user_id: formData.user_id,
      user_name: formData.user_name,
      company_id: formData.company_id,
      level: formData.level,
      brand_code: formData.brand_code,
      password: formData.password,
      store_code: formData.store_code,
      email: formData.email,
    };
    try {
      const response = await postUser(body);
      const { status_code, data } = response.data;
      if (status_code === 200) {
        toast.success("사용자 등록에 성공했습니다.");
      }
    } catch (err) {
      toast.error(err?.response.data.message || "");
    }
  };

  const handlePatchUserInfo = async (id) => {
    const body = {
      user_id: formData.user_id,
      user_name: formData.user_name,
      company_id: formData.company_id,
      level: formData.level,
      brand_code: formData.brand_code,
      password: formData.password,
      store_code: formData.store_code,
      email: formData.email,
      status: formData.status,
    };
    try {
      const response = await patchUser(id, body);
      const { status_code, data } = response.data;
      if (status_code === 200) {
        toast.success("사용자 수정에 성공했습니다.");
      }
    } catch (err) {
      toast.error(err?.response.data.message || "");
    }
  };

  const handleDeletehUserInfo = async (id) => {
    try {
      const response = await deleteUser(id);
      const { status } = response;
      if (status === 200) {
        toast.success("사용자 삭제에 성공했습니다.");
      }
    } catch (err) {
      toast.error(err?.response.data.message || "");
    }
  };
  return {
    brandOptions,
    initialFormData,
    formData,
    setFormData,
    userInfo,
    setUserInfo,
    errors,
    setErrors,
    isIdChecked,
    setIsIdChecked,
    isPasswordMatched,
    checkIdDuplicate,
    handleInput,
    handleSelectBox,
    handleMultiSelectBox,
    isFormValid,
    handleGetUserInfo,
    handlePostUserInfo,
    handlePatchUserInfo,
    handleDeletehUserInfo,
    handleClickBrand,
    storeList,
    setStoreList,
    handleError,
  };
};

export default useAddUser;
