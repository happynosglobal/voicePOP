import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import Select from "react-select";
import { passwordRegex, userIdRegex } from "../../utils/validation";
import useSignupForm from "./hooks/useSignupForm";

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
    isFormValid
  } = useSignupForm();
console.log(formData)
  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gray-100">
      <div className="card w-full max-w-md bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Voice PoP 사용자 등록 신청
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
            required
          />
        </div>

        <div className="form-control mt-4">
          <label className="label flex justify-between">
            <span className="label-text font-semibold">신청 ID</span>
            <button className="btn btn-sm btn-black" onClick={checkIdDuplicate}>ID 중복 확인</button>
          </label>
          <Input
            type="text"
            name="user_id"
            placeholder="아이디를 입력하세요."
            className="input input-bordered w-full"
            value={formData.user_id}
            onChange={handleInput}
            validation={userIdRegex}
            errorMessage={!isIdChecked ? "ID 중복 확인 을 해주세요." : errors.user_id}
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            * 사번 또는 영문 소문자와 숫자를 결합하여
            <span className="text-primary font-semibold">6자~10자</span> 이내.
          </p>
        </div>

        <div className="form-control mt-4">
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
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">요청 권한</span>
          </label>
          <div className="flex gap-4">
            <Select
              name="level"
              options={[
                { value: "0", label: "전체 관리자" },
                { value: "1", label: "브랜드 관리자" },
                { value: "2", label: "광고 관리자" },
                { value: "3", label: "점포 관리자" },
              ]}
              className="w-full"
              // value={formData.level}
              onChange={handleSelectBox}
              defaultValue={{ value: "0", label: "전체 관리자" }}
            />
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">관리 브랜드</span>
          </label>
          <div className="flex gap-4">
            <Select
              isMulti
              name="colors"
              options={[
                { value: "EM", label: "이마트(EM)" },
                { value: "ED", label: "에브리데이(ED)" },
                { value: "TR", label: "트레이더스(TR)" },
              ]}
              className="w-full"
              classNamePrefix="select"
              onChange={handleMultiSelectBox}
              placeholder="브랜드를 선택하세요"
              isDisabled={formData.level === "0" ? true : false} // 전체관리자는 disabled
            />
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">관리 점포</span>
          </label>
          <Select
            name="mart_code"
            options={[
              { value: "0", label: "행당점" },
              { value: "1", label: "점포A" },
              { value: "2", label: "점포B" },
              { value: "3", label: "점포C" },
              { value: "4", label: "점포D" },
            ]}
            className="w-full"
            onChange={handleSelectBox}
            placeholder="관리점포를 선택하세요"
            isDisabled={formData.level === "3" ? false : true} // 점포관리자만 activated
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">이메일</span>
          </label>
          <Input
            type="email"
            name="email"
            placeholder="이메일 입력"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary w-full" disabled={!isFormValid()}>등록 신청</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;