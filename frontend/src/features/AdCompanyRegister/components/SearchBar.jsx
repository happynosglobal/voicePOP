import React, { useEffect } from "react";
import Select from "react-select";
import Input from "../../../components/input/Input";
import useCodes from "../../../stores/codes";
import Dropdown from "../../../components/dropdown/Dropdown";

const SearchBar = ({
  searchParams,
  companyModalRef,
  handleInput,
  handleSelectBox,
  getCompanyList,
}) => {
  const { brandOptions } = useCodes();

  return (
    <div className="flex mb-5 gap-1.5">
      <Dropdown
        name="brand_code"
        className="min-w-36"
        options={brandOptions}
        onChange={handleSelectBox}
        isClearable={true}
        isSearchable={false}
        placeholder={"브랜드 검색"}
      />
      <Dropdown
        name="keyword_type"
        className="min-w-32"
        options={[
          { value: "number", label: "사업자번호" },
          { value: "name", label: "사업자명" },
        ]}
        onChange={handleSelectBox}
        isSearchable={false}
        defaultValue={{ value: "number", label: "사업자번호" }}
      />
      <div className="flex-1">
        <Input
          type="text"
          name="keyword"
          placeholder="검색어를 입력해주세요."
          className="input input-bordered w-full focus:ring-0 focus:outline-none"
          value={searchParams.keyword}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getCompanyList(1);
            }
          }}
        />
      </div>
      <button
        className="btn btn-sm btn-accent"
        onClick={() => getCompanyList(1)}
      >
        검색
      </button>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => companyModalRef.current.showModal()}
      >
        업체등록
      </button>
    </div>
  );
};

export default SearchBar;
