import React, { useEffect, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Select from "react-select";
import useUserStore from "../../stores/user";
import useCodes from "../../stores/codes";
import EquipmentStatusTable from "./components/EquipmentStatusTable";
import { toast } from "react-toastify";
import { getDeviceStatus } from "../../api/device/device";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { removeEmptyString } from "../../utils/customFormat";
import { getErrorMessage } from "../../utils/constant/messages";
import Dropdown from "../../components/dropdown/Dropdown";

const EquipmentStatusPage = ({ title }) => {
  const { user } = useUserStore();
  const { storeByBrandCode, isLoading } = useCodes();
  const storeOptions =
    user?.level === "STORE"
      ? [{ value: user?.store_code, label: user?.store_name }]
      : [...storeByBrandCode];

  const [searchParams, setSearchParams] = useState({
    str_code: user?.store_code || "",
    category_code: "",
    rows_per_page: 1000,
  });

  const [deviceList, setDeviceList] = useState([]);

  const handleSelectBox = (option, meta) => {
    // const { label, value } = option;
    const { name } = meta;

    const value = option ? option.value : "";
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetDeviceList = async () => {
    const tempParams = searchParams;
    tempParams.brand_code = user?.brand_code;
    const params = removeEmptyString(tempParams);
    try {
      const response = await getDeviceStatus(params);
      const { status, data } = response;
      if (status === 200) {
        setDeviceList(data.data.items);
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };

  return (
    <ContentLayout title={title}>
      <div className="flex mb-5 gap-1">
        <div className="flex justify-between w-full">
          <div className="flex flex-wrap items-center gap-1.5">
            <Dropdown
              name="str_code"
              options={storeOptions}
              className="min-w-64"
              value={storeOptions.find(
                (opt) => opt.value === searchParams.str_code
              )}
              onChange={(option, meta) => {
                if (user?.level !== "STORE") handleSelectBox(option, meta);
              }}
              isClearable={true}
              isDisabled={user?.level === "STORE"}
              placeholder={"점포 검색"}
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
