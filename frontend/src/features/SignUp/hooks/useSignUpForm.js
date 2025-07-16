import React, { useEffect, useState } from "react";
import { getStoreCodes } from "../../../api/storeGroup/storeGroup";
import { checkUser, requestUser } from "../../../api/user/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoadingStore } from "../../../stores/loading";
import { userIdRegex } from "../../../utils/validation";
import { getErrorMessage } from "../../../utils/constant/messages";
import useBrandCode from "../../../hooks/useBrandCode";
import useCodes from "../../../stores/codes";

const useSignUpForm = () => {
  const navigate = useNavigate();
  const { getBrandCodes } = useBrandCode();
  const { brandOptions, brandCodes } = useCodes();

  const companyOptions = [...brandOptions, { value: "etc", label: "기타" }]; // 회사명 드롭박스 옵션

  const initialFormData = {
    user_id: "",
    user_name: "",
    company_code: "",
    company_id: "",
    required_level: "ADMIN",
    brand_code: [],
    store_code: null,
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [storeList, setStoreList] = useState([]);
  const [isIdChecked, setIsIdChecked] = useState(false); // ID 중복 확인 여부

  const isPasswordMatched = formData.password === formData.confirm_password;
  /* 신청ID 중복확인 */
  const checkIdDuplicate = async () => {
    const { user_id } = formData;

    // 정규식 유효성 검사
    const { error } = userIdRegex.validate(user_id);
    if (error) {
      setErrors((prev) => ({ ...prev, user_id: error.details[0].message }));
      setIsIdChecked(false);
      return;
    }

    // 중복 확인 요청
    try {
      const body = { user_id };
      const res = await checkUser(body);
      const { status_code } = res.data;

      if (status_code === 200) {
        setIsIdChecked(false);
        setErrors((prev) => ({ ...prev, user_id: "사용자가 존재합니다." }));
      } else if (status_code === 404) {
        setIsIdChecked(true);
        setErrors((prev) => ({ ...prev, user_id: "" }));
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
      setIsIdChecked(false);
    }
  };

  /* Input handler */
  const handleInput = (e) => {
    const { name, value } = e.target;
    //id 변경시마다 중복체크확인 상태 false
    if (name === "user_id") {
      if (value.length > 10) return;
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
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

  const handleRequestUser = async () => {
    const { company_code, company_id } = formData;

    const matched = brandOptions.find((opt) => opt.value === company_code);

    const body = {
      ...formData,
      company_id: company_code === "etc" ? company_id : matched?.label || "",
    };

    try {
      const response = await requestUser(body);
      const { status_code } = response.data;
      if (status_code === 200) {
        toast.success(
          "사용자 등록 신청을 완료했습니다. 관리자에게 문의하세요."
        );
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        "사용자 등록 신청 중 오류가 발생했습니다. 관리자에게 문의하세요."
      );
    }
  };

  /* 등록신청 유효체크 */
  const isFormValid = () => {
    let isValid = false;

    // 모든 에러 값이 빈 문자열인지 검사
    const isErrorsEmpty = Object.values(errors).every((error) => error === "");

    isValid =
      formData.user_name &&
      formData.user_id &&
      isIdChecked && // ID 중복체크 확인
      (formData.company_id || formData.company_code) &&
      (formData.required_level === "ADMIN" || formData.brand_code.length > 0) && // 전체관리자이거나 브랜드코드가 골라져야 함
      (formData.required_level !== "STORE" || formData.store_code) && // 점포관리자가 아니거나 점포가 골라져야 함
      formData.email &&
      isErrorsEmpty; // 모든 에러가 없어야 함

    return isValid;
  };

  // 최초 렌더링시 brand 코드값 세팅
  useEffect(() => {
    if (brandOptions.length > 0 && brandCodes.length > 0) {
      setFormData((prev) => ({
        ...prev,
        brand_code: brandCodes,
        company_code: brandCodes[0],
      }));
    }
  }, [brandOptions, brandCodes]);

  useEffect(() => {
    const level = formData.required_level;
    const companyCode = formData.company_code;

    if (!companyCode) return;

    if (companyCode === "etc") {
      if (level === "ADMIN") {
        setFormData((prev) => ({
          ...prev,
          brand_code: brandCodes,
          store_code: null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          brand_code: [],
          store_code: null,
        }));
      }
      return;
    }

    const matched = brandOptions.find((option) => option.value === companyCode);
    if (!matched) return;

    if (level === "ADMIN") {
      setFormData((prev) => ({
        ...prev,
        brand_code: brandCodes,
        store_code: null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        brand_code: [companyCode],
        store_code: null,
      }));

      if (level === "STORE") {
        handleClickBrand(companyCode);
      }
    }
  }, [formData.company_code, formData.required_level]);

  return {
    brandOptions,
    getBrandCodes,
    companyOptions,
    formData,
    errors,
    isIdChecked,
    isPasswordMatched,
    checkIdDuplicate,
    handleInput,
    handleSelectBox,
    handleMultiSelectBox,
    isFormValid,
    handleClickBrand,
    handleRequestUser,
    storeList,
    handleError,
  };
};

export default useSignUpForm;
