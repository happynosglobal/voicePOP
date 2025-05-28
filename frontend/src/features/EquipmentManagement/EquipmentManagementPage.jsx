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

const EquipmentManagementPage = () => {
  const { user } = useUserStore();
  const { storeByBrandCode, isLoading } = useCodes();
  const { categoryOptions, getCategoryCodes } = useCategoryCode();

  const [searchParams, setSearchParams] = useState({
    str_code: user?.store_code || "",
    category_code: "",
  });

  useEffect(() => {
    getCategoryCodes(user?.brand_code);
  }, [user]);

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
      const response = await getDeviceList(params);
      const { status, data } = response;
      if (status === 200) {
        setDeviceList(data.data);
      }
    } catch (err) {
      toast.error("장비 조회에 실패했습니다.");
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
      toast.error("장비 상태 변경에 실패했습니다.");
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
              onChange={handleSelectBox}
              defaultValue={{ value: "", label: "모든 점포" }}
            />
          </div>
          <button className="btn btn-sm btn-success">
            <RiFileExcel2Line className="text-xl" /> 엑셀다운로드
          </button>
        </div>
      </div>

      <DeviceManagementTable
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        categoryOptions={categoryOptions}
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
