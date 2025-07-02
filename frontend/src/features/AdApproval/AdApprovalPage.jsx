import React, { useEffect, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Tooltip from "../../components/tooltip/Tooltip";
import {
  getAdContractList,
  patchAdContract,
} from "../../api/advertisement/advertisement";
import { getErrorMessage } from "../../utils/constant/messages";
import { toast } from "react-toastify";
import {
  toBusinessNumber,
  toDate,
  toPriceFormat,
} from "../../utils/customFormat";
import EmptyState from "../../components/emptyState/EmptyState";

const AdApprovalPage = () => {
  const [contractList, setContractList] = useState([]);
  const getContractList = async () => {
    const tempParams = {
      use_yn: "Y",
      page: 1,
      page_size: 1000,
      status: "미등록",
    };
    try {
      const response = await getAdContractList(tempParams);
      const { status, data } = response;
      if (status === 200) {
        setContractList(data.data.items);
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };

  const editContractStatus = async (id, status) => {
    const body = {
      status: status,
      use_yn: "Y",
    };
    try {
      const response = await patchAdContract(id, body);
      const { status, data } = response;
      if (status === 200) {
        getContractList();
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };
  useEffect(() => {
    getContractList();
  }, []);

  return (
    <ContentLayout>
      <div className="mb-10">
        <h3 className="mb-2 text-gray-800 text-xl font-semibold">
          승인대기 ({contractList.length})
        </h3>
        <table className="table">
          <thead>
            <tr>
              {/* <th>방송명</th> */}
              <th>사업자명</th>
              <th className="w-2/12">사업자번호</th>
              <th className="w-2/12">광고타입</th>
              <th className="w-2/12">계약금액</th>
              <th className="w-2.5/12">계약기간</th>
              <th className="w-36">승인여부</th>
            </tr>
          </thead>
          <tbody>
            {contractList.map((item, index) => (
              <tr key={index}>
                <td className="truncate">
                  <Tooltip id={index} content={item.business_name} />
                </td>
                <td>{toBusinessNumber(item.business_number)}</td>
                <td>{item.ad_type_name}</td>
                <td>{toPriceFormat(item.ad_type_base_price)}</td>
                <td>{`${toDate(item.contract_from)} ~ ${toDate(
                  item.contract_to
                )}`}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => editContractStatus(item.id, "승인")}
                    >
                      승인
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => editContractStatus(item.id, "반려")}
                    >
                      반려
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {contractList.length === 0 && (
          <EmptyState text="일치하는 검색 결과가 없습니다." />
        )}
      </div>
    </ContentLayout>
  );
};

export default AdApprovalPage;
