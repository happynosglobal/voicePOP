import React, { useEffect, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import Select from "react-select";
import { RiFileExcel2Line } from "react-icons/ri";
import useCategoryCode from "../../hooks/useCategoryCode";
import useUserStore from "../../stores/user";
import DeviceManagementTable from "./components/DeviceManagementTable";
import useCodes from "../../stores/codes";
import { toast } from "react-toastify";
import { getDeviceList, postDeviceStatus } from "../../api/device/device";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { exportDataToExcel } from "../../utils/exportExcel/exportExcel";
import { removeEmptyString } from "../../utils/customFormat";
import { getErrorMessage } from "../../utils/constant/messages";
import Dropdown from "../../components/dropdown/Dropdown";

const EquipmentManagementPage = () => {
  const { user } = useUserStore();
  const { storeByBrandCode, isLoading } = useCodes();
  const storeOptions = [{ value: "", label: "모든 점포" }, ...storeByBrandCode];

  const [searchParams, setSearchParams] = useState({
    str_code: user?.store_code || "",
    category_code: "",
  });

  const [deviceList, setDeviceList] = useState([]);

  const handleSelectBox = (option, meta) => {
    const { label, value } = option;
    const { name } = meta;

    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetDeviceList = async () => {
    const tempParams = searchParams;
    tempParams.brand_code = user?.brand_code;
    const params = removeEmptyString(tempParams);
    try {
      const response = await getDeviceList(params);
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

  const handleModifyDeviceStatus = async (data) => {
    if (!data) return;
    const body = {
      device_id: data.device_id,
      status_process: data.status_process, //( 미확인:unconfirmed,고장:broken, AS:as, 정상:normal )
      comment: data.comment,
    };
    try {
      const response = await postDeviceStatus(body);
      const { status, data } = response;
      if (status === 200) {
        toast.success("장비 상태가 변경되었습니다.");
        handleGetDeviceList();
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };

  const exportToExcel = async () => {
    try {
      const response = await getDeviceList({ brand_code: user?.brand_code });
      const { status, data } = response;
      if (status === 200) {
        exportDataToExcel(data.data, "deviceManagement", "장비관리");
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };
  return (
    <ContentLayout>
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
              isDisabled={user?.level === "STORE"}
            />
          </div>
          <button className="btn btn-sm btn-success" onClick={exportToExcel}>
            <RiFileExcel2Line className="text-xl" /> 엑셀다운로드
          </button>
        </div>
      </div>

      <DeviceManagementTable
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleGetDeviceList={handleGetDeviceList}
        handleModifyDeviceStatus={handleModifyDeviceStatus}
        deviceList={deviceList}
        setDeviceList={setDeviceList}
      />
      <LoadingSpinner includeCodesLoading={true} />
    </ContentLayout>
  );
};

export default EquipmentManagementPage;
