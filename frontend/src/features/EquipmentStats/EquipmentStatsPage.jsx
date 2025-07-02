import React, { useEffect, useMemo, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import SearchBar from "./components/SearchBar";
import DeviceStatsTable from "./components/DeviceStatsTable";
import { toDate } from "../../utils/customFormat";
import useUserStore from "../../stores/user";
import { getDeviceStat } from "../../api/device/device";
import { toast } from "react-toastify";
import { exportDataToExcel } from "../../utils/exportExcel/exportExcel";
import { getErrorMessage } from "../../utils/constant/messages";
const EquipmentStatsPage = () => {
  const { user } = useUserStore();
  const today = useMemo(() => new Date(), []);

  const [searchParams, setSearchParams] = useState({
    from_date: toDate(today),
    to_date: toDate(today),
    category_code: "",
  });

  const [deviceList, setDeviceList] = useState([]);

  // 장비 통계 (가동율) 조회
  const handleGetDeviceStat = async () => {
    const params = searchParams;
    params.brand_code = user?.brand_code;
    try {
      const response = await getDeviceStat(params);
      const { status, data } = response;
      if (status === 200) {
        setDeviceList(data.data);
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };

  const exportToExcel = async () => {
    try {
      const response = await getDeviceStat({ brand_code: user?.brand_code });
      const { status, data } = response;
      if (status === 200) {
        exportDataToExcel(data.data, "deviceStats", "장비통계");
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };

  return (
    <ContentLayout>
      <SearchBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleGetDeviceStat={handleGetDeviceStat}
        exportToExcel={exportToExcel}
      />

      <DeviceStatsTable
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleGetDeviceStat={handleGetDeviceStat}
        deviceList={deviceList}
      />
    </ContentLayout>
  );
};

export default EquipmentStatsPage;
