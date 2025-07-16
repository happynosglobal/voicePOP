import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import ReactApexChart from "react-apexcharts";
import useUserStore from "../../../stores/user";
import { getDeviceStat } from "../../../api/device/device";
import ChartTitle from "./ChartTitle";
import ChartLegend from "./ChartLegend";
import { toDate } from "../../../utils/customFormat";
import { URL_MAPPING } from "../../../utils/constant/urls";

const LiveStatusChart = () => {
  const { user } = useUserStore();

  const rateMapRef = useRef({});
  const deviceCountMapRef = useRef({});
  const runningMapRef = useRef({});

  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  useEffect(() => {
    const getRunningRate = async () => {
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

        const raw = response.data?.data || [];

        const rateByDate = {};
        const deviceCountMap = {};
        const runningMap = {};

        raw.forEach((item) => {
          const dateKey = toDate(item.op_date);
          if (!rateByDate[dateKey]) rateByDate[dateKey] = [];
          rateByDate[dateKey].push(item.running_rate);

          deviceCountMap[dateKey] = item.device_count;
          runningMap[dateKey] = item.running;
        });

        rateMapRef.current = {};
        deviceCountMapRef.current = deviceCountMap;
        runningMapRef.current = runningMap;

        const lastDataDate = Object.keys(rateByDate).sort().pop();
        const lastDataDay = dayjs(lastDataDate).date();

        const xAxis = [];
        const yData = [];

        const totalDays = endOfMonth.date();

        for (let day = 1; day <= totalDays; day++) {
          const date = startOfMonth.date(day).format("YYYY-MM-DD");
          xAxis.push(String(day));

          if (day <= lastDataDay) {
            if (rateByDate[date]) {
              const rates = rateByDate[date];
              const avg = rates.reduce((sum, r) => sum + r, 0) / rates.length;
              yData.push(Number(avg.toFixed(1)));
              rateMapRef.current[date] = Number(avg.toFixed(1));
            } else {
              yData.push(0);
              rateMapRef.current[date] = 0;
            }
          } else {
            yData.push(null);
            rateMapRef.current[date] = null;
          }
        }

        setChartData({
          series: [
            {
              name: "장비가동률",
              data: yData,
            },
          ],
          options: {
            chart: {
              type: "line",
              toolbar: { show: false },
            },
            colors: ["#487DEE"],
            stroke: {
              curve: "straight",
              width: 4,
            },
            fill: { type: "solid" },
            dataLabels: { enabled: false },
            legend: { show: false },
            markers: {
              size: 0,
              hover: { sizeOffset: 6 },
            },
            xaxis: {
              categories: xAxis,
              tooltip: {
                enabled: false,
              },
              labels: {
                style: {
                  fontFamily: "Pretendard",
                  fontSize: "12px",
                  fontWeight: 500,
                  colors: ["#6B7280"],
                },
              },
            },
            yaxis: {
              max: 100,
              labels: {
                formatter: (val) => `${val}%`,
                style: {
                  fontFamily: "Pretendard",
                  fontSize: "12px",
                  fontWeight: 500,
                  colors: ["#6B7280"],
                },
              },
            },
            tooltip: {
              x: {
                formatter: (val) => {
                  const dayIndex = parseInt(val, 10) - 1;
                  const dateKey = dayjs()
                    .startOf("month")
                    .add(dayIndex, "day")
                    .format("YYYY-MM-DD");

                  const deviceCount = deviceCountMapRef.current[dateKey] ?? "-";
                  const running = runningMapRef.current[dateKey] ?? "-";

                  return `${val}일 (전체장비: ${deviceCount} / 운영장비:${running})`;
                },
              },
              y: {
                formatter: (val) =>
                  val === null || val === undefined ? "-" : `${val}%`,
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
        console.error("실시간 송출 현황 로딩 실패", err);
      }
    };

    getRunningRate();
  }, [user?.brand_code]);

  return (
    <div className="p-3.5 rounded-[20px] w-4/5 relative border border-sky-base-300 shrink-0">
      <ChartTitle
        label="실시간 송출 현황"
        iconSrc="/asset/ico_broadcast_sm.svg"
        bgColor="#484C56"
        url={URL_MAPPING.equipmentStats}
      />
      <div className="absolute top-3.5 right-5 px-2.5 h-9 flex gap-5 items-center rounded-[40px] bg-gray-100">
        <ChartLegend label="장비가동률" color="#487DEE" />
      </div>
      <div className="rounded-[20px] bg-white pr-5">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={230}
        />
      </div>
    </div>
  );
};

export default LiveStatusChart;
