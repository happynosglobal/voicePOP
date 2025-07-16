import React, { useState } from "react";
import { toDateTime } from "../../../utils/customFormat";
import Tab from "../../../components/tab/Tab";
import EmptyState from "../../../components/emptyState/EmptyState";
import Dropdown from "../../../components/dropdown/Dropdown";
import Pagination from "../../../components/pagination/Pagination";
import useSort from "../../../hooks/useSort";
import SortableHeader from "../../../components/sortableHeader/SortableHeader";
import Tooltip from "../../../components/tooltip/Tooltip";

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
  const { sortOption, toggleSort } = useSort(handleSort);

  const [activeTab, setActiveTab] = useState("");

  const [originalComments, setOriginalComments] = useState({});

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
              <SortableHeader
                className="inline-flex items-center gap-1 hover:underline"
                label="마지막 방송시간"
                sortKey="device_latest_run_datetime"
                sortOption={sortOption}
                toggleSort={toggleSort}
              />
            </th>
            <th className="w-44">기기상태</th>
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
          {deviceList.map((item, index) => (
            <tr key={index}>
              <td className="truncate">
                <Tooltip
                  place="bottom"
                  id={item.id}
                  label={item.str_name}
                  content={`장비ID: ${item.id}`}
                />
              </td>
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
