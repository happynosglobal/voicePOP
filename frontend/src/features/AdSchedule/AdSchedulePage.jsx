import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { toast } from "react-toastify";

import "react-big-calendar/lib/css/react-big-calendar.css";
import ContentLayout from "../../layout/ContentLayout";
import useCodes from "../../stores/codes";
import useUserStore from "../../stores/user";
import {
  getBcMasterList,
  getBcMasterListByStore,
  getBcTargetStore,
} from "../../api/broadcast/broadcast";
import { removeEmptyString, toDate } from "../../utils/customFormat";
import AdEventDetailModal from "./components/AdEventDetailModal";
import AdScheduleToolbar from "./components/AdScheduleToolbar";
import { getErrorMessage } from "../../utils/constant/messages";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

// 방송 일정표 생성 로직
const convertItemsToEvents = (items, selectedDate) => {
  const allEvents = [];

  items.forEach((item) => {
    const id = item.id;
    const baseTitle = item.title;
    const type = item.type === "normal" ? "방송" : "광고";
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
    const mediaFilename =
      media?.media_filename || "미디어 정보를 불러 올수 없습니다";
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

        currentStart = new Date(currentEnd.getTime() + interval * 1000); // 다음 스케줄 시작시간 계산
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

const AdSchedulePage = ({ title }) => {
  const MIN_TIME = import.meta.env.VITE_BROADCAST_TIME_MIN;
  const MAX_TIME = import.meta.env.VITE_BROADCAST_TIME_MAX;

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

  // 문자열 시간을 react-big-calander에 맞게 Date 객체로 변환
  const parseTimeToDate = (timeStr, baseDate) => {
    const [hour, minute] = timeStr.split(":").map(Number);
    return new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      hour,
      minute
    );
  };

  useEffect(() => {
    // 광고목록 조회
    const getAdList = async () => {
      const tempParams = {
        type: "normal",
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

        if (response?.status === 200) {
          const events = convertItemsToEvents(response.data.data.items, date);
          setEvents(events);
        }
      } catch (err) {
        console.error(err);
        const errMsg = getErrorMessage(err?.response?.data?.message);
        toast.error(errMsg);
      }
    };

    getAdList();
  }, [searchParams, date]);

  // 선택한 광고 이벤트 상세 보기
  const handleSelectEvent = async (event) => {
    try {
      const response = await getBcTargetStore(event.originalId, {
        page_size: 1000,
      });
      const stores = response.data.data.items;
      setSelectedEvent({ ...event, stores });
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };
  // 광고 이벤트 상세 모달창 열기
  useEffect(() => {
    if (selectedEvent) {
      modalRef.current.showModal();
    }
  }, [selectedEvent]);

  // 달력영역 휠로 시간슬롯 줌 인/아웃
  const [timeSlots, setTimeSlots] = useState(5);
  const calendarRef = useRef(null);

  const handleWheelZoom = useCallback((e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();

    const ZOOM_STEPS = [1, 3, 5, 10, 15, 20, 25, 30];

    setTimeSlots((prev) => {
      const currentIndex = ZOOM_STEPS.indexOf(prev);

      if (e.deltaY < 0 && currentIndex > 0) {
        // 휠 위로 올리면 확대 → 더 작은 timeslots로 이동
        return ZOOM_STEPS[currentIndex - 1];
      }

      if (e.deltaY > 0 && currentIndex < ZOOM_STEPS.length - 1) {
        // 휠 아래로 내리면 축소 → 더 큰 timeslots로 이동
        return ZOOM_STEPS[currentIndex + 1];
      }

      return prev;
    });
  }, []);
  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (!calendarEl) return;

    calendarEl.addEventListener("wheel", handleWheelZoom, { passive: false });

    return () => {
      calendarEl.removeEventListener("wheel", handleWheelZoom);
    };
  }, [handleWheelZoom]);

  // 렌더링시에 현재시간선에 스크롤 위치
  useEffect(() => {
    const timeout = setTimeout(() => {
      const nowIndicator = document.querySelector(
        ".rbc-current-time-indicator"
      );
      if (nowIndicator) {
        nowIndicator.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ContentLayout title={title}>
      <div ref={calendarRef}>
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="day"
          views={["day"]}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          step={1}
          timeslots={timeSlots}
          popup={true}
          onSelectEvent={handleSelectEvent}
          dayLayoutAlgorithm="no-overlap"
          scrollToTime={new Date(1970, 1, 1, 9, 0)}
          min={parseTimeToDate(MIN_TIME, date)}
          max={parseTimeToDate(MAX_TIME, date)}
          showCurrentTimeIndicator={true}
          formats={{
            timeGutterFormat: (date) => format(date, "HH:mm"),
            eventTimeRangeFormat: ({ start, end }) =>
              `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`,
          }}
          style={{
            height: "calc(100vh - 120px)",
            minWidth: "1000px",
          }}
          eventPropGetter={(event) => ({
            // className: "custom-event-style",
            style: {
              minWidth: "80px",
              maxWidth: "clamp(80px, 10vw, 200px)",
              minHeight: "20px",
              wordBreak: "break-word",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "12px",
              backgroundColor: categoryColorMap[event.category] || "#888888",
              color: "#fff",
              borderRadius: "6px",
              padding: "6px 8px",
              border: event.mediaId ? "1px solid #fff" : "2px solid #ff4d4f",
              boxShadow: "1px 1px 3px rgba(0,0,0,0.25)",
            },
          })}
          components={{
            toolbar: (props) => (
              <AdScheduleToolbar
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
      </div>

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
