import React, { useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Select from "react-select";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import Tooltip from "../../components/tooltip/Tooltip";
import Pagination from "../../components/pagination/Pagination";
import AdStatsTable from "./components/AdStatsTable";

const dummyAD = [
  {
    md: "농산",
    adCount: 2,
    contractTarget: 1000,
    broadcasts: 500,
    achievementRate: 50,
    contractAmount: 10000,
    adRevenue: 7000,
  },
  {
    md: "농산",
    adCount: 1,
    contractTarget: 300,
    broadcasts: 300,
    achievementRate: 100,
    contractAmount: 15000,
    adRevenue: 10000,
  },
  {
    md: "농산",
    adCount: 2,
    contractTarget: 1000,
    broadcasts: 500,
    achievementRate: 50,
    contractAmount: 10000,
    adRevenue: 7000,
  },
  {
    md: "농산",
    adCount: 1,
    contractTarget: 300,
    broadcasts: 300,
    achievementRate: 77.8,
    contractAmount: 15000,
    adRevenue: 10000,
  },
  {
    md: "축산",
    adCount: 1,
    contractTarget: 500,
    broadcasts: 400,
    achievementRate: 92.7,
    contractAmount: 5000,
    adRevenue: 4000,
  },
  {
    md: "축산",
    adCount: 1,
    contractTarget: 500,
    broadcasts: 400,
    achievementRate: 32.8,
    contractAmount: 5000,
    adRevenue: 4000,
  },

  {
    md: "축산",
    adCount: 1,
    contractTarget: 500,
    broadcasts: 400,
    achievementRate: 22.5,
    contractAmount: 5000,
    adRevenue: 4000,
  },
  {
    md: "델리",
    adCount: 1,
    contractTarget: 200,
    broadcasts: 160,
    achievementRate: 100,
    contractAmount: 5000,
    adRevenue: 3000,
  },
];

const AdStatsPage = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date()); //임시 날짜선택 STATE
  const [selectedEndDate, setSelectedEndDate] = useState(new Date()); //임시 날짜선택 STATE

  const filterByMD = (mdName) => dummyAD.filter((item) => item.md === mdName); //임시더미데이터 처리

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
        </div>
      </div>

      <AdStatsTable title="합계" data={dummyAD} />
      <AdStatsTable title="농산" data={filterByMD("농산")} />
      <AdStatsTable title="축산" data={filterByMD("축산")} />
      <AdStatsTable title="델리" data={filterByMD("델리")} />
    </ContentLayout>
  );
};

export default AdStatsPage;
