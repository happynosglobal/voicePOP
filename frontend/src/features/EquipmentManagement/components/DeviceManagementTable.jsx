import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Tooltip from "../../../components/tooltip/Tooltip";

const DeviceManagementTable = ({
  searchParams,
  setSearchParams,
  categoryOptions,
  handleGetDeviceList,
  deviceList,
}) => {
  const statusOptions = [
    { value: "normal", label: "정상" },
    { value: "as", label: "A/S" },
    { value: "unconfirmed", label: "미확인" },
    { value: "broken", label: "고장" },
  ];
  const [activeTab, setActiveTab] = useState("");

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
      <div className="tabs-wrapper">
        <div className="tabs-nav">
          {tabs.map((option, index) => (
            <button
              key={index}
              className={`tab-btn ${
                activeTab === option.code ? "is-active" : ""
              }`}
              onClick={() => {
                setActiveTab(option.code);
                setSearchParams((prev) => ({
                  ...prev,
                  category_code: option.code,
                }));
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="w-2/12">점포명</th>
            <th className="w-1/12">MD</th>
            <th className="w-1/12">방송상태</th>
            <th className="w-2/12">마지막 방송시간</th>
            <th className="w-2/12">기기상태</th>
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
                    item.status === "running" ? "badge-success" : "badge-ghost"
                  }`}
                >
                  {item.status === "running" ? "송출" : "미송출"}
                </span>
              </td>
              <td>{item.latest_run_datetime}</td>
              <td>
                <Select
                  options={statusOptions}
                  className="min-w-32"
                  value={statusOptions.find(
                    (opt) => opt.value === item.status_process
                  )}
                />
              </td>
              <td className="truncate">
                <Tooltip place="bottom" id={1} content={item.comment} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DeviceManagementTable;
