import React, { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import Select from "react-select";
import useBrandCode from "../../hooks/useBrandCode";
import useEquipmentSettingForm from "./hooks/useEquipmentSettingForm";
import Logo from "../../components/logo/Logo";
import useCodes from "../../stores/codes";

const EquipmentSettingPage = () => {
  const { brandOptions } = useCodes();
  // const { categoryOptions4Select, getCategoryCodes } = useCategoryCode();
  const {
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
  } = useEquipmentSettingForm();

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gray-100">
      <div className="card w-full max-w-md bg-white shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-4 flex justify-center">
          <Logo />
        </h2>
        <div className="w-full mt-2 flex items-center justify-center text-center text-gray-500 rounded-md ">
          Voice POP 장비에서 불러주는 번호 및
          <br />
          설치 정보를 입력 후, &quot;저장&quot; 버튼을 눌러 주세요.
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">장비 번호</span>
          </label>
          <Input
            type="text"
            name="serial_number"
            placeholder="Serial Number 를 입력하세요."
            className="input input-bordered w-full"
            value={formData.serial_number}
            onChange={handleInput}
            errorMessage={errors.serial_number}
            handleError={handleError}
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">설치 브랜드</span>
          </label>
          <div className="flex gap-4">
            <Select
              name="brand_code"
              options={brandOptions}
              value={brandOptions.filter(
                (option) => option.value === formData.brand_code
              )}
              className="w-full"
              classNamePrefix="select"
              onChange={(option) => handleClickBrand(option.value)}
              placeholder="브랜드를 선택하세요"
            />
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">설치 부서</span>
          </label>
          <div className="flex gap-4">
            <Select
              name="category_code"
              options={categoryOptions4Select}
              value={categoryOptions4Select.filter(
                (option) => option.value === formData.category_code[0]
              )}
              className="w-full"
              classNamePrefix="select"
              onChange={handleSelectBox}
              placeholder="부서를 선택하세요"
            />
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">설치 점포</span>
          </label>
          <Select
            name="str_code"
            options={storeList}
            value={storeList.filter(
              (option) => option.value === formData.str_code
            )}
            className="w-full"
            onChange={handleSelectBox}
            placeholder="점포를 선택하세요"
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">장비 이름</span>
          </label>
          <textarea
            name="name"
            placeholder=""
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleInput}
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">장소</span>
          </label>
          <textarea
            name="place"
            placeholder=""
            className="input input-bordered w-full"
            value={formData.place}
            onChange={handleInput}
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">메모</span>
          </label>
          <textarea
            name="memo"
            placeholder=""
            className="input input-bordered w-full"
            value={formData.memo}
            onChange={handleInput}
          />
        </div>

        <div className="form-control mt-6">
          <button
            className="btn btn-primary w-full"
            disabled={!isFormValid()}
            onClick={handleSubmitPost}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentSettingPage;
