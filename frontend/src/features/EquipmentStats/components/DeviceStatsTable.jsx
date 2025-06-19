import React, { useEffect, useMemo, useState } from "react";
import { toDate } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";
import Tab from "../../../components/tab/Tab";

const DeviceStatsTable = ({
  searchParams,
  setSearchParams,
  handleGetDeviceStat,
  deviceList,
}) => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    handleGetDeviceStat();
  }, [activeTab]);

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
              <td>{toDate(item.op_date)}</td>
              <td>{item.category_name}</td>
              <td>{item.device_count}</td>
              <td>{item.normal}</td>
              <td>{item.running}</td>
              <td>{item.as}</td>
              <td>{item.stop}</td>
              <td>{item.broken}</td>
              <td>{item.unconfirmed}</td>
              <td>
                <div className="relative w-full flex gap-1 items-center justify-between">
                  <progress
                    className="progress w-[70%]"
                    value={item.running_rate}
                    max="100"
                  />
                  <p className="text-right text-sm w-[30%]">
                    {Number.isInteger(item.running_rate)
                      ? `${item.running_rate}%`
                      : `${Number(item.running_rate).toFixed(1)}%`}
                  </p>
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

export default DeviceStatsTable;
