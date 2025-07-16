import { useEffect, useState } from "react";
import useUserStore from "../../../stores/user";
import { getDeviceStatus } from "../../../api/device/device";
import ChartTitle from "./ChartTitle";
import { URL_MAPPING } from "../../../utils/constant/urls";

const DeviceStatusSection = () => {
  const { user } = useUserStore();

  const [statusData, setStatusData] = useState({
    broadcasted: 0, //송출
    not_broadcasted: 0, // 미송출
    unregistered: 0, // 미등록
    total: 0,
  });

  useEffect(() => {
    const getDeviceStatusList = async () => {
      try {
        const response = await getDeviceStatus({
          rows_per_page: 1000,
          brand_code: user?.brand_code,
        });

        const items = response.data?.data?.items || [];
        const count = {
          송출: 0,
          미송출: 0,
          미등록: 0,
        };

        items.forEach((item) => {
          const status = item.device_status || "미등록";
          if (count[status] !== undefined) {
            count[status]++;
          } else {
            count["미등록"]++;
          }
        });

        setStatusData({
          broadcasted: count["송출"],
          not_broadcasted: count["미송출"],
          unregistered: count["미등록"],
          total: items.length,
        });
      } catch (e) {
        console.error("장비 상태 조회 실패", e);
      }
    };

    getDeviceStatusList();
  }, [user?.brand_code]);

  const getPercent = (count) =>
    statusData.total ? ((count / statusData.total) * 100).toFixed(1) : "0.0";

  const StatusInfo = ({ value, total, percent, bgColor }) => (
    <div className="flex gap-4 items-center">
      <span className="text-gray-900 text-2xl font-bold">
        {`${value} / ${total}`}
      </span>
      <span
        className="px-2.5 py-1.5  rounded-[30px] text-sm font-bold"
        style={{ backgroundColor: bgColor }}
      >
        {percent}%
      </span>
    </div>
  );

  return (
    <div className="flex gap-2.5 bg-yellow-300 rounded-[20px] p-3.5">
      <div className="flex-1 h-24 px-4 py-2 bg-white/90 rounded-[20px] flex justify-between items-center">
        <ChartTitle
          label="송출"
          iconSrc="/asset/ico_broadcast.svg"
          size="lg"
          bgColor="#484C56"
          url={URL_MAPPING.equipmentStatus}
        />
        <StatusInfo
          value={statusData.broadcasted}
          total={statusData.total}
          bgColor="#E6E7EB"
          percent={getPercent(statusData.broadcasted)}
        />
      </div>
      <div className="flex-1 h-24 px-4 py-2 bg-white/90 rounded-[20px] flex justify-between items-center">
        <ChartTitle
          label="미송출"
          iconSrc="/asset/ico_unbroadcast.svg"
          size="lg"
          bgColor="#6EABF7"
          url={URL_MAPPING.equipmentStatus}
        />
        <StatusInfo
          value={statusData.not_broadcasted}
          total={statusData.total}
          bgColor="#BFDBFE"
          percent={getPercent(statusData.not_broadcasted)}
        />
      </div>
      <div className="flex-1 h-24 px-4 py-2 bg-white/90 rounded-[20px] flex justify-between items-center">
        <ChartTitle
          label="미등록"
          iconSrc="/asset/ico_unregistered.svg"
          size="lg"
          bgColor="#7DC600"
          url={URL_MAPPING.equipmentStatus}
        />
        <StatusInfo
          value={statusData.unregistered}
          total={statusData.total}
          bgColor="#BEF264"
          percent={getPercent(statusData.unregistered)}
        />
      </div>
    </div>
  );
};

export default DeviceStatusSection;
