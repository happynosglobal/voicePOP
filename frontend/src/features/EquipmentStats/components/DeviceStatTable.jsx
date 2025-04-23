import React, { useEffect, useMemo, useState } from "react";
import { toYYYYMMDD } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";

const DeviceStatTable = ({
  searchParams,
  setSearchParams,
  categoryOptions,
  handleGetDeviceStat,
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
    handleGetDeviceStat();
  }, [activeTab]);

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
            <th>일자</th>
            <th>MD</th>
            <th>장비수</th>
            <th>정상</th>
            <th>운영</th>
            <th>미운영(A/S)</th>
            <th>미운영(정지)</th>
            <th>미운영(고장)</th>
            <th>미운영(미확인)</th>
            <th>가동률</th>
          </tr>
        </thead>
        <tbody>
          {deviceList.map((item, index) => (
            <tr key={index}>
              <td>{toYYYYMMDD(item.op_date)}</td>
              <td>{item.category_name}</td>
              <td>{item.device_count}</td>
              <td>{item.normal}</td>
              <td>{item.running}</td>
              <td>{item.as}</td>
              <td>{item.stop}</td>
              <td>{item.broken}</td>
              <td>{item.unconfirmed}</td>
              <td>
                <div className="relative w-full flex wide:gap-0 gap-1 items-center justify-between">
                  <progress
                    className="progress w-3/4"
                    value={item.running_rate}
                    max="100"
                  ></progress>
                  <p className="text-right text-sm w-1/4">{`${item.running_rate}%`}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deviceList.length === 0 && (
        <EmptyState text="일치하는 검색 결과가 없습니다." />
      )}
    </>
  );
};

export default DeviceStatTable;
