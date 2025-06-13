import ContentLayout from "../../layout/ContentLayout";
import Tooltip from "../../components/tooltip/Tooltip";
import Select from "react-select";
import ReservationManagemenTable from "./components/ReservationManagemenTable";
import Tab from "../../components/tab/Tab";
import { useState } from "react";

const dummyBroadcast = [
  {
    id: 1,
    type: "광고",
    title: "손이가요~손이가~새우깡에 손이가요~",
    store: "적점",
    md: "농산",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    startTime: "09:00",
    endTime: "22:00",
    gap: "5분",
    playTime: 60,
    repeatCount: 100,
    repeatInterval: 0,
    registrant: "084100",
    file: "새우깡CM송.mp3",
    status: "방송중",
  },
  {
    id: 2,
    type: "행사",
    title: "6월 수산대전 빅세일",
    store: "100개점",
    md: "수산",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    startTime: "09:00",
    endTime: "18:00",
    gap: "60초",
    playTime: 60,
    repeatCount: 10,
    repeatInterval: 0,
    registrant: "084100",
    file: "수산대전빅세일.mp3",
    status: "방송중",
  },
  {
    id: 3,
    type: "일반",
    title: "원사점 마감 복숭아 폭탄 세일",
    store: "원사점",
    md: "축산",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    startTime: "10:00",
    endTime: "13:00",
    gap: "15분",
    playTime: 60,
    repeatCount: 99,
    repeatInterval: 0,
    registrant: "084100",
    file: "마감방송.mp3",
    status: "방송중",
  },
];

const ReservationManagementPage = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <ContentLayout>
      <div className="flex mb-5 gap-1">
        <div className="flex justify-between w-full">
          <div className="flex flex-wrap items-center gap-1.5">
            <Select
              options={[
                { value: "1", label: "전체" },
                { value: "2", label: "광고방송" },
                { value: "3", label: "일반방송" },
              ]}
              className="min-w-44"
              isClearable
              placeholder="전체"
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
          </div>
          <div className="flex items-start gap-2">
            <button class="btn btn-sm btn-primary w-20">수정</button>
            <button class="btn btn-sm btn-error  w-20">삭제</button>
          </div>
        </div>
      </div>

      <Tab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTabChange={(code) => {
          setSearchParams((prev) => ({
            ...prev,
            category_code: code,
          }));
        }}
      />

      <div className="mt-6">
        <ReservationManagemenTable title="방송중" data={dummyBroadcast} />
        <ReservationManagemenTable title="예약완료" data={dummyBroadcast} />
      </div>
    </ContentLayout>
  );
};

export default ReservationManagementPage;
