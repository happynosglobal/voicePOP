import React, { useEffect, useRef, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Title from "../../components/title/Title";
import AddCompanyModal from "./components/modal/AddCompanyModal";
import AddContractModal from "./components/modal/AddContractModal";
import AdCompanyList from "./components/AdCompanyList";
import AdContractList from "./components/AdContractList";
import useHandleContract from "./hooks/useHandleContract";

const AdCompanyRegisterPage = () => {

  const [activeRow, setActiveRow] = useState(null); // 광고계약관리 리스트 선택 상태

  const handleRowClick = (rowData) => {
    setActiveRow(rowData);
  };

  const companyModalRef = useRef(null); // 업체 등록 모달 ref
  const contractModalRef = useRef(null); // 계약 등록 모달 ref

  return (
    <ContentLayout>
      <Title text="광고계약 관리" />
      <div className=" flex gap-6">
        {/* 광고업체 */}
        <AdCompanyList
          activeRow={activeRow}
          companyModalRef={companyModalRef}
          handleRowClick={handleRowClick}
        />
        {/* 광고계약 */}
        <AdContractList
          activeRow={activeRow}
          contractModalRef={contractModalRef}
        />
      </div>
      <AddCompanyModal modalRef={companyModalRef} /> {/* 업체등록 모달 */}
      <AddContractModal modalRef={contractModalRef} /> {/* 계약추가 모달 */}
    </ContentLayout>
  );
};

export default AdCompanyRegisterPage;
