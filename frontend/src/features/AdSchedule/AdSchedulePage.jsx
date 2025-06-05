import React, { useEffect, useMemo, useRef, useState } from "react";
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
import useUserStore from "../../stores/user";
import {
  getBcMasterList,
  getBcMasterListByStore,
  getBcTargetStore,
} from "../../api/broadcast/broadcast";
import { removeEmptyString, toDate } from "../../utils/customFormat";
import Tab from "../../components/tab/Tab";
import AdEventDetailModal from "./components/AdEventDetailModal";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const convertItemsToEvents = (items, selectedDate) => {
  const allEvents = [];

  items.forEach((item) => {
    const id = item.id;
    const baseTitle = item.title;
    const category = item.category_type_seq;
    const categoryLabel = item.category_type_name;

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

    const gap = item.gap > 0 ? item.gap : 0;
    const interval = item.repeat_interval > 0 ? item.repeat_interval : 0;
    const count = item.repeat_count > 0 ? item.repeat_count : 0;

    const media = item.medias?.[0];
    const mediaId = media?.id;
    const playTimeSeconds =
      media?.play_time_seconds || item.play_time_seconds || "";
    const mediaFilename = media?.media_filename || "미디어 정보를 불러 올수 없습니다";
    const playDurationMs = playTimeSeconds * 1000;

    // GAP이 설정된 방송 : 하나의 이벤트만 생성
    if (gap > 0) {
      allEvents.push({
        originalId: id,
        mediaId: mediaId,
        id: `${id}-gap-full`,
        title: `${baseTitle}`,
        category,
        categoryLabel,
        start: baseStart,
        end: baseEnd,
        gap,
        playTimeSeconds,
        mediaFilename,
      });
    }

    // repeat이 설정된 방송 : count × interval 개수만큼 반복 이벤트 생성
    else if (interval > 0 && count > 0) {
      let currentStart = new Date(baseStart);

      for (let i = 0; i < count; i++) {
        const currentEnd = new Date(currentStart.getTime() + playDurationMs);

        allEvents.push({
          originalId: id,
          mediaId: mediaId,
          id: `${id}-repeat-${i}`,
          title: `${baseTitle}`,
          category,
          categoryLabel,
          start: currentStart,
          end: currentEnd,
          gap,
          playTimeSeconds,
          mediaFilename,
        });

        currentStart = new Date(currentEnd.getTime() + interval * 1000);
      }
    }

    // 아무 조건 없을 경우 단일 이벤트
    else {
      allEvents.push({
        originalId: id,
        mediaId: mediaId,
        id: `${id}-single`,
        title: baseTitle,
        category,
        categoryLabel,
        start: baseStart,
        end: baseEnd,
        gap,
        playTimeSeconds,
        mediaFilename,
      });
    }
  });

  return allEvents;
};

const CustomToolbar = ({
  label,
  date,
  onNavigate,
  user,
  activeTab,
  setActiveTab,
  searchParams,
  setSearchParams,
  setDate,
}) => {
  const { storeByBrandCode } = useCodes();
  const storeOptions = [{ value: "", label: "모든 점포" }, ...storeByBrandCode];

  const handleSelectBox = (option, meta) => {
    const { label, value } = option;
    const { name } = meta;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex items-center gap-4 px-4 py-2 mb-2 bg-gray-100 rounded-lg text-gray-700">
        <button onClick={() => onNavigate("PREV")}>
          <AiOutlineLeft className="mr-2" />
        </button>
        <div className="w-40">
          <CustomDatePicker selectedDate={date} onChange={setDate} />
        </div>
        <button onClick={() => onNavigate("NEXT")}>
          <AiOutlineRight className="ml-2" />
        </button>
        <button
          onClick={() => onNavigate("TODAY")}
          className="btn btn-sm btn-accent"
        >
          오늘
        </button>
        <div className="flex flex-wrap items-center gap-1.5">
          <Select
            name="str_code"
            options={storeOptions}
            className="min-w-64"
            value={storeOptions.find(
              (opt) => opt.value === searchParams.str_code
            )}
            onChange={(option, meta) => {
              if (user?.level !== "STORE") handleSelectBox(option, meta);
            }}
            isDisabled={user?.level === "STORE"}
          />
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
    </>
  );
};

