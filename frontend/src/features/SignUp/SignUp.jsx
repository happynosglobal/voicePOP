import Input from "../../components/input/Input";
import { emailRegex } from "../../utils/validation";
import useSignUpForm from "./hooks/useSignUpForm";
import { levelOptions } from "../../utils/constant/options";
import { useEffect } from "react";
import Dropdown from "../../components/dropdown/Dropdown";

const SignUp = () => {
  const {
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
    storeList,
    handleError,
    handleRequestUser,
  } = useSignUpForm();

  useEffect(() => {
    getBrandCodes();
  }, []);

  const handleSubmitPost = async () => {
    try {
      await handleRequestUser();
    } catch (err) {
      console.error("사용자 등록 실패:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gray-100">
      <div className="card w-full max-w-lg bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          사용자 등록 신청
        </h2>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">성명</span>
          </label>
          <Input
            type="text"
            name="user_name"
            placeholder="성명을 입력하세요."
            className="input input-bordered w-full"
            value={formData.user_name}
            onChange={handleInput}
            errorMessage={errors.user_name}
            handleError={handleError}
          />
        </div>

        <div className="form-control mt-4">
          <label className="label flex justify-between">
            <span className="label-text font-semibold">신청 ID (사번)</span>
          </label>
          <div className="relative">
            <Input
              type="text"
              name="user_id"
              placeholder="아이디를 입력하세요."
              className="input input-bordered w-[360px]"
              value={formData.user_id}
              onChange={handleInput}
              maxLength={10}
            />
            <button
              className="absolute top-0 right-0 btn btn-sm btn-accent"
              onClick={checkIdDuplicate}
            >
              ID 중복 확인
            </button>
          </div>
          {!isIdChecked ? (
            <p className="mt-2 text-error text-sm">{errors.user_id}</p>
          ) : (
            <p className="mt-2 text-sm text-gray-500 text-primary">
              사용 가능한 ID 입니다.
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            * 사번 또는 영문 소문자와 숫자를 포함하여
            <span className="text-primary font-semibold"> 6자~10자</span> 이내.
          </p>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">회사명</span>
          </label>
          <Dropdown
            name="company_code"
            options={companyOptions}
            value={companyOptions.filter((option) =>
              formData.company_code.includes(option.value)
            )}
            className="w-full"
            classNamePrefix="select"
            onChange={handleSelectBox}
            placeholder="회사를 선택하세요"
          />
        </div>

        {formData.company_code === "etc" && (
          <div className="form-control mt-4">
            <Input
              type="text"
              name="company_id"
              placeholder="회사명을 직접 입력하세요."
              className="input input-bordered w-full"
              value={formData.company_id}
              onChange={handleInput}
              errorMessage={errors.company_id}
              handleError={handleError}
            />
          </div>
        )}

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">요청 권한</span>
          </label>
          <div className="flex gap-4">
            <Dropdown
              name="required_level"
              options={levelOptions}
              className="w-full"
              value={levelOptions.filter(
                (option) => option.value === formData.required_level
              )}
              onChange={handleSelectBox}
              placeholder="권한을 선택하세요"
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">관리 브랜드</span>
          </label>
          <div className="flex gap-4">
            {formData.required_level !== "STORE" ? (
              <Dropdown
                isMulti
                name="brand_code"
                options={brandOptions}
                value={brandOptions.filter((option) =>
                  formData.brand_code.includes(option.value)
                )}
                className="w-full"
                classNamePrefix="select"
                onChange={handleMultiSelectBox}
                placeholder="브랜드를 선택하세요"
                isDisabled={formData.required_level === "ADMIN" ? true : false} // 전체관리자는 disabled
              />
            ) : (
              <Dropdown
                name="brand_code"
                options={brandOptions}
                value={brandOptions.filter(
                  (option) => option.value === formData.brand_code[0]
                )}
                className="w-full"
                classNamePrefix="select"
                onChange={(option) => handleClickBrand(option.value)}
                placeholder="브랜드를 선택하세요"
                isDisabled={
                  formData.required_level === "ADMIN" ||
                  (formData.required_level === "STORE" && formData.company_code !== "etc")
                    ? true
                    : false
                } // 전체관리자 or 회사명을 선택 후 점포관리자를 선택했을 때 disabled
              />
            )}
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">관리 점포</span>
          </label>
          <Dropdown
            name="store_code"
            options={storeList}
            value={storeList.filter(
              (option) => option.value === formData.store_code
            )}
            className="w-full"
            onChange={handleSelectBox}
            placeholder="관리점포를 선택하세요"
            isDisabled={formData.required_level === "STORE" ? false : true} // 점포관리자만 activated
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">이메일</span>
          </label>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요."
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleInput}
            validation={emailRegex}
            errorMessage={errors.email}
            handleError={handleError}
          />
        </div>

        <div className="form-control mt-6">
          <button
            className="btn btn-primary w-full"
            disabled={!isFormValid()}
            onClick={handleSubmitPost}
          >
            등록 신청
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
