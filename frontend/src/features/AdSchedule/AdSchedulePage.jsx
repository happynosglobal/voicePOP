import React, { useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import Select from "react-select";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { toast } from "react-toastify";

import "react-big-calendar/lib/css/react-big-calendar.css";
import ContentLayout from "../../layout/ContentLayout";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import useCodes from "../../stores/codes";
import useCategoryCode from "../../hooks/useCategoryCode";
import useUserStore from "../../stores/user";
import { getBcMasterList } from "../../api/broadcast/broadcast";
import { removeEmptyString, toDate } from "../../utils/customFormat";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const categoryColors = {
  "1": "#22C55E",
  "2": "#FB923C",
  "3": "#6366F1",
  "4": "#06B6D4",
};

const convertItemsToEvents = (items, selectedDate) => {
  const allEvents = [];

  items.forEach((item) => {
    const id = item.id;
    const title = item.title;
    const category = item.category_type_seq;

    const parseTime = (timeStr) => {
      const hour = parseInt(timeStr.slice(0, 2), 10);
      const minute = parseInt(timeStr.slice(2, 4), 10);
      return new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hour,
        minute
      );
    };

    const baseStart = parseTime(item.start_time);
    const baseEnd = parseTime(item.end_time);
    const durationMs = baseEnd - baseStart;

    const gap = item.gap;
    const interval = item.repeat_interval;
    const count = item.repeat_count || 1;

    if (gap && gap > 0) {
      let currentStart = new Date(baseStart);
      let i = 0;
      while (currentStart.getTime() + durationMs <= baseEnd.getTime()) {
        const currentEnd = new Date(currentStart.getTime() + durationMs);
        allEvents.push({
          id: `${id}-gap-${i}`,
          title,
          category,
          start: currentStart,
          end: currentEnd,
        });
        currentStart = new Date(currentEnd.getTime() + gap * 1000);
        i++;
      }
    } else if (interval && interval > 0 && count > 0) {
      for (let i = 0; i < count; i++) {
        const start = new Date(baseStart.getTime() + i * interval * 1000);
        const end = new Date(start.getTime() + durationMs);
        allEvents.push({
          id: `${id}-int-${i}`,
          title,
          category,
          start,
          end,
        });
      }
    } else {
      allEvents.push({
        id: `${id}-single`,
        title,
        category,
        start: baseStart,
        end: baseEnd,
      });
    }
  });

  return allEvents;
};

const CustomToolbar = ({
  label,
  date,
  onNavigate,
  tabs,
  activeTab,
  setActiveTab,
  searchParams,
  setSearchParams,
  setDate,
}) => {
  const { storeByBrandCode } = useCodes();

  const handleSelectBox = (option, option2) => {
    const { value } = option;
    const { name } = option2;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="tabs-wrapper">
      <div className="flex items-center gap-4 px-4 py-2 mb-2 bg-gray-100 rounded-lg text-gray-700">
        <button onClick={() => onNavigate("PREV")}> <AiOutlineLeft className="mr-2" /></button>
        <div className="w-40">
          <CustomDatePicker selectedDate={date} onChange={setDate} />
        </div>
        <button onClick={() => onNavigate("NEXT")}> <AiOutlineRight className="ml-2" /></button>
        <button onClick={() => onNavigate("TODAY")} className="btn btn-sm btn-accent">오늘</button>
        <div className="flex flex-wrap items-center gap-1.5">
          <Select
            name="str_code"
            options={[{ value: "", label: "모든 점포" }, ...storeByBrandCode]}
            className="min-w-64"
            onChange={handleSelectBox}
            defaultValue={{ value: "", label: "모든 점포" }}
          />
        </div>
      </div>

      <div className="tabs-nav">
        {tabs.map((option, index) => (
          <button
            key={index}
            className={`tab-btn ${activeTab === option.code ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab(option.code);
              setSearchParams((prev) => ({ ...prev, category_code: option.code }));
            }}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const AdSchedulePage = () => {
  const { user } = useUserStore();
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [searchParams, setSearchParams] = useState({
    str_code: "",
    category_code: "",
    rows_per_page: 1000,
  });
  const [activeTab, setActiveTab] = useState("");
  const { categoryOptions, getCategoryCodes } = useCategoryCode();

  const tabs = useMemo(() => {
    return [{ code: "", name: "전체" }, ...categoryOptions];
  }, [categoryOptions]);

  useEffect(() => {
    getCategoryCodes(user?.brand_code);
  }, [user]);

  useEffect(() => {
    if (tabs.length !== 0) setActiveTab(tabs[0].code);
  }, [tabs]);

  useEffect(() => {
    const getAdList = async () => {
      const tempParams = {
        type: "commercial",
        category_type_seq: searchParams.category_code,
        str_code: searchParams.str_code,
        rows_per_page: 1000,
        search_date: toDate(date),
      };
      const params = removeEmptyString(tempParams);
      try {
        const response = await getBcMasterList(params);
        if (response.status === 200) {
          const events = convertItemsToEvents(response.data.data.items, date);
          setEvents(events);
        }
      } catch (err) {
        toast.error("방송 조회에 실패했습니다.");
        console.error(err);
      }
    };
    getAdList();
  }, [searchParams, date]);

  return (
    <ContentLayout>
      <Calendar
      dayLayoutAlgorithm="no-overlap"
        localizer={localizer}
        events={events}
        defaultView="day"
        views={["day"]}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        step={10}
        timeslots={6}
        min={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0)}
        max={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 22, 0)}
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
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              date={date}
              setDate={setDate}
            />
          ),
        }}
      />
    </ContentLayout>
  );
};

export default AdSchedulePage;
