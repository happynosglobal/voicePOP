import { useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import { GiProgression } from "react-icons/gi";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineBroadcastOnPersonal } from "react-icons/md";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  // 상단 카드 박스
  const StatCard = ({ bgClass, icon, iconBg, title, children }) => (
    <div
      className={`flex flex-1 p-3.5 ${bgClass} rounded-[20px] flex-col justify-between`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className={`w-12 h-12 ${iconBg} rounded-[20px] flex items-center justify-center`}
        >
          {icon}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="block py-0.5 px-2 text-gray-500 text-sm font-semibold leading-tight bg-white/60 rounded-[30px]">
          월
        </span>
      </div>
      {children}
    </div>
  );

  // 카드 박스 지표
  const StatItem = ({ label, value, valueColor = "text-gray-900" }) => (
    <li className="flex-1 text-center flex flex-col gap-1 border-r border-gray-100 last:border-r-0">
      <span className="text-gray-600 text-sm font-semibold">{label}</span>
      <span className={`text-3xl font-bold ${valueColor}`}>{value}</span>
    </li>
  );

  //차트 타이틀
  const Title = ({ label, iconSrc }) => (
    <div className="flex items-center gap-1.5 mb-2.5">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white">
        <img src={iconSrc} alt="아이콘" />
      </div>
      <h2 className="text-lg font-semibold">{label}</h2>
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
        type: "line",
        data: [
          80, 82, 86, 91, 95, 98, 100, 98, 95, 91, 87, 84, 81, 80, 82, 86, 90,
          94, 98, 99, 98, 95, 91, 88, 85, 83, 81, 80, 81, 84, 87,
        ],
      },
      {
        name: "광고달성률",
        type: "area",
        data: [
          0, 3, 5, 9, 13, 16, 20, 23, 26, 29, 33, 36, 39, 42, 45, 49, 52, 55,
          58, 61, 64, 67, 70, 72, 74, 76, 77, 78, 79, 80, 80,
        ],
      },
    ],
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
      },
      colors: ["#FB923C", "#487DEE"],
      stroke: {
        curve: "straight",
        width: 4,
      },
      fill: {
        type: ["solid", "gradient"],
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.4,
          gradientToColors: ["#489BEE"],
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      dataLabels: { enabled: false },
      legend: { show: false },
      markers: {
        size: 0,
        hover: { sizeOffset: 6 },
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
          formatter: (val) => `${val}%`,
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
  //랜덤 숫자
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
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      colors: ["#06B6D4", "#F87171"],
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
        width: 2,
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
      <div className="flex gap-2.5">
        {/* 광고 수익 카드 */}
        <StatCard
          bgClass="bg-[#FFDC45]"
          icon={<GiProgression className="text-2xl text-amber-700" />}
          iconBg="bg-white"
          title="광고수익"
        >
          <div className="text-right p-4">
            <span className="text-gray-900 text-5xl font-bold pr-2">
              122,116,000
            </span>
            <span className="text-gray-600 text-sm font-semibold">천원</span>
          </div>
        </StatCard>

        {/* 광고 편성표 카드 */}
        <StatCard
          bgClass="bg-sky-200"
          icon={<LuClipboardList className="text-3xl text-white" />}
          iconBg="bg-blue-400"
          title="광고 편성표"
        >
          <ul className="bg-white/90 rounded-[20px] flex justify-between gap-2.5 items-center p-2.5">
            <StatItem label="광고수" value="11,999" />
            <StatItem label="업체수" value="145,666" />
          </ul>
        </StatCard>

        {/* 방송 현황 카드 */}
        <StatCard
          bgClass="bg-lime-300"
          icon={
            <MdOutlineBroadcastOnPersonal className="text-3xl text-white" />
          }
          iconBg="bg-lime-500"
          title="방송현황"
        >
          <ul className="bg-white/90 rounded-[20px] flex justify-between gap-2.5 items-center p-2.5">
            <StatItem label="송출" value="123,999" />
            <StatItem
              label="미송출"
              value="123,450"
              valueColor="text-red-600"
            />
            <StatItem
              label="미등록"
              value="456,789"
              valueColor="text-red-600"
            />
          </ul>
        </StatCard>
      </div>

      <div className="flex gap-2.5 mt-2.5">
        {/* 실시간 송출 현황 */}
        <div className="p-3.5 rounded-[20px] bg-gray-100 w-4/5 relative">
          <Title label="실시간 송출 현황" iconSrc="/asset/ico_live.svg" />
          <div className="absolute top-3.5 right-5 flex gap-5 items-center">
            <Legend label="장비가동률" value="82" color="#FB923C" />
            <Legend label="광고달성률" value="84" color="#487DEE" />
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
        <div className="p-3.5 border rounded-[20px] bg-gray-100 flex-1">
          <div className="h-full flex flex-col">
            <Title label="예약 내역" iconSrc="/asset/ico_resv.svg" />
            <ul className="flex flex-col justify-between flex-1 gap-2.5">
              <li className="flex-1 bg-white rounded-[20px] p-2.5 flex gap-3.5 items-center justify-between">
                <span className="h-full w-24 rounded-3xl flex items-center justify-center text-center bg-sky-200 text-gray-900 font-semibold">
                  광고
                </span>
                <span className="w-4 h-0.5 bg-sky-100"></span>
                <span className="flex-1 text-gray-900 text-2xl font-bold">
                  12,345
                </span>
              </li>
              <li className="flex-1  bg-white rounded-[20px] p-2.5 flex gap-3.5 items-center justify-between">
                <span className="h-full w-24 rounded-3xl flex items-center justify-center text-center bg-lime-300 text-gray-900 font-semibold ">
                  방송
                </span>
                <span className="w-4 h-0.5 bg-lime-100"></span>
                <span className="flex-1 text-gray-900 text-2xl font-bold">
                  120
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5 mt-2.5">
        {/* 미송출 현황 */}
        <div className="p-3.5 rounded-[20px] bg-gray-100 w-4/5 relative">
          <Title label="미송출 현황" iconSrc="/asset/ico_missed.svg" />
          <div className="absolute top-3.5 right-5 flex gap-5 items-center">
            <Legend label="미확인" color="#06B6D4" />
            <Legend label="AS접수" color="#F87171" />
          </div>
          <div id="chart" className="rounded-[20px] bg-white pr-3">
            <ReactApexChart
              options={missedData.options}
              series={missedData.series}
              type="bar"
              height={190}
            />
          </div>
        </div>

        {/* 사용자 관리 */}
        <div className="p-3.5 border rounded-[20px] bg-gray-100 flex-1">
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
