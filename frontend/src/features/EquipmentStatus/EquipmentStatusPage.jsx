import React, { useEffect, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Select from "react-select";
import useUserStore from "../../stores/user";
import useCodes from "../../stores/codes";
import EquipmentStatusTable from "./components/EquipmentStatusTable";
import { toast } from "react-toastify";
import { getDeviceStatus } from "../../api/device/device";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const EquipmentStatusPage = () => {
  const { user } = useUserStore();
  const { storeByBrandCode, isLoading } = useCodes();

  const [searchParams, setSearchParams] = useState({
    str_code: user?.store_code || "",
    category_code: "",
    rows_per_page: 1000,
  });

  const [deviceList, setDeviceList] = useState([]);

  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;

    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetDeviceList = async () => {
    const params = searchParams;
    params.brand_code = user?.brand_code;
    try {
      const response = await getDeviceStatus(params);
      const { status, data } = response;
      if (status === 200) {
        setDeviceList(data.data.items);
      }
    } catch (err) {
      toast.error("장비 조회에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <ContentLayout>
      <div className="flex mb-5 gap-1">
        <div className="flex justify-between w-full">
          <div className="flex flex-wrap items-center gap-1.5">
            <Select
              name="str_code"
              options={[{ value: "", label: "모든 점포" }, ...storeByBrandCode]}
              className="min-w-64"
              onChange={(option, meta) => {
                if (user?.level !== "STORE") handleSelectBox(option, meta);
              }}
              value={
                [{ value: "", label: "모든 점포" }, ...storeByBrandCode].find(
                  (opt) => opt.value === searchParams.str_code
                ) || { value: "", label: "모든 점포" }
              }
              isDisabled={user?.level === "STORE"}
              defaultValue={{ value: "", label: "모든 점포" }}
            />
          </div>
        </div>
      </div>
      <EquipmentStatusTable
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleGetDeviceList={handleGetDeviceList}
        deviceList={deviceList}
      />
      <LoadingSpinner includeCodesLoading={true} />
    </ContentLayout>
  );
};

export default EquipmentStatusPage;
