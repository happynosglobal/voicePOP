import React, { useEffect, useMemo, useState } from "react";
import Tooltip from "../../../components/tooltip/Tooltip";
import { toDateTime } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const EquipmentStatusTable = ({
  searchParams,
  setSearchParams,
  categoryOptions,
  handleGetDeviceList,
  deviceList,
}) => {
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

  // 장비 상태별로 그룹화
  const categorizedDevices = useMemo(() => {
    const group = {
      미등록: [],
      미송출: [],
      송출: [],
    };
    deviceList.forEach((device) => {
      const status = device.device_status;
      if (group[status]) group[status].push(device);
    });
    return group;
  }, [deviceList]);

  const [openTables, setOpenTables] = useState({
    미등록: true,
    미송출: true,
    송출: true,
  });
  const toggleTable = (title) => {
    setOpenTables((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const renderTable = (title, list, badgeClass) => (
    <div className="flex flex-col bg-white rounded-[10px] overflow-hidden border">
      <div
        role="button"
        className="px-4 py-1.5 w-full flex items-center justify-between bg-slate-100"
        onClick={() => toggleTable(title)}
      >
        <div className={`h-9 badge badge-lg ${badgeClass} font-semibold`}>
          {title}
          <span className="text-sm font-normal">&nbsp;/ {list.length}대</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          {openTables[title] ? (
            <IoIosArrowUp className="text-2xl" />
          ) : (
            <IoIosArrowDown className="text-2xl" />
          )}
        </div>
      </div>
      {openTables[title] && (
        <div className="flex-1 p-4">
          <table className="table">
            <thead>
              <tr>
                <th className="w-1/6">점포명</th>
                <th className="w-1/6">MD</th>
                <th className="w-1/6">마지막 방송시간</th>
                <th className="w-2/6">메모</th>
              </tr>
            </thead>
            <tbody>
              {list.map((device, index) => (
                <tr key={index}>
                  <td>{device.str_name}</td>
                  <td>{device.category_name}</td>
                  <td>{toDateTime(device.latest_run_datetime)}</td>
                  <td className="truncate">
                    <Tooltip
                      place="bottom"
                      id={`tooltip-${device.id}`}
                      content={device.memo}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && (
            <EmptyState text="일치하는 검색 결과가 없습니다." />
          )}
        </div>
      )}
    </div>
  );
  return (
    <>
      <ul className="flex mb-7 gap-2">
        {Object.entries(categorizedDevices).map(([category, devices]) => (
          <li
            className="flex-1 flex items-center justify-center h-14 bg-[#484C56] rounded-[10px] text-white gap-1.5"
            key={category}
          >
            <span className="text-lg font-medium">{category}</span>
            <span className="text-2xl font-semibold">{devices.length}</span>
          </li>
        ))}
        <li className="flex-1 flex items-center justify-center h-14 bg-[#484C56] rounded-[10px] text-white gap-1.5">
          <span className="text-lg font-medium">합계 </span>
          <span className="text-2xl font-semibold">{deviceList.length}</span>
        </li>
      </ul>

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

      <div className="flex flex-col gap-5">
        {renderTable("미등록", categorizedDevices["미등록"], "badge-error")}
        {renderTable("미송출", categorizedDevices["미송출"], "badge-ghost")}
        {renderTable("송출", categorizedDevices["송출"], "badge-success")}
      </div>
    </>
  );
};

export default EquipmentStatusTable;
