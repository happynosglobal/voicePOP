import React from "react";
import useUserStore from "../../../stores/user";
import Dropdown from "../../../components/dropdown/Dropdown";
import { RiFileExcel2Line } from "react-icons/ri";

const SearchBar = ({
  searchParams,
  storeOptions,
  bcStatusOptions,
  deviceStatusOptions,
  handleSelectBox,
  exportToExcel
}) => {
  const { user } = useUserStore();
  return (
    <div className="flex mb-5 gap-1">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap items-center gap-1.5">
          <Dropdown
            name="str_code"
            options={storeOptions}
            className="min-w-64"
            value={storeOptions.find(
              (opt) => opt.value === searchParams.str_code
            )}
            onChange={(option, meta) => {
              if (user?.level !== "STORE") handleSelectBox(option, meta);
            }}
            isClearable={true}
            isDisabled={user?.level === "STORE"}
            placeholder={"점포 검색"}
          />
          <Dropdown
            name="status"
            options={bcStatusOptions}
            className="min-w-40"
            value={bcStatusOptions.find(
              (opt) => opt.value === searchParams.status
            )}
            onChange={(option, meta) => {
              handleSelectBox(option, meta);
            }}
            isClearable={true}
            placeholder={"방송상태"}
          />
          <Dropdown
            name="status_process"
            options={deviceStatusOptions}
            className="min-w-40"
            value={deviceStatusOptions.find(
              (opt) => opt.value === searchParams.status_process
            )}
            onChange={(option, meta) => {
              handleSelectBox(option, meta);
            }}
            isClearable={true}
            placeholder={"기기상태"}
          />
        </div>
        <button className="btn btn-sm btn-success" onClick={exportToExcel}>
          <RiFileExcel2Line className="text-xl" /> 엑셀다운로드
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
