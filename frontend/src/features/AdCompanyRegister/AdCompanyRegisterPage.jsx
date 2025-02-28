import React, { useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Title from "../../components/title/Title";
import Pagination from "../../components/pagination/Pagination";

import Select from "react-select";
import EmptyState from "../../components/emptyState/EmptyState";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import Tooltip from "../../components/tooltip/Tooltip";

const dummyAD = [
  {
    id: 1,
    order: 33,
    business_name: "주식회사 노스글로벌",
    business_number: "123-12-12345",
    brand: "ED",
    notes: "25년 계약업체",
  },
  {
    id: 2,
    order: 33,
    business_name: "농심",
    business_number: "123-12-12345",
    brand: "EM",
    notes:
      "텍스트 잔뜩잔뜩잔뜩잔뜩 길어질 수 있음, 염두 해야함 텍스트 잔뜩잔뜩잔뜩잔뜩 길어질 수 있음",
  },
  {
    id: 3,
    order: 33,
    business_name: "풀무원",
    business_number: "123-12-12345",
    brand: "ED",
    notes: "",
  },
  {
    id: 4,
    order: 33,
    business_name: "해태제과",
    business_number: "123-12-12345",
    brand: "EM",
    notes: "",
  },
  {
    id: 5,
    order: 33,
    business_name: "비비고",
    business_number: "123-12-12345",
    brand: "ED",
    notes: "",
  },
  {
    id: 6,
    order: 33,
    business_name: "오뚜기",
    business_number: "123-12-12345",
    brand: "EM",
    notes: "",
  },
  {
    id: 7,
    order: 33,
    business_name: "삼양",
    business_number: "456-78-91011",
    brand: "EM",
    notes: "신규계약",
  },
  {
    id: 8,
    order: 33,
    business_name: "CJ제일제당",
    business_number: "222-33-44455",
    brand: "ED",
    notes: "10년 장기 계약",
  },
  {
    id: 9,
    order: 33,
    business_name: "CJ제일제당",
    business_number: "555-66-77788",
    brand: "EM",
    notes: "VIP 파트너쉽",
  },
  {
    id: 10,
    order: 33,
    business_name: "빙그레",
    business_number: "999-88-77766",
    brand: "ED",
    notes: "",
  },
];

const AdCompanyRegisterPage = () => {
  const [activeRow, setActiveRow] = useState(null);

  const handleRowClick = (id) => {
    setActiveRow(id === activeRow ? null : id);
  };

  return (
    <ContentLayout>
      <Title text="광고계약 관리" />
      <div className=" flex gap-6">
        <div className="relative w-2/5">
          <LoadingSpinner isLoading={false} />
          {/* 검색영역 */}
          <div className="flex mb-5 gap-1.5">
            <Select
              options={[
                { value: "0", label: "전체 브랜드" },
                { value: "EM", label: "EM" },
                { value: "ED", label: "ED" },
              ]}
              className="min-w-32"
              defaultValue={{ value: "0", label: "전체 브랜드" }}
            />
            <Select
              options={[
                { value: "1", label: "사업자번호" },
                { value: "2", label: "사업자명" },
              ]}
              defaultValue={{ value: "1", label: "사업자번호" }}
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                class="input input-bordered w-full focus:ring-0 focus:outline-none"
              />
            </div>
            <button className="btn btn-sm btn-accent">검색</button>
            <button className="btn btn-sm btn-primary">업체등록</button>
          </div>
          {/* 검색영역 */}
          <table>
            <thead>
              <tr>
                <th className="w-14">순서</th>
                <th>사업자명</th>
                <th>사업자번호</th>
                <th className="w-24">브랜드</th>
                <th>비고</th>
              </tr>
            </thead>
            {dummyAD.length > 0 && (
              <tbody>
                {dummyAD.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`cursor-pointer ${
                      activeRow === item.id ? "active" : ""
                    }`}
                    onClick={() => handleRowClick(item.id)}
                  >
                    <td>{dummyAD.length - index}</td>
                    <td>{item.business_name}</td>
                    <td>{item.business_number}</td>
                    <td>{item.brand}</td>
                    <td>
                      <Tooltip id={item.id} content={item.notes} />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {/* <EmptyState text="일치하는 검색 결과가 없습니다." /> */}
          {/* <EmptyState text="등록된 리스트가 없습니다." />  */}
          <Pagination />
        </div>
        <div className="relative flex-1 p-5 bg-sky-50 rounded-[10px] border border-blue-200">
          <LoadingSpinner isLoading={false} />
          {activeRow ? (
            <>
              <div className="relative flex justify-between items-end mb-6">
                <div className="flex gap-3">
                  <h3 className="text-gray-800 text-2xl font-semibold leading-7">
                    농심
                  </h3>
                  <p className="text-gray-500 text-lg font-medium">
                    123-12-12345
                  </p>
                </div>
                <button className="btn btn-sm btn-primary ">계약추가</button>
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
                <tbody>
                  <tr>
                    <td>일반</td>
                    <td>211,100,000</td>
                    <td>120,000</td>
                    <td>2025.01.01~2025.12.31</td>
                    <td>
                      <span className="text-green-600 font-semibold">승인</span>
                    </td>
                    <td className="truncate"></td>
                  </tr>
                  <tr>
                    <td>스탠다드</td>
                    <td>10,000</td>
                    <td>2,000</td>
                    <td>2025.01.01~2025.12.31</td>
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
                    <td>2025.01.01~2025.12.31</td>
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
                    <td>2025.01.01~2025.12.31</td>
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
                    <td>2025.01.01~2025.12.31</td>
                    <td>
                      <span className="text-blue-600 font-semibold">
                        미등록
                      </span>
                    </td>
                    <td className="truncate"></td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <EmptyState text="자세한 계약 내용을 확인하려면 항목을 클릭하세요." />
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
};

export default AdCompanyRegisterPage;
