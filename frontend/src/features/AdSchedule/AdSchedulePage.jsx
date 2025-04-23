import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";
import ContentLayout from "../../layout/ContentLayout";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const today = new Date();
const nextDay = addDays(today, 1);
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();
const nextDayDate = nextDay.getDate();

const categoryColors = {
  농산: "#22C55E",
  축산: "#FB923C",
  수산: "#6366F1",
  델리: "#06B6D4",
};

const dummyEvents = [
  {
    id: 1,
    title: "[농산] 키위광고",
    category: "농산",
    start: new Date(year, month, day, 10, 0),
    end: new Date(year, month, day, 10, 10),
  },
  {
    id: 2,
    title: "[농산] 감자 광고",
    category: "농산",
    start: new Date(year, month, day, 10, 0),
    end: new Date(year, month, day, 10, 20),
  },
  {
    id: 3,
    title: "[축산] 한우 특가 이벤트",
    category: "축산",
    start: new Date(year, month, day, 11, 0),
    end: new Date(year, month, day, 11, 30),
  },
  {
    id: 4,
    title: "[수산] 고등어 할인 행사",
    category: "수산",
    start: new Date(year, month, day, 11, 20),
    end: new Date(year, month, day, 11, 30),
  },
  {
    id: 5,
    title: "[수산] 연어 프로모션",
    category: "수산",
    start: new Date(year, month, day, 12, 10),
    end: new Date(year, month, day, 12, 15),
  },
  {
    id: 6,
    title: "[축산] 대게 특가 세일",
    category: "축산",
    start: new Date(year, month, day, 12, 0),
    end: new Date(year, month, day, 12, 30),
  },
  {
    id: 7,
    title: "[델리] 새우 할인 행사",
    category: "델리",
    start: new Date(year, month, day, 12, 0),
    end: new Date(year, month, day, 12, 40),
  },
  {
    id: 8,
    title: "[농산] 사과 광고",
    category: "농산",
    start: new Date(year, month, nextDayDate, 10, 30),
    end: new Date(year, month, nextDayDate, 10, 50),
  },
  {
    id: 9,
    title: "[축산] 돼지고기 특가",
    category: "축산",
    start: new Date(year, month, nextDayDate, 11, 0),
    end: new Date(year, month, nextDayDate, 11, 30),
  },
  {
    id: 10,
    title: "[수산] 참치 할인 행사",
    category: "수산",
    start: new Date(year, month, nextDayDate, 13, 0),
    end: new Date(year, month, nextDayDate, 13, 30),
  },
  {
    id: 11,
    title: "[델리] 빵 프로모션",
    category: "델리",
    start: new Date(year, month, nextDayDate, 14, 0),
    end: new Date(year, month, nextDayDate, 14, 20),
  },
  {
    id: 12,
    title: "[델리] 샐러드 신제품 광고",
    category: "델리",
    start: new Date(year, month, nextDayDate, 15, 0),
    end: new Date(year, month, nextDayDate, 15, 30),
  },
];

const CustomToolbar = ({
  label,
  date,
  onNavigate,
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
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
      <div className="flex items-center gap-4 px-4 py-2 mb-2 bg-gray-100 rounded-lg text-gray-700">
        <button onClick={() => onNavigate("PREV")}>
          <AiOutlineLeft className="mr-2" />{" "}
        </button>
        <div className="w-40">
          <CustomDatePicker selectedDate={date} />
        </div>
        <button onClick={() => onNavigate("NEXT")}>
          <AiOutlineRight className="ml-2" />{" "}
        </button>
        <button
          onClick={() => onNavigate("TODAY")}
          className="btn btn-sm btn-accent"
        >
          오늘
        </button>
      </div>
    </div>
  );
};

const AdSchedulePage = () => {
  const [events] = useState(dummyEvents);
  const tabs = ["전체", "농산", "축산", "수산", "델리"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <ContentLayout>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="day"
        views={["day"]}
        step={10}
        timeslots={6}
        min={new Date(year, month, day, 9, 0)}
        max={new Date(year, month, day, 22, 0)}
        defaultDate={today}
        formats={{
          timeGutterFormat: (date) => format(date, "HH:mm"),
          eventTimeRangeFormat: ({ start, end }) =>
            `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`,
        }}
        style={{ height: "1600px" }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: categoryColors[event.category] || "#888888",
            color: "#fff",
            borderRadius: "6px",
            padding: "4px 10px",
            border: "1px solid #fff",
          },
        })}
        components={{
          toolbar: (props) => (
            <CustomToolbar
              {...props}
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ),
        }}
      />
    </ContentLayout>
  );
};

export default AdSchedulePage;
