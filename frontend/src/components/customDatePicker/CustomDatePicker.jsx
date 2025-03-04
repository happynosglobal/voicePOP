import React, { forwardRef, memo } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";

registerLocale("ko", ko);

const CustomInput = memo(
  forwardRef(({ value, onClick }, ref) => (
    <div className="relative w-full">
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        readOnly
        placeholder="날짜 선택"
        className="input w-full cursor-pointer"
      />
      <FaCalendarAlt
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        onClick={onClick}
      />
    </div>
  ))
);

const getDayClassName = (date) => {
  const day = date.getDay(); // 0: 일요일, 6: 토요일
  if (day === 0) return "!text-red-500 "; // 일요일 (빨간색)
  if (day === 6) return "!text-blue-500"; // 토요일 (파란색)
  return "";
};

const CustomDatePicker = ({ selectedDate, onChange }) => (
  <DatePicker
    selected={selectedDate}
    onChange={onChange}
    locale="ko"
    dateFormat="yyyy-MM-dd"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    customInput={<CustomInput />}
    dayClassName={getDayClassName}
  />
);

export default CustomDatePicker;
