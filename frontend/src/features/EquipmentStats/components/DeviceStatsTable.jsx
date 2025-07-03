import React, { useEffect, useMemo, useState } from "react";
import { toDate } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";
import Tab from "../../../components/tab/Tab";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

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

  const [openRows, setOpenRows] = useState({}); // 각 row 상태 저장

  const toggleRows = (index) => {
    setOpenRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

      <table className="table no-row-bg">
        <thead>
          <tr>
            <th className="w-42">일자</th>
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
          {Array.from({ length: 5 }).map((_, idx) => (
            <React.Fragment key={idx}>
              {/* 상위 row */}
              <tr
                className={`cursor-pointer parent-row ${
                  openRows[idx] ? "active-row" : ""
                }`}
                onClick={() => toggleRows(idx)}
              >
                <td>
                  <div className="inline-flex gap-2 items-center">
                    {openRows[idx] ? (
                      <IoIosArrowUp className="text-xl" />
                    ) : (
                      <IoIosArrowDown className="text-xl" />
                    )}
                    2025-07-03
                  </div>
                </td>
                <td>전체(2)</td>
                <td>75</td>
                <td>20</td>
                <td>20</td>
                <td>20</td>
                <td>20</td>
                <td>20</td>
                <td>20</td>
                <td>
                  <div className="relative w-full flex gap-1 items-center justify-between">
                    <progress
                      className="progress w-[70%]"
                      value={37.5}
                      max="100"
                    />
                    <p className="text-right text-sm w-[30%]">37.5%</p>
                  </div>
                </td>
              </tr>

              {/* 하위 rows (토글 표시) */}
              {openRows[idx] && (
                <>
                  <tr className="child-row">
                    <td></td>
                    <td>수산</td>
                    <td>25</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                    <td>
                      <div className="relative w-full flex gap-1 items-center justify-between">
                        <progress
                          className="progress w-[70%]"
                          value={50}
                          max="100"
                        />
                        <p className="text-right text-sm w-[30%]">25%</p>
                      </div>
                    </td>
                  </tr>
                  <tr className="child-row">
                    <td></td>
                    <td>미설정</td>
                    <td>50</td>
                    <td>20</td>
                    <td>20</td>
                    <td>20</td>
                    <td>20</td>
                    <td>20</td>
                    <td>20</td>
                    <td>
                      <div className="relative w-full flex gap-1 items-center justify-between">
                        <progress
                          className="progress w-[70%]"
                          value={50}
                          max="100"
                        />
                        <p className="text-right text-sm w-[30%]">50%</p>
                      </div>
                    </td>
                  </tr>
                </>
              )}
            </React.Fragment>
          ))}

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
