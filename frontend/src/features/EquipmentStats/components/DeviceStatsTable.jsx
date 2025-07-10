import React, { useEffect, useMemo, useState } from "react";
import { toDate } from "../../../utils/customFormat";
import EmptyState from "../../../components/emptyState/EmptyState";
import Tab from "../../../components/tab/Tab";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

// 날짜별 장비 그룹 리스트 그룹 생성
const groupByDate = (list) => {
  const map = {};

  list.forEach((item) => {
    const date = item.op_date;
    if (!map[date]) map[date] = [];
    map[date].push(item);
  });
  
  // op_date별 장비 정보 합산
  return Object.entries(map).map(([date, items]) => {
    const summary = items.reduce(
      (acc, cur) => {
        acc.device_count += cur.device_count || 0;
        acc.running += cur.running || 0;
        acc.stop += cur.stop || 0;
        acc.as += cur.as || 0;
        acc.unconfirmed += cur.unconfirmed || 0;
        acc.broken += cur.broken || 0;
        acc.normal += cur.normal || 0;
        acc.running_rate_sum += cur.running_rate || 0;
        return acc;
      },
      {
        device_count: 0,
        normal: 0,
        running: 0,
        as: 0,
        stop: 0,
        broken: 0,
        unconfirmed: 0,
        running_rate_sum: 0,
      }
    );

    const running_rate_avg = summary.running_rate_sum / items.length;

    const not_running_total =
      summary.as + summary.stop + summary.unconfirmed + summary.broken;

    const detailedItems = items.map((item) => ({
      ...item,
      not_running_total:
        (item.as || 0) +
        (item.stop || 0) +
        (item.unconfirmed || 0) +
        (item.broken || 0),
    }));

    return {
      op_date: date,
      summary: {
        ...summary,
        not_running_total,
        running_rate: running_rate_avg,
      },
      details: detailedItems,
    };
  });
};

const DeviceStatsTable = ({
  searchParams,
  setSearchParams,
  handleGetDeviceStat,
  deviceList,
}) => {
  const [activeTab, setActiveTab] = useState("");
  const [openRows, setOpenRows] = useState({});

  const groupedDeviceList = useMemo(
    () => groupByDate(deviceList),
    [deviceList]
  );

  const toggleRows = (date) => {
    setOpenRows((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  useEffect(() => {
    handleGetDeviceStat();
  }, [activeTab]);

  useEffect(() => {
    setOpenRows({});
  }, [deviceList]);
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
            <th>운영</th>
            <th>미운영합계</th>
            <th>미운영(정지)</th>
            <th>미운영(A/S)</th>
            <th>미운영(미확인)</th>
            <th>미운영(고장)</th>
            <th>정상</th>
            <th>가동률</th>
          </tr>
        </thead>

        <tbody>
          {groupedDeviceList.map((group, idx) => {
            const { op_date, summary, details } = group;
            const isOpen = openRows[op_date];

            return (
              <React.Fragment key={op_date}>
                {/* 상위 row */}
                <tr
                  className={`cursor-pointer parent-row ${
                    isOpen ? "active-row" : ""
                  }`}
                  onClick={() => toggleRows(op_date)}
                >
                  <td>
                    <div className="inline-flex gap-2 items-center">
                      {isOpen ? (
                        <IoIosArrowUp className="text-xl" />
                      ) : (
                        <IoIosArrowDown className="text-xl" />
                      )}
                      {toDate(op_date)}
                    </div>
                  </td>
                  <td>전체({details.length})</td>
                  <td>{summary.device_count}</td>
                  <td>{summary.running}</td>
                  <td>{summary.not_running_total}</td>
                  <td>{summary.stop}</td>
                  <td>{summary.as}</td>
                  <td>{summary.unconfirmed}</td>
                  <td>{summary.broken}</td>
                  <td>{summary.normal}</td>
                  <td>
                    <div className="relative w-full flex gap-1 items-center justify-between">
                      <progress
                        className="progress w-[70%]"
                        value={summary.running_rate}
                        max="100"
                      />
                      <p className="text-right text-sm w-[30%]">
                        {Number.isInteger(summary.running_rate)
                          ? `${summary.running_rate}%`
                          : `${Number(summary.running_rate).toFixed(1)}%`}
                      </p>
                    </div>
                  </td>
                </tr>

                {/* 상세 row */}
                {isOpen &&
                  details.map((item, subIdx) => (
                    <tr key={subIdx} className="child-row">
                      <td></td>
                      <td>{item.category_name}</td>
                      <td>{item.device_count}</td>
                      <td>{item.running}</td>
                      <td>{item.not_running_total}</td>
                      <td>{item.stop}</td>
                      <td>{item.as}</td>
                      <td>{item.unconfirmed}</td>
                      <td>{item.broken}</td>
                      <td>{item.normal}</td>
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
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {deviceList.length === 0 && (
        <EmptyState text="일치하는 검색 결과가 없습니다." />
      )}
    </>
  );
};

export default DeviceStatsTable;
