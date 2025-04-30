import React, { useEffect, useMemo, useState } from "react";
import Tooltip from "../../../components/tooltip/Tooltip";
import { toDateTime } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";

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

  const renderTable = (title, list, badgeClass) => (
    <div className="flex flex-col border p-2 max-h-[550px]">
      <div className={`mb-1 h-9 badge badge-lg ${badgeClass} font-semibold`}>
        {title}
        <span className="text-sm font-normal">&nbsp;/ {list.length}대</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="table thead-fixed">
          <thead>
            <tr>
              <th className="w-2/12">점포명</th>
              <th className="w-1/12">MD</th>
              <th className="w-2/12">마지막 방송시간</th>
              <th className="w-2/12">메모</th>
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
    </div>
  );
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
        <div className="search-count">
          <div className="count-number">
            <span>미등록 : </span>
            <b>{categorizedDevices["미등록"].length}</b>
          </div>
          <div className="count-number">
            <span>미송출 : </span>
            <b>{categorizedDevices["미송출"].length}</b>
          </div>
          <div className="count-number">
            <span>송출 : </span>
            <b>{categorizedDevices["송출"].length}</b>
          </div>
          <div className="count-number">
            <span>합계 : </span>
            <b>{deviceList.length}</b>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {renderTable("미등록", categorizedDevices["미등록"], "badge-error")}
        {renderTable("미송출", categorizedDevices["미송출"], "badge-ghost")}
        {renderTable("송출", categorizedDevices["송출"], "badge-success")}
      </div>
    </>
  );
};

export default EquipmentStatusTable;
