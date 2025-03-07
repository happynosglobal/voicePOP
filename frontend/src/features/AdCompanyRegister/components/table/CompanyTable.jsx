import React from "react";
import Tooltip from "../../../../components/tooltip/Tooltip";
import Pagination from "../../../../components/pagination/Pagination";
import EmptyState from "../../../../components/emptyState/EmptyState";

const CompanyTable = ({ companyList, activeRow, handleRowClick }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="w-14">순서</th>
            <th>사업자명</th>
            <th>사업자번호</th>
            <th className="w-24">브랜드</th>
            <th>비고</th>
          </tr>
        </thead>
        {companyList.length > 0 && (
          <tbody>
            {companyList.map((item, index) => (
              <tr
                key={item.index}
                className={`cursor-pointer ${
                  activeRow?.id === item.id ? "active" : ""
                }`}
                onClick={() => handleRowClick(item)}
              >
                <td>{item.seq}</td>
                <td>{item.business_name}</td>
                <td>{item.business_number}</td>
                <td>{item.brand_code}</td>
                <td>
                  <Tooltip id={item.id} content={item.comment} />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {companyList.length === 0 && (
        <EmptyState text="일치하는 검색 결과가 없습니다." />
      )}
      {/* <EmptyState text="등록된 리스트가 없습니다." /> */}
      <Pagination />
    </>
  );
};

export default CompanyTable;
