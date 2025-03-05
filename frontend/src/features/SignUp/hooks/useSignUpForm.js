import React, { useState } from 'react'
import { passwordRegex } from '../../../utils/validation';

const useSignupForm = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        user_name: '',
        // company_id: '',
        level: '0',
        brand_code: [],
        password: '',
        confirm_password: '',
        mart_code: '',
        email: ''
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
        setFormData({ ...formData, [name]: value });
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
            (formData.level !== "3" || formData.mart_code) && // 점포관리자가 아니거나 점포가 골라져야
            formData.email;
        // console.log(formData.user_name);
        // console.log(formData.user_id);
        // console.log(isIdChecked);
        // console.log(formData.password);
        // console.log(isPasswordMatched);
        // console.log(formData.level !== "0" && formData.brand_code.length > 0);
        // console.log(formData.level === "3" && formData.mart_code);
        // console.log(formData.email);
        return isValid;
    }
    return {
        formData,
        errors,
        isIdChecked,
        isPasswordMatched,
        checkIdDuplicate,
        handleInput,
        handleSelectBox,
        handleMultiSelectBox,
        isFormValid
    }
}

export default useSignupForm;