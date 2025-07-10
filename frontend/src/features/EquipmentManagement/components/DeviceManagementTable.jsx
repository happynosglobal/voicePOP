import React, { useEffect, useMemo, useState } from "react";
import { toDateTime } from "../../../utils/customFormat";
import Tab from "../../../components/tab/Tab";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import EmptyState from "../../../components/emptyState/EmptyState";
import Dropdown from "../../../components/dropdown/Dropdown";
import Pagination from "../../../components/pagination/Pagination";

const DeviceManagementTable = ({
  limit,
  page,
  setPage,
  total,
  searchParams,
  setSearchParams,
  deviceStatusOptions,
  handleGetDeviceList,
  handleModifyDeviceStatus,
  handleSort,
  deviceList,
  setDeviceList,
}) => {
  const [activeTab, setActiveTab] = useState("");

  const [originalComments, setOriginalComments] = useState({});
  const [sortOption, setSortOption] = useState({ sort: null, order: null });

  const toggleSort = (sortBy) => {
    if (sortOption.sort !== sortBy) {
      // 다른 컬럼 클릭 시 → desc로 설정
      setSortOption({ sort: sortBy, order: "desc" });
      handleSort(sortBy, "desc");
    } else if (sortOption.order === "desc") {
      // desc → asc
      setSortOption({ sort: sortBy, order: "asc" });
      handleSort(sortBy, "asc");
    } else if (sortOption.order === "asc") {
      // asc → 정렬 초기화
      setSortOption({ sort: null, order: null });
      handleSort(null, null);
    }
  };
  useEffect(() => {
    handleGetDeviceList();
  }, [searchParams]);

  return (
    <>
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

      <table className="table">
        <thead>
          <tr>
            <th className="w-2/12">점포명</th>
            <th className="w-1/12">MD</th>
            <th className="w-1/12">방송상태</th>
            <th className="w-2/12">
              {" "}
              <button
                className="inline-flex items-center gap-1 hover:underline"
                onClick={() => toggleSort("latest_run_datetime")}
              >
                마지막 방송시간
                {sortOption.sort === "latest_run_datetime" ? (
                  sortOption.order === "desc" ? (
                    <TiArrowSortedDown />
                  ) : sortOption.order === "asc" ? (
                    <TiArrowSortedUp />
                  ) : null
                ) : (
                  <TiArrowUnsorted />
                )}
              </button>
            </th>
            <th className="w-44">기기상태</th>
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
          {deviceList.map((item, index) => (
            <tr key={index}>
              <td>{item.str_name}</td>
              <td>{item.category_name}</td>
              <td>
                <span
                  className={`badge badge-lg ${
                    item.status === "running"
                      ? "badge-success"
                      : item.status === ""
                      ? "badge-error"
                      : "badge-ghost"
                  }`}
                >
                  {item.status === "running"
                    ? "송출"
                    : item.status === "stop"
                    ? "미송출"
                    : "error"}
                </span>
              </td>
              <td>{toDateTime(item.device_latest_run_datetime)}</td>
              <td>
                <Dropdown
                  options={deviceStatusOptions}
                  className="min-w-32"
                  value={
                    deviceStatusOptions.find(
                      (opt) => opt.value === item.status_process
                    ) || null
                  }
                  onChange={(selected) => {
                    const updatedList = [...deviceList];
                    updatedList[index].status_process = selected.value;
                    setDeviceList(updatedList);
                    handleModifyDeviceStatus(updatedList[index]);
                  }}
                  placeholder="알 수 없음"
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                />
              </td>
              <td className="truncate">
                <input
                  name="comment"
                  type="text"
                  value={item.comment || ""}
                  onChange={(e) => {
                    const updatedList = [...deviceList];
                    updatedList[index].comment = e.target.value;
                    setDeviceList(updatedList);
                  }}
                  onBlur={(e) => {
                    if (
                      (e.target.value || "") !==
                      originalComments[item.device_id]
                    ) {
                      handleModifyDeviceStatus(item);
                    }
                  }}
                  onFocus={() => {
                    setOriginalComments((prev) => ({
                      ...prev,
                      [item.device_id]: item.comment || "",
                    }));
                  }}
                  className="input w-full cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deviceList.length === 0 && (
        <EmptyState text="일치하는 검색 결과가 없습니다." />
      )}
      <Pagination page={page} total={total} limit={limit} setPage={setPage} />
    </>
  );
};

export default DeviceManagementTable;
