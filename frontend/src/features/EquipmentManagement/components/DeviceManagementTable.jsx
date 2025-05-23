import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Tooltip from "../../../components/tooltip/Tooltip";
import { toDateTime } from "../../../utils/customFormat";
import Tab from "../../../components/tab/tab";

const DeviceManagementTable = ({
  searchParams,
  setSearchParams,
  categoryOptions,
  handleGetDeviceList,
  handleModifyDeviceStatus,
  deviceList,
  setDeviceList,
}) => {
  const statusOptions = [
    { value: "normal", label: "정상" },
    { value: "as", label: "A/S" },
    { value: "unconfirmed", label: "미확인" },
    { value: "broken", label: "고장" },
  ];
  const [activeTab, setActiveTab] = useState("");

  const [originalComments, setOriginalComments] = useState({});

  // "전체" 항목 포함한 탭 목록 생성
  const tabs = useMemo(() => {
    return [{ code: "", name: "전체" }, ...categoryOptions];
  }, [categoryOptions]);

  useEffect(() => {
    if (tabs.length !== 0) {
      setActiveTab(tabs[0].code);
    }
  }, [tabs]);

  useEffect(() => {
    handleGetDeviceList();
  }, [searchParams]);

  return (
    <>
      <Tab
        tabs={tabs}
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
            <th className="w-2/12">마지막 방송시간</th>
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
                <Select
                  options={statusOptions}
                  className="min-w-32"
                  value={
                    statusOptions.find(
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
                {/* <Tooltip place="bottom" id={1} content={item.comment} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DeviceManagementTable;