const AdSchedulePage = () => {
  const { user } = useUserStore();
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const { categoryOptions } = useCodes();

  const categoryColorMap = useMemo(() => {
    return categoryOptions.reduce((acc, cur) => {
      acc[cur.code] = cur.color_code;
      return acc;
    }, {});
  }, [categoryOptions]);

  const [searchParams, setSearchParams] = useState({
    str_code: user?.store_code || "",
    category_code: "",
    rows_per_page: 1000,
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const getAdList = async () => {
      const tempParams = {
        type: "commercial",
        category_type_seq: searchParams.category_code,
        rows_per_page: 1000,
        search_date: toDate(date),
        brand_code: user?.brand_code,
        use_yn: "Y",
      };

      const params = removeEmptyString(tempParams);

      try {
        let response;
        if (searchParams.str_code) {
          // str_code가 설정된 경우: 점포별 조회
          response = await getBcMasterListByStore(
            searchParams.str_code,
            params
          );
        } else {
          // 모든 점포의 방송 조회
          response = await getBcMasterList(params);
        }

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

  const handleSelectEvent = async (event) => {
    try {
      const res = await getBcTargetStore(event.originalId, {
        page_size: 1000,
      });
      const stores = res.data.data.items;
      setSelectedEvent({ ...event, stores });
    } catch (e) {
      toast.error("점포 정보를 불러오는 데 실패했습니다.");
      console.error(e);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      modalRef.current.showModal();
    }
  }, [selectedEvent]);
  // 화면 렌더링 시에 현재 시간선이 화면 중앙에 오게
  useEffect(() => {
    const scrollToCurrentTimeCenter = () => {
      const content = document.querySelector(".rbc-time-content");
      if (!content) return;

      const now = new Date();
      const minutesSinceStart = (now.getHours() - 9) * 60 + now.getMinutes();
      const totalMinutes = (22 - 9) * 60;
      const scrollHeight = content.scrollHeight;

      const currentPosition = (minutesSinceStart / totalMinutes) * scrollHeight;

      const scrollTo = currentPosition - content.clientHeight / 2;

      content.scrollTop = Math.max(0, scrollTo); // 음수 방지
    };

    setTimeout(scrollToCurrentTimeCenter, 300);
  }, []);

  return (
    <ContentLayout>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="day"
        views={["day"]}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        step={1}
        timeslots={5}
        popup={true}
        onSelectEvent={handleSelectEvent}
        dayLayoutAlgorithm="no-overlap"
        scrollToTime={new Date(1970, 1, 1, 9, 0)}
        min={
          new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0)
        }
        max={
          new Date(date.getFullYear(), date.getMonth(), date.getDate(), 22, 0)
        }
        formats={{
          timeGutterFormat: (date) => format(date, "HH:mm"),
          eventTimeRangeFormat: ({ start, end }) =>
            `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`,
        }}
        style={{ height: "1600px" }}
        eventPropGetter={(event) => ({
          style: {
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            backgroundColor: categoryColorMap[event.category] || "#888888",
            color: "#fff",
            borderRadius: "6px",
            padding: "4px 10px",
            border: event.mediaId ? "1px solid #fff" : "2px solid #ff4d4f",
          },
        })}
        components={{
          toolbar: (props) => (
            <CustomToolbar
              {...props}
              user={user}
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
      {selectedEvent && (
        <AdEventDetailModal
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          modalRef={modalRef}
          onClose={() => modalRef.current?.close()}
        />
      )}
    </ContentLayout>
  );
};

export default AdSchedulePage;
