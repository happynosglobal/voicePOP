import React, { useEffect, useMemo, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import SearchBar from "./components/SearchBar";
import DeviceStatsTable from "./components/DeviceStatsTable";
import { toDate } from "../../utils/customFormat";
import useCategoryCode from "../../hooks/useCategoryCode";
import useUserStore from "../../stores/user";
import { getDeviceStat } from "../../api/device/device";
import { toast } from "react-toastify";
const EquipmentStatsPage = () => {
  const { user } = useUserStore();
  const today = useMemo(() => new Date(), []);

  const [searchParams, setSearchParams] = useState({
    from_date: toDate(today),
    to_date: toDate(today),
    category_code: "",
  });

  const { categoryOptions, getCategoryCodes } = useCategoryCode();

  useEffect(() => {
    getCategoryCodes(user?.brand_code);
  }, [user]);

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
      toast.error("장비 조회에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <ContentLayout>
      <SearchBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleGetDeviceStat={handleGetDeviceStat}
      />

      <DeviceStatsTable
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        categoryOptions={categoryOptions}
        handleGetDeviceStat={handleGetDeviceStat}
        deviceList={deviceList}
      />
    </ContentLayout>
  );
};

export default EquipmentStatsPage;
