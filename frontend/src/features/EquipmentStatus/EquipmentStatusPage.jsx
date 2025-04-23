import React, { useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import Select from "react-select";
import Tooltip from "../../components/tooltip/Tooltip";
import EmptyState from "../../components/emptyState/EmptyState";

const EquipmentStatusPage = () => {
  const tabs = ["전체", "농산", "축산", "수산", "델리"];
  const [activeTab, setActiveTab] = useState(tabs[0]); //임시 탭 STATE
  const [selectedStartDate, setSelectedStartDate] = useState(new Date()); //임시 날짜선택 STATE
  const [selectedEndDate, setSelectedEndDate] = useState(new Date()); //임시 날짜선택 STATE

  return (
    <ContentLayout>
      <div className="flex mb-5 gap-1">
        <div className="flex justify-between w-full">
          <div className="flex flex-wrap items-center gap-1.5">
            <Select
              options={[
                { value: "0", label: "이마트 킨텍스점" },
                { value: "1", label: "이마트 성남분당점" },
                { value: "2", label: "이마트 서울역점" },
              ]}
              className="min-w-56"
              isClearable
              placeholder="모든 점포"
            />
            <div className="mx-5 h-5 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <label className="font-semibold shrink-0">날짜</label>
              <div className="w-40">
                <CustomDatePicker
                  selectedDate={selectedStartDate}
                  onChange={(date) => setSelectedStartDate(date)}
                />
              </div>
              {/* <div> - </div>
              <div className="w-40">
                <CustomDatePicker
                  selectedDate={selectedEndDate}
                  onChange={(date) => setSelectedEndDate(date)}
                />
              </div> */}
            </div>
            <button className="btn btn-accent btn-sm">검색</button>
          </div>
        </div>
      </div>

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
        <div className="search-count">
          <div className="count-number">
            <span>미등록 : </span>
            <b>5</b>
          </div>
          <div className="count-number">
            <span>미송출 : </span>
            <b>22</b>
          </div>
          <div className="count-number">
            <span>송출 : </span>
            <b>80</b>
          </div>
          <div className="count-number">
            <span>합계 : </span>
            <b>107</b>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col border p-2 max-h-[550px]">
          <div className="mb-1 h-9 badge badge-lg badge-error font-semibold">
            미등록 <span className="text-sm font-normal">&nbsp;/ 5대</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="table thead-fixed ">
              <thead>
                <tr>
                  <th className="w-2/12">점포명</th>
                  <th className="w-1/12">MD</th>
                  <th className="w-2/12">마지막 방송시간</th>
                  <th className="w-2/12">메모</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td>EM스타필드점</td>
                    <td>축산</td>
                    <td>2025-01-01 10:00:00</td>
                    <td className="truncate">
                      <Tooltip
                        place="bottom"
                        id={`tooltip-${index}`}
                        content={"재생파일갯수:0"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <EmptyState text="미등록된 건이 없습니다." /> */}
          </div>
        </div>
        <div className="flex flex-col border p-2 max-h-[550px]">
          <div className="mb-1 h-9 badge badge-lg badge-ghost font-semibold">
            미송출 <span className="text-sm font-normal">&nbsp;/ 22대</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="table thead-fixed ">
              <thead>
                <tr>
                  <th className="w-2/12">점포명</th>
                  <th className="w-1/12">MD</th>
                  <th className="w-2/12">마지막 방송시간</th>
                  <th className="w-2/12">메모</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 22 }).map((_, index) => (
                  <tr key={index}>
                    <td>EM킨텍스점</td>
                    <td>델리</td>
                    <td>2025-12-31 12:49:40</td>
                    <td className="truncate">
                      <Tooltip
                        place="bottom"
                        id={`tooltip-${index}`}
                        content={"재생파일개수:123"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col border p-2 max-h-[550px]">
          <div className="mb-1 h-9 badge badge-lg badge-success font-semibold">
            송출 <span className="text-sm font-normal">&nbsp;/ 80대</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="table thead-fixed">
              <thead>
                <tr>
                  <th className="w-2/12">점포명</th>
                  <th className="w-1/12">MD</th>
                  <th className="w-2/12">마지막 방송시간</th>
                  <th className="w-2/12">메모</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 80 }).map((_, index) => (
                  <tr key={index}>
                    <td>EM왕십리점</td>
                    <td>농산</td>
                    <td>2025-01-01 10:00:00</td>
                    <td className="truncate">
                      <Tooltip
                        place="bottom"
                        id={`tooltip-${index}`}
                        content={"재생파일갯수:0"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default EquipmentStatusPage;
