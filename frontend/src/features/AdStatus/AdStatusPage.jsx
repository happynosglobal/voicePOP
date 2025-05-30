import React, { useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Select from "react-select";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import Tooltip from "../../components/tooltip/Tooltip";
import Pagination from "../../components/pagination/Pagination";
import { RiFileExcel2Line } from "react-icons/ri";
import Tab from "../../components/tab/Tab";

const dummyAD = [
  {
    id: "1",
    company: "주식회사 노스글로벌",
    adType: "일반",
    adName: "다함께 즐겨요 맛있는 새우깡 농심새우깡깡깡깡",
    contractPeriod: "2025-01-01 ~ 2025-12-31",
    targetStores: 22,
    contractSlots: 440,
    broadcastCount: 880,
    achievementRate: 200,
    status: "방송중",
  },
  {
    id: "2",
    company: "하림",
    adType: "스탠다드",
    adName: "하림생닭",
    contractPeriod: "2025-01-02 ~ 2025-03-31",
    targetStores: 10,
    contractSlots: 100,
    broadcastCount: 50,
    achievementRate: 50,
    status: "방송중",
  },
  {
    id: "3",
    company: "농심",
    adType: "프리미엄",
    adName: "농심 훌련불",
    contractPeriod: "2025-01-02 ~ 2025-03-31",
    targetStores: 5,
    contractSlots: 50,
    broadcastCount: 10,
    achievementRate: 10,
    status: "방송대기",
  },
  {
    id: "4",
    company: "비비고 ",
    adType: "프리미엄",
    adName: "비비고 왕교자 김치만두",
    contractPeriod: "2025-01-02 ~ 2025-03-31",
    targetStores: 5,
    contractSlots: 3678,
    broadcastCount: 324,
    achievementRate: 8.8,
    status: "방송대기",
  },
];

const AdStatusPage = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date()); //임시 날짜선택 STATE
  const [selectedEndDate, setSelectedEndDate] = useState(new Date()); //임시 날짜선택 STATE

  const tabs = ["업체별 현황", "점포별 현황"];
  const [activeTab, setActiveTab] = useState(tabs[0]); //임시 탭 STATE
  return (
    <ContentLayout>
      <div className="flex mb-5 gap-1">
        <div className="flex justify-between w-full">
          <div className="flex flex-wrap items-center gap-1.5">
            <Select
              options={[
                { value: "1", label: "주식회사 노스글로벌" },
                { value: "2", label: "농심" },
                { value: "3", label: "풀무원" },
              ]}
              className="min-w-44"
              isClearable
              placeholder="모든 광고업체"
            />

            <Select
              options={[
                { value: "1", label: "일반" },
                { value: "2", label: "스탠다드" },
                { value: "3", label: "프리미엄" },
              ]}
              className="min-w-32"
              isClearable
              placeholder="모든 광고타입"
            />
            <Select
              options={[
                { value: "0", label: "이마트 킨텍스점" },
                { value: "1", label: "이마트 성남분당점" },
                { value: "2", label: "이마트 서울역점" },
              ]}
              className="min-w-44"
              isClearable
              placeholder="모든 점포"
            />

            <div className="mx-5 h-5 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <label className="font-semibold shrink-0">기간</label>
              <div className="w-40">
                <CustomDatePicker
                  selectedDate={selectedStartDate}
                  onChange={(date) => setSelectedStartDate(date)}
                />
              </div>
              <div> - </div>
              <div className="w-40">
                <CustomDatePicker
                  selectedDate={selectedEndDate}
                  onChange={(date) => setSelectedEndDate(date)}
                />
              </div>
            </div>
            <button className="btn btn-accent btn-sm">검색</button>
          </div>
          <button className="btn btn-sm btn-success">
            <RiFileExcel2Line className="text-xl" /> 엑셀다운로드
          </button>
        </div>
      </div>

      <ul className="flex mb-7 gap-2">
        {activeTab === "업체별 현황" && (
          <>
            <li className="flex-1 flex items-center justify-center h-14 bg-[#484C56] rounded-[10px] text-white gap-1.5">
              <span className="text-lg font-medium">광고수 </span>
              <span className="text-2xl font-semibold">124</span>
            </li>
            <li className="flex-1 flex items-center justify-center h-14 bg-[#484C56] rounded-[10px] text-white gap-1.5">
              <span className="text-lg font-medium">업체수 </span>
              <span className="text-2xl font-semibold">498</span>
            </li>
            <li className="flex-1 flex items-center justify-center h-14 bg-[#484C56] rounded-[10px] text-white gap-1.5">
              <span className="text-lg font-medium">일반</span>
              <span className="text-2xl font-semibold">211</span>
            </li>
            <li className="flex-1 flex items-center justify-center h-14 bg-[#484C56] rounded-[10px] text-white gap-1.5">
              <span className="text-lg font-medium">스탠다드 </span>
              <span className="text-2xl font-semibold">10</span>
            </li>
            <li className="flex-1 flex items-center justify-center h-14 bg-[#484C56] rounded-[10px] text-white gap-1.5">
              <span className="text-lg font-medium">프리미엄 </span>
              <span className="text-2xl font-semibold">19</span>
            </li>
          </>
        )}
        {activeTab === "점포별 현황" && (
          <li className="flex-1 flex items-center justify-center h-14 bg-[#484C56] rounded-[10px] text-white gap-1.5">
            <span className="text-lg font-medium">전체 점포 </span>
            <span className="text-2xl font-semibold">111</span>
          </li>
        )}
      </ul>

      <div className="tabs-wrapper">
        <div className="tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "is-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "업체별 현황" ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th className="wide:w-2/12">업체명</th>
                <th className="w-1/12">광고타입</th>
                <th className="wide:w-2/12">광고명</th>
                <th className="w-2/12">계약기간</th>
                <th>대상점포</th>
                <th>계약구좌</th>
                <th>송출횟수</th>
                <th className="wide:w-2/12">달성율</th>
                <th className="w-1/12">상태</th>
              </tr>
            </thead>
            <tbody>
              {dummyAD.map((item, index) => (
                <tr key={item.id}>
                  <td className="truncate">
                    <Tooltip id={item.id} content={item.company} />
                  </td>
                  <td>{item.adType}</td>
                  <td className="truncate">
                    <Tooltip id={item.id} content={item.adName} />
                  </td>
                  <td className="wide:text-base text-sm">
                    {item.contractPeriod}
                  </td>
                  <td>{item.targetStores}</td>
                  <td>{item.contractSlots}</td>
                  <td>{item.broadcastCount}</td>
                  <td>
                    <div className="relative w-full flex wide:gap-0 gap-1 items-center justify-between">
                      <progress
                        className="progress w-3/4"
                        value={item.achievementRate}
                        max="100"
                      ></progress>
                      <p className="text-right text-sm w-1/4">
                        {item.achievementRate}%
                      </p>
                    </div>
                  </td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>점포명</th>
                <th>계약구좌</th>
                <th>송출횟수</th>
                <th>달성율</th>
                <th>최근 방송시각</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이마트 용산점</td>
                <td>5</td>
                <td>10</td>
                <td>
                  <div className="relative w-full flex wide:gap-0 gap-1 items-center justify-between">
                    <progress
                      className="progress w-3/4"
                      value={20}
                      max="100"
                    ></progress>
                    <p className="text-right text-sm w-1/4">20%</p>
                  </div>
                </td>
                <td>2025-02-01 13:13:15</td>
              </tr>
              <tr>
                <td>이마트 킨텍스점</td>
                <td>1,245</td>
                <td>227</td>
                <td>
                  <div className="relative w-full flex wide:gap-0 gap-1 items-center justify-between">
                    <progress
                      className="progress w-3/4"
                      value={67.2}
                      max="100"
                    ></progress>
                    <p className="text-right text-sm w-1/4">67.2%</p>
                  </div>
                </td>
                <td>2025-03-05 21:24:45</td>
              </tr>
            </tbody>
          </table>
          <Pagination />
        </>
      )}
    </ContentLayout>
  );
};

export default AdStatusPage;
