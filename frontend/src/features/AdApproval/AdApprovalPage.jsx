import React from "react";
import ContentLayout from "../../layout/ContentLayout";
import Tooltip from "../../components/tooltip/Tooltip";

const dummyAD = [
  {
    broadcastName: "2월 바나나 행사",
    companyName: "농심",
    companyNumber: "123-45-678901",
    adType: "일반",
    contractAmount: 10000,
    contractPeriod: "2025-06-12 ~ 2025-06-12",
  },
  {
    broadcastName: "3월 라면 행사 테스트 길어질경우 테스트 중입니다.",
    companyName: "롯데",
    companyNumber: "123-45-678901",
    adType: "스탠다드",
    contractAmount: 20000,
    contractPeriod: "2025-06-20 ~ 2025-06-30",
  },
  {
    broadcastName: "5월 수박 행사",
    companyName: "주식회사 풀무원",
    companyNumber: "123-45-678901",
    adType: "프리미엄",
    contractAmount: 100000000,
    contractPeriod: "2025-06-01 ~ 2025-06-12",
  },
  {
    broadcastName: "농협 영동 천도복숭아 행사",
    companyName: "농업협동조합",
    companyNumber: "123-45-678901",
    adType: "프리미엄",
    contractAmount: 12010020,
    contractPeriod: "2025-07-01 ~ 2025-07-12",
  },
  {
    broadcastName: "모짜렐라 치즈 듬뿍 핫도그 8월 빅세일",
    companyName: "핫도그 주식회사",
    companyNumber: "123-45-678901",
    adType: "프리미엄",
    contractAmount: 58560000,
    contractPeriod: "2025-07-01 ~ 2025-07-12",
  },
];

const AdApprovalPage = () => {
  return (
    <ContentLayout>
      <div className="mb-10">
        <h3 className="mb-2 text-gray-800 text-xl font-semibold">
          승인대기 (5)
        </h3>
        <table className="table">
          <thead>
            <tr>
              <th>방송명</th>
              <th className="w-2/12">사업자명</th>
              <th className="w-2/12">사업자번호</th>
              <th className="w-1/12">광고타입</th>
              <th className="w-1/12">계약금액</th>
              <th className="w-2/12">계약기간</th>
              <th className="w-36">승인여부</th>
            </tr>
          </thead>
          <tbody>
            {dummyAD.map((item, index) => (
              <tr key={index}>
                <td className="truncate">
                  <Tooltip id={index} content={item.broadcastName} />
                </td>
                <td className="truncate">
                  <Tooltip id={index} content={item.companyName} />
                </td>
                <td>{item.companyNumber}</td>
                <td>{item.adType}</td>
                <td>{item.contractAmount.toLocaleString()}</td>
                <td>{item.contractPeriod}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button class="btn btn-xs btn-primary">승인</button>
                    <button class="btn btn-xs btn-error">반려</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ContentLayout>
  );
};

export default AdApprovalPage;
