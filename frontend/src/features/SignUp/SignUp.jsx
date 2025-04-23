import Input from "../../components/input/Input";
import Select from "react-select";
import { emailRegex, userIdRegex } from "../../utils/validation";
import useSignUpForm from "./hooks/useSignUpForm";
import { levelOptions } from "../../utils/constant/options";
import useBrandCode from "../../hooks/useBrandCode";
import Logo from "../../components/logo/Logo";
import { useEffect } from "react";

const SignUp = () => {
  const {
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

  const { brandOptions, getBrandCodes } = useBrandCode();

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
            <span className="label-text font-semibold">신청 ID</span>
          </label>
          <div className="relative">
            <Input
              type="text"
              name="user_id"
              placeholder="아이디를 입력하세요."
              className="input input-bordered w-[360px]"
              value={formData.user_id}
              onChange={handleInput}
              validation={userIdRegex}
              errorMessage={
                errors.user_id ||
                (!isIdChecked ? "ID 중복 확인을 해주세요." : "")
              }
              handleError={handleError}
            />
            <button
              className="absolute top-0 right-0 btn btn-sm btn-accent"
              onClick={checkIdDuplicate}
            >
              ID 중복 확인
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            * 사번 또는 영문 소문자와 숫자를 결합하여
            <span className="text-primary font-semibold">6자~10자</span> 이내.
          </p>
        </div>

        {/* <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호 입력하세요."
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleInput}
            validation={passwordRegex}
            errorMessage={errors.password}
            handleError={handleError}
          />
          <p className="mt-2 text-sm text-gray-500">
            * 영문 대/소문자와 특수문자, 숫자를 결합하여
            <span className="text-primary font-semibold">6자~10자</span> 이내.
          </p>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">Password 확인</span>
          </label>
          <Input
            type="password"
            name="confirm_password"
            placeholder="비밀번호를 다시한번 입력해주세요."
            className="input input-bordered w-full"
            value={formData.confirm_password}
            onChange={handleInput}
            errorMessage={!isPasswordMatched ? "비밀번호가 일치하지 않습니다." : ""}
            handleError={handleError}
          />
        </div> */}
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">회사명</span>
          </label>
          <Input
            type="text"
            name="company_id"
            placeholder="회사명을 입력하세요."
            className="input input-bordered w-full"
            value={formData.company_id}
            onChange={handleInput}
            errorMessage={errors.company_id}
            handleError={handleError}
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">요청 권한</span>
          </label>
          <div className="flex gap-4">
            <Select
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
              <Select
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
              <Select
                name="brand_code"
                options={brandOptions}
                value={brandOptions.filter(
                  (option) => option.value === formData.brand_code[0]
                )}
                className="w-full"
                classNamePrefix="select"
                onChange={(option) => handleClickBrand(option.value)}
                placeholder="브랜드를 선택하세요"
                isDisabled={formData.required_level === "ADMIN" ? true : false} // 전체관리자는 disabled
              />
            )}
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">관리 점포</span>
          </label>
          <Select
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
