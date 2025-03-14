import React from 'react'
import LoadingSpinner from '../../../components/loading/LoadingSpinner'
import SearchBar from './SearchBar';
import CompanyTable from './table/CompanyTable';
import useHandleCompany from '../hooks/useHandleCompany';
import AddCompanyModal from './modal/AddCompanyModal';

const CompanyList = ({
  activeRow,
  companyModalRef,
  handleRowClick,
}) => {
  const {
    searchParams,
    companyList,
    getCompanyList,
    handleInput,
    handleSelectBox,
  } = useHandleCompany();

  return (
    <>
      <div className="relative wide:w-2/5 w-1/2">
        <LoadingSpinner isLoading={false} />

        <SearchBar
          getCompanyList={getCompanyList}
          searchParams={searchParams}
          companyModalRef={companyModalRef}
          handleInput={handleInput}
          handleSelectBox={handleSelectBox}
        />

        <CompanyTable
          companyList={companyList}
          activeRow={activeRow}
          handleRowClick={handleRowClick}
        />
      </div>
      <AddCompanyModal modalRef={companyModalRef} /> {/* 업체등록 모달 */}
    </>
  )
}

export default CompanyList;