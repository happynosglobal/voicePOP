import React, { useEffect } from 'react'
import Tooltip from '../../../../components/tooltip/Tooltip'
import useHandleContract from '../../hooks/useHandleContract';

const ContractTable = ({
  activeRow,
  contractModalRef
}) => {
  const {
    contractList,
    getContractList
  } = useHandleContract();
  // 임시 광고계약 리스트 로드
  useEffect(() => {
    getContractList();
  }, [activeRow])

  return (
    <>
      <div className="relative flex justify-between items-end mb-6">
        <div className="flex gap-3">
          <h3 className="text-gray-800 text-2xl font-semibold leading-7">
            {activeRow.business_name}
          </h3>
          <p className="text-gray-500 text-lg font-medium">
            {activeRow.business_number}
          </p>
        </div>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => contractModalRef.current.showModal()}
        >
          계약추가
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>광고타입</th>
            <th>계약금액</th>
            <th>계약구좌</th>
            <th className="w-3/12">계약기간</th>
            <th>광고등록</th>
            <th>비고</th>
          </tr>
        </thead>
        {contractList.length > 0 && (
          <tbody>
            {contractList.map((item, index) => (
              <tr key={index}>
                <td>{item.ad_type_name}</td>
                <td>{item.ad_type_base_price}</td>
                <td>{item.ad_type_base_price}</td>
                <td>{`${item.contract_from} ~ ${item.contract_to}`}</td>
                <td>
                  <span className="text-green-600 font-semibold">{item.status}</span>
                </td>
                <td className="truncate">
                  <Tooltip
                    id={1}
                    content={
                      item.comment
                    }
                  />
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>일반</td>
              <td>211,100,000</td>
              <td>120,000</td>
              <td>2025.01.01 ~ 2025.12.31</td>
              <td>
                <span className="text-green-600 font-semibold">승인</span>
              </td>
              <td className="truncate"></td>
            </tr>
            <tr>
              <td>스탠다드</td>
              <td>10,000</td>
              <td>2,000</td>
              <td>2025.01.01 ~ 2025.12.31</td>
              <td>
                <span className="text-red-600 font-semibold">미승인</span>
              </td>
              <td className="truncate">
                <Tooltip
                  id={1}
                  content={
                    "툴팁 컴포넌트 만들어 두었어요. 필요한곳에 넣으세요"
                  }
                />
              </td>
            </tr>
            <tr>
              <td>프리미엄</td>
              <td>10,000</td>
              <td>2,000</td>
              <td>2025.01.01 ~ 2025.12.31</td>
              <td>
                <span className="text-blue-600 font-semibold">
                  미등록
                </span>
              </td>
              <td className="truncate"></td>
            </tr>
            <tr>
              <td>프리미엄</td>
              <td>10,000</td>
              <td>2,000</td>
              <td>2025.01.01 ~ 2025.12.31</td>
              <td>
                <span className="text-blue-600 font-semibold">
                  미등록
                </span>
              </td>
              <td className="truncate"></td>
            </tr>
            <tr>
              <td>프리미엄</td>
              <td>10,000</td>
              <td>2,000</td>
              <td>2025.01.01 ~ 2025.12.31</td>
              <td>
                <span className="text-blue-600 font-semibold">
                  미등록
                </span>
              </td>
              <td className="truncate"></td>
            </tr> */}
          </tbody>
        )}
      </table>
    </>
  )
}

export default ContractTable