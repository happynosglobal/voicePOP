import React, { useEffect, useMemo, useState } from "react";
import CustomDatePicker from "../../../components/customDatePicker/CustomDatePicker";
import { RiFileExcel2Line } from "react-icons/ri";
import { toYYYYMMDD } from "../../../utils/customFormat";

const SearchBar = ({ searchParams, setSearchParams, handleGetDeviceStat }) => {
  const today = useMemo(() => new Date(), []);
  const [selectedStartDate, setSelectedStartDate] = useState(today);
  const [selectedEndDate, setSelectedEndDate] = useState(today);
  /* 계약기간 시작일보다 종료일이 빠르면 시작일로 초기화*/
  useEffect(() => {
    if (selectedStartDate > selectedEndDate) {
      setSelectedEndDate(selectedStartDate);
      setSearchParams((prev) => ({
        ...prev,
        to_date: toYYYYMMDD(selectedStartDate),
      }));
    }
  }, [selectedStartDate, selectedEndDate]);
  return (
    <div className="flex mb-5 gap-1">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-2">
            <label className="font-semibold shrink-0">기간</label>
            <div className="w-40">
              <CustomDatePicker
                selectedDate={selectedStartDate}
                onChange={(date) => {
                  setSearchParams((prev) => ({
                    ...prev,
                    from_date: toYYYYMMDD(date),
                  }));
                  setSelectedStartDate(date);
                }}
              />
            </div>
            <div> - </div>
            <div className="w-40">
              <CustomDatePicker
                selectedDate={selectedEndDate}
                onChange={(date) => {
                  setSearchParams((prev) => ({
                    ...prev,
                    to_date: toYYYYMMDD(date),
                  }));
                  setSelectedEndDate(date);
                }}
                minDate={selectedStartDate}
              />
            </div>
          </div>
          <button
            className="btn btn-accent btn-sm"
            onClick={handleGetDeviceStat}
          >
            검색
          </button>
        </div>
        <button className="btn btn-sm btn-success">
          <RiFileExcel2Line className="text-xl" /> 엑셀다운로드
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
