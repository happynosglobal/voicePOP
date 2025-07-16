import React, { useEffect, useMemo, useState } from "react";
import CustomDatePicker from "../../../components/customDatePicker/CustomDatePicker";
import { RiFileExcel2Line } from "react-icons/ri";
import { toDate } from "../../../utils/customFormat";

const SearchBar = ({ searchParams, setSearchParams, handleGetDeviceStat, exportToExcel }) => {
  const today = useMemo(() => new Date(), []);
  const [selectedStartDate, setSelectedStartDate] = useState(today);
  const [selectedEndDate, setSelectedEndDate] = useState(today);

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
                    from_date: toDate(date),
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
                    to_date: toDate(date),
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
        <button className="btn btn-sm btn-success" onClick={exportToExcel}>
          <RiFileExcel2Line className="text-xl" /> 엑셀다운로드
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
