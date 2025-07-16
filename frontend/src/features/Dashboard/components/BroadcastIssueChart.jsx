import React, { useEffect, useRef, useState } from "react";
import ChartTitle from "./ChartTitle";
import ChartLegend from "./ChartLegend";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import useUserStore from "../../../stores/user";
import { getDeviceStat } from "../../../api/device/device";
import { URL_MAPPING } from "../../../utils/constant/urls";

const BroadcastIssueChart = () => {
  const { user } = useUserStore();
  const groupedRef = useRef({});

  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  useEffect(() => {
    const fetchIssueData = async () => {
      const today = dayjs();
      const startOfMonth = today.startOf("month");
      const endOfMonth = today.endOf("month");

      const from = startOfMonth.format("YYYY-MM-DD");
      const to = endOfMonth.format("YYYY-MM-DD");

      try {
        const response = await getDeviceStat({
          from_date: from,
          to_date: to,
          brand_code: user?.brand_code,
        });

        const items = response.data?.data || [];

        const grouped = {};
        items.forEach((item) => {
          const dateKey = dayjs(item.op_date).format("YYYY-MM-DD");
          if (!grouped[dateKey]) {
            grouped[dateKey] = {
              unconfirmed: 0,
              as: 0,
              stop: 0,
              broken: 0,
              device_count: 0,
            };
          }
          grouped[dateKey].unconfirmed += item.unconfirmed;
          grouped[dateKey].as += item.as;
          grouped[dateKey].stop += item.stop;
          grouped[dateKey].broken += item.broken;
          grouped[dateKey].device_count = item.device_count;
        });

        groupedRef.current = grouped;

        const xAxis = [];
        const unconfirmedData = [];
        const asData = [];
        const stopData = [];
        const brokenData = [];

        const totalDays = endOfMonth.date();
        for (let day = 1; day <= totalDays; day++) {
          const date = startOfMonth.date(day).format("YYYY-MM-DD");
          xAxis.push(String(day));

          if (grouped[date]) {
            const g = grouped[date];
            unconfirmedData.push(g.unconfirmed || 0);
            asData.push(g.as || 0);
            stopData.push(g.stop || 0);
            brokenData.push(g.broken || 0);
          } else {
            unconfirmedData.push(null);
            asData.push(null);
            stopData.push(null);
            brokenData.push(null);
          }
        }

        setChartData({
          series: [
            { name: "정지", data: stopData },
            { name: "AS접수", data: asData },
            { name: "미확인", data: unconfirmedData },
            { name: "고장", data: brokenData },
          ],
          options: {
            chart: {
              toolbar: { show: false },
              stacked: true,
            },
            colors: ["#06B6D4", "#7DC600", "#F87171", "#484C56"],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "70%",
                borderRadius: 0,
              },
            },
            dataLabels: { enabled: false },
            stroke: {
              show: true,
              width: 1,
              colors: ["transparent"],
            },
            legend: { show: false },
            fill: { opacity: 1 },
            xaxis: {
              categories: xAxis,
              labels: {
                style: {
                  fontFamily: "Pretendard",
                  fontSize: "12px",
                  fontWeight: "500",
                  colors: ["#6B7280"],
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  fontFamily: "Pretendard",
                  fontSize: "12px",
                  fontWeight: "500",
                  colors: ["#6B7280"],
                },
              },
            },
            tooltip: {
              shared: true,
              intersect: false,
              x: {
                formatter: (val) => {
                  const dayIndex = parseInt(val, 10) - 1;
                  const dateKey = dayjs().startOf("month").add(dayIndex, "day").format("YYYY-MM-DD");
                  const g = groupedRef.current[dateKey];

                  if (g && g.device_count != null) {
                    const total = g.device_count;
                    const sum =
                      (g.unconfirmed || 0) +
                      (g.as || 0) +
                      (g.stop || 0) +
                      (g.broken || 0);
                    return `${val}일 (전체장비: ${total} / 미운영장비: ${sum})`;
                  }

                  return `${val}일`;
                },
              },
              y: {
                formatter: (val) =>
                  val === null || val === undefined ? "-" : `${val}건`,
              },
              style: {
                fontSize: "14px",
                fontFamily: "Pretendard",
              },
            },
            grid: {
              borderColor: "#E5E7EB",
            },
          },
        });
      } catch (err) {
        console.error("미송출 이슈 로딩 실패", err);
      }
    };

    fetchIssueData();
  }, [user?.brand_code]);

  return (
    <div className="p-3.5 rounded-[20px] w-4/5 relative border border-sky-base-300 shrink-0">
      <ChartTitle
        label="미송출 현황"
        iconSrc="/asset/ico_unbroadcast_sm.svg"
        bgColor="#6EABF7"
        url={URL_MAPPING.equipmentStats}
      />
      <div className="absolute top-3.5 right-5 px-2.5 h-9 flex gap-5 items-center rounded-[40px] bg-gray-100">
        <ChartLegend label="정지" color="#06B6D4" />
        <ChartLegend label="AS접수" color="#7DC600" />
        <ChartLegend label="미확인" color="#F87171" />
        <ChartLegend label="고장" color="#484C56" />
      </div>
      <div className="rounded-[20px] bg-white pr-3">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={230}
        />
      </div>
    </div>
  );
};

export default BroadcastIssueChart;
