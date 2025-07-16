import React, { useEffect } from "react";
import Tooltip from "../../../../components/tooltip/Tooltip";
import EmptyState from "../../../../components/emptyState/EmptyState";
import {
  toBusinessNumber,
  toPriceFormat,
  toDate,
} from "../../../../utils/customFormat";
import Pagination from "../../../../components/pagination/Pagination";

const ContractTable = ({
  limit,
  page,
  setPage,
  total,
  activeRow,
  contractModalRef,
  contractList,
  handleOpenEditModal,
}) => {
  return (
    <>
      <div className="relative flex justify-between items-end mb-6">
        <div className="flex gap-3">
          <h3 className="text-gray-800 text-2xl font-semibold leading-7">
            {activeRow.business_name}
          </h3>
          <p className="text-gray-500 text-lg font-medium">
            {toBusinessNumber(activeRow.business_number)}
          </p>
        </div>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handleOpenEditModal("add")}
        >
          계약추가
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>광고타입</th>
            <th>계약금액</th>
            <th className="w-3/12">계약기간</th>
            <th>광고등록</th>
            <th>비고</th>
          </tr>
        </thead>
        {contractList.length > 0 && (
          <tbody>
            {contractList.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer"
                onClick={() => handleOpenEditModal("modify", item)}
              >
                <td>{item.ad_type_name}</td>
                <td>{toPriceFormat(item.ad_type_base_price)}</td>
                <td>
                  {toDate(item.contract_from)}
                  <br />~ {toDate(item.contract_to)}
                </td>
                <td>
                  <span
                    className={`font-semibold ${
                      item.status === "승인"
                        ? "text-green-600"
                        : item.status === "반려"
                        ? "text-red-600"
                        : "text-sky-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="truncate">
                  <Tooltip id={1} label={item.comment} content={item.comment} />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {contractList.length === 0 && (
        <EmptyState text="일치하는 검색 결과가 없습니다." />
      )}
      <Pagination limit={limit} page={page} setPage={setPage} total={total} />
    </>
  );
};

export default ContractTable;
