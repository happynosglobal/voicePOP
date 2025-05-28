import React, { useEffect } from 'react'
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
    limit,
    setLimit,
    page,
    setPage,
    total,
    setTotal,
    searchParams,
    companyList,
    getCompanyList,
    handleInput,
    handleSelectBox
  } = useHandleCompany();

  useEffect(() => {
    getCompanyList();
  }, [page]);
  
  return (
    <>
      <div className="relative wide:w-2/5 w-1/2">
        <SearchBar
          getCompanyList={getCompanyList}
          searchParams={searchParams}
          companyModalRef={companyModalRef}
          handleInput={handleInput}
          handleSelectBox={handleSelectBox}
        />

        <CompanyTable
          limit={limit}
          page={page}
          setPage={setPage}
          total={total}
          getCompanyList={getCompanyList}
          companyList={companyList}
          activeRow={activeRow}
          handleRowClick={handleRowClick}
        />
      </div>
      <AddCompanyModal
        modalRef={companyModalRef}
        getCompanyList={getCompanyList}
      />
    </>
  )
}

export default CompanyList;