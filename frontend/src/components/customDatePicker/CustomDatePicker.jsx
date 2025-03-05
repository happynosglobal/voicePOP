import React, { forwardRef, memo } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { FaCalendarAlt } from "react-icons/fa";

registerLocale("ko", ko);

const CustomInput = memo(
  forwardRef(({ value, onClick, placeholder }, ref) => (
    <div className="relative w-full">
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        readOnly
        placeholder={placeholder}
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
  const dayColors = {
    0: "!text-red-500", // 일요일
    6: "!text-blue-500", // 토요일
  };
  return dayColors[date.getDay()] || "";
};

const CustomDatePicker = ({
  selectedDate,
  onChange,
  placeholder = "날짜 선택",
}) => (
  <DatePicker
    selected={selectedDate}
    onChange={onChange}
    locale="ko"
    dateFormat="yyyy-MM-dd"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    customInput={<CustomInput placeholder={placeholder} />}
    dayClassName={getDayClassName}
    placeholderText={placeholder}
  />
);

export default CustomDatePicker;
