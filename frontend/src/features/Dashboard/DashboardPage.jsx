import { useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import Tooltip from "../../components/tooltip/Tooltip";

const dummyCate = [
  { label: "텍스트 길어짐 테스트 하겠습니다.", value: 1424, total: 10500 },
  { label: "농산", value: 112, total: 345 },
  { label: "축산", value: 10, total: 100 },
  { label: "수산", value: 22, total: 400 },
  { label: "델리", value: 33, total: 300 },
  { label: "델리(수수료)", value: 10, total: 100 },
  { label: "EM 농산 수수료", value: 40, total: 124 },
  { label: "EM 수산 수수료", value: 66, total: 78 },
];

const DashboardPage = () => {
  // 타이틀
  const Title = ({ label, iconSrc, size, bgColor = "#ffffff" }) => (
    <div
      className={`${size === "lg" ? "" : "mb-2.5"} flex items-center gap-1.5 `}
    >
      <div
        className={`${
          size === "lg" ? "w-12 h-12 rounded-[20px]" : "w-8 h-8 rounded-xl"
        }  flex items-center justify-center`}
        style={{ backgroundColor: bgColor }}
      >
        <img src={iconSrc} alt="아이콘" />
      </div>
      <h2 className={`${size === "lg" ? "text-xl" : "text-lg "} font-semibold`}>
        {label}
      </h2>
    </div>
  );

  // 상단 정보
  const StatusInfo = ({ value, total, percent, bgColor }) => (
    <div className="flex gap-4 items-center">
      <span className="text-gray-900 text-2xl font-bold">
        {value}
        {total && ` / ${total}`}
      </span>
      <span
        className="px-2.5 py-1.5  rounded-[30px] text-sm font-bold"
        style={{ backgroundColor: bgColor }}
      >
        {percent}%
      </span>
    </div>
  );

  //차트 레전드
  const Legend = ({ label, value, color }) => (
    <div className="flex items-center gap-1.5">
      <span
        className="w-4 h-1.5 block rounded-[30px]"
        style={{ backgroundColor: color }}
      ></span>
      <span className="text-sm font-medium">{label}</span>
      {value !== undefined && value !== null && (
        <span className="text-xl font-semibold">{value}%</span>
      )}
    </div>
  );

  const [liveData, setLiveData] = useState({
    series: [
      {
        name: "장비가동률",
        data: [
          80, 82, 86, 91, 95, 98, 100, 98, 95, 91, 87, 84, 81, 80, 82, 86, 90,
          94, 98, 99, 98, 95, 91, 88, 85, 83, 81, 80, 81, 84, 87,
        ],
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
        categories: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
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
          formatter: (val) => `${val}일`,
        },
        y: {
          formatter: (val) => `${val}%`,
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

  //미송출 현황 차트
  //랜덤 숫자 (임시)
  const generateRandomData = (length, min, max) =>
    Array.from(
      { length },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );

  const [missedData, setMissedData] = useState({
    series: [
      {
        name: "미확인",
        data: generateRandomData(31, 20, 130),
      },
      {
        name: "AS접수",
        data: generateRandomData(31, 20, 130),
      },
      {
        name: "정지",
        data: generateRandomData(31, 20, 130),
      },
      {
        name: "고장",
        data: generateRandomData(31, 20, 130),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      colors: ["#06B6D4", "#7DC600", "#F87171", "#484C56"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      xaxis: {
        categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
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
        x: {
          formatter: (val) => `${val}일`,
        },
        y: {
          formatter: (val) => `${val}건`,
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

  return (
    <ContentLayout>
      <div className="flex gap-2.5 bg-yellow-300 rounded-[20px] p-3.5">
        <div className="flex-1 h-24 px-4 py-2 bg-white/90 rounded-[20px] flex justify-between items-center">
          <Title
            label="송출"
            iconSrc="/asset/ico_broadcast.svg"
            size="lg"
            bgColor="#484C56"
          />
          <StatusInfo value={100} total={1000} bgColor="#E6E7EB" percent={10} />
        </div>
        <div className="flex-1 h-24 px-4 py-2 bg-white/90 rounded-[20px] flex justify-between items-center">
          <Title
            label="미송출"
            iconSrc="/asset/ico_unbroadcast.svg"
            size="lg"
            bgColor="#6EABF7"
          />
          <StatusInfo value={890} bgColor="#BFDBFE" percent={80} />
        </div>
        <div className="flex-1 h-24 px-4 py-2 bg-white/90 rounded-[20px] flex justify-between items-center">
          <Title
            label="미등록"
            iconSrc="/asset/ico_unregistered.svg"
            size="lg"
            bgColor="#7DC600"
          />
          <StatusInfo value={10} bgColor="#BEF264" percent={10} />
        </div>
      </div>

      <div className="flex gap-2.5 mt-2.5 h-[310px]">
        {/* 실시간 송출 현황 */}
        <div className="p-3.5 rounded-[20px] w-4/5 relative border border-sky-base-300 shrink-0">
          <Title
            label="실시간 송출 현황"
            iconSrc="/asset/ico_broadcast_sm.svg"
            bgColor="#484C56"
          />
          <div className="absolute top-3.5 right-5 px-2.5 h-9 flex gap-5 items-center rounded-[40px] bg-gray-100">
            <Legend label="장비가동률" value="82" color="#487DEE" />
          </div>

          <div id="chart" className="rounded-[20px] bg-white pr-5">
            <ReactApexChart
              options={liveData.options}
              series={liveData.series}
              height={230}
            />
          </div>
        </div>
        {/* 예약 내역 */}
        <div className="p-3.5 rounded-[20px] bg-gray-100 flex-1 overflow-hidden">
          <div className="h-full flex flex-col overflow-hidden">
            <Title label="예약 내역" iconSrc="/asset/ico_resv.svg" />
            <div className="flex-1 bg-white p-5 pr-3 rounded-[20px] overflow-hidden">
              <ul class="flex flex-1 flex-col h-full overflow-y-auto">
                {dummyCate.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2.5 py-3 border-b border-b-gray-100 last:border-b-0 items-center justify-between"
                  >
                    <span className="text-gray-500 font-semibold truncate max-w-4/6">
                      <Tooltip id={index} content={item.label} place="left" />
                    </span>
                    <span className="font-bold text-gray-900 shrink-0 pr-2">
                      {item.value} / {item.total}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5 mt-2.5">
        {/* 미송출 현황 */}
        <div className="p-3.5 rounded-[20px] w-4/5 relative border border-sky-base-300 shrink-0">
          <Title
            label="미송출 현황"
            iconSrc="/asset/ico_unbroadcast_sm.svg"
            bgColor="#6EABF7"
          />
          <div className="absolute top-3.5 right-5 px-2.5 h-9 flex gap-5 items-center rounded-[40px] bg-gray-100">
            <Legend label="미확인" color="#06B6D4" />
            <Legend label="AS접수" color="#7DC600" />
            <Legend label="정지" color="#F87171" />
            <Legend label="고장" color="#484C56" />
          </div>
          <div id="chart" className="rounded-[20px] bg-white pr-3">
            <ReactApexChart
              options={missedData.options}
              series={missedData.series}
              type="bar"
              height={230}
            />
          </div>
        </div>

        {/* 사용자 관리 */}
        <div className="p-3.5 rounded-[20px] bg-gray-100 flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <Title label="사용자 관리" iconSrc="/asset/ico_user.svg" />
            <div className="flex-1 bg-white rounded-[20px] flex items-center justify-center flex-col text-center gap-2.5">
              <span className="text-gray-400 text-sm font-semibold">
                사용자 등록요청 건수
              </span>
              <span className="text-gray-900 text-3xl font-bold">17,123</span>
            </div>
            <Link
              to="/manager/user-management"
              className="mt-2.5 h-14 p-4 bg-gray-600 rounded-[60px] text-white flex justify-center gap-6 items-center font-semibold"
            >
              지금 확인하기
              <img src="/asset/ico_arrow.svg" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default DashboardPage;
