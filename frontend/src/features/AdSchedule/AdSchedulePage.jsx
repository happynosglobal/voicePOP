import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMinutes } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";

const locales = {
  "en-US": enUS
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const AdSchedulePage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "(농산) [130개점] 키위광고[30초]",
      start: new Date(2025, 1, 27, 10, 0), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 10), // 10:10 AM
    },
    {
      id: 2,
      title: "Meeting",
      start: new Date(2025, 1, 27, 10, 10), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 20), // 10:10 AM
    },
    {
      id: 3,
      title: "Meeting",
      start: new Date(2025, 1, 27, 10, 20), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 30), // 10:10 AM
    },
    {
      id: 4,
      title: "Meeting",
      start: new Date(2025, 1, 27, 10, 20), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 30), // 10:10 AM
    },
    {
      id: 5,
      title: "Meeting",
      start: new Date(2025, 1, 27, 10, 30), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 40), // 10:10 AM
    },
    {
      id: 6,
      title: "Meeting",
      start: new Date(2025, 1, 27, 10, 0), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 10), // 10:10 AM
    },
    {
      id: 7,
      title: "Meeting222",
      start: new Date(2025, 1, 27, 10, 0), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 10), // 10:10 AM
    },
    {
      id: 8,
      title: "Meeting222111",
      start: new Date(2025, 1, 27, 10, 0), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 10), // 10:10 AM
    },
    {
      id: 9,
      title: "Meeting22212121221",
      start: new Date(2025, 1, 27, 10, 0), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 10), // 10:10 AM
    },
    {
      id: 10,
      title: "Meeting22212121221",
      start: new Date(2025, 1, 27, 10, 0), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 10), // 10:10 AM
    },
    {
      id: 11,
      title: "Meeting22212121221",
      start: new Date(2025, 1, 27, 10, 0), // 10:00 AM
      end: new Date(2025, 1, 27, 10, 10), // 10:10 AM
    },
    {
      id: 12,
      title: "Meeting3",
      start: new Date(2025, 1, 27, 12, 0, 0), // 10:00 AM
      end: new Date(2025, 1, 27, 12, 0, 30), // 10:10 AM
    },
  ]);
  return (
    <>
      <div className="pl-48 pt-16 flex h-screen">
        <div className="flex-1 p-4 h-full">
          <div className="bg-white p-6 rounded-lg shadow h-full">

            <Calendar
              localizer={localizer}
              events={events}
              defaultView="day"
              views={["day"]}
              step={1} // 1초 단위로 표시
              timeslots={60} // 1분을 60개로 나눔 (10분 단위)
              min={new Date(2024, 1, 27, 8, 0)} // 시작 시간 (08:00)
              max={new Date(2024, 1, 27, 21, 0)} // 종료 시간 (20:00)
              style={{ height: "100%" }}
            />

          </div>
        </div>
      </div>
    </>
  )
}

export default AdSchedulePage;