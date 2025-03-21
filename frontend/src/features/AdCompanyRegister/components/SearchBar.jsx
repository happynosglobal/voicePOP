import React, { useEffect } from 'react'
import Select from 'react-select'
import useBrandCode from '../../../hooks/useBrandCode'
import Input from '../../../components/input/Input';

const SearchBar = ({
  searchParams,
  companyModalRef,
  handleInput,
  handleSelectBox,
  getCompanyList
}) => {
  const { brandOptions } = useBrandCode();
  // console.log(searchParams)
  return (
    <div className="flex mb-5 gap-1.5">
      <Select
        name="brand_code"
        options={[
          { value: "", label: "모든 브랜드" },
          ...brandOptions
        ]}
        className="min-w-32"
        onChange={handleSelectBox}
        defaultValue={{ value: "", label: "모든 브랜드" }}
      />
      <Select
        name="keyword_type"
        options={[
          { value: "number", label: "사업자번호" },
          { value: "name", label: "사업자명" },
        ]}
        onChange={handleSelectBox}
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
        />
      </div>
      <button className="btn btn-sm btn-accent" onClick={getCompanyList}>검색</button>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => companyModalRef.current.showModal()}
      >
        업체등록
      </button>
    </div>
  )
}

export default SearchBar