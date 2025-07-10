import React, { useEffect, useState } from "react";
import ContentLayout from "../../layout/ContentLayout";
import useUserStore from "../../stores/user";
import DeviceManagementTable from "./components/DeviceManagementTable";
import useCodes from "../../stores/codes";
import { toast } from "react-toastify";
import { getDeviceList, postDeviceStatus } from "../../api/device/device";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { exportDataToExcel } from "../../utils/exportExcel/exportExcel";
import { removeEmptyString } from "../../utils/customFormat";
import { getErrorMessage } from "../../utils/constant/messages";
import SearchBar from "./components/SearchBar";

const EquipmentManagementPage = ({ title }) => {
  const { user } = useUserStore();
  const { storeByBrandCode, isLoading } = useCodes();
  const storeOptions =
    user?.level === "STORE"
      ? [{ value: user?.store_code, label: user?.store_name }]
      : [...storeByBrandCode];

  const bcStatusOptions = [
    { value: "running", label: "송출" },
    { value: "stop", label: "미송출" },
  ];

  const deviceStatusOptions = [
    { value: "normal", label: "정상" },
    { value: "as", label: "A/S" },
    { value: "unconfirmed", label: "미확인" },
    { value: "broken", label: "고장" },
  ];

  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useState({
    str_code: user?.store_code || "",
    category_code: "",
    status: "",
    status_process: "",
  });

  const [deviceList, setDeviceList] = useState([]);

  const handleSort = (sortBy, sortOrder) => {
    const newParams = {
      ...searchParams,
      sort_by: sortBy,
      sort_order: sortOrder,
    };
    setSearchParams(newParams);
    // handleGetDeviceList(newParams, 1);
  };

  const handleSelectBox = (option, meta) => {
    const { name } = meta;
    const value = option ? option.value : "";
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetDeviceList = async (
    params = searchParams,
    pageNumber = page
  ) => {
    const tempParams = {
      ...params,
      brand_code: user?.brand_code,
      page: pageNumber,
      page_size: limit,
    };
    const newParams = removeEmptyString(tempParams);
    try {
      const response = await getDeviceList(newParams);
      const { status, data } = response;
      if (status === 200) {
        setDeviceList(data?.data?.items);
        setTotal(data?.data?.count);
        setPage(data?.data?.page);
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
    <ContentLayout title={title}>
      <SearchBar
        searchParams={searchParams}
        storeOptions={storeOptions}
        bcStatusOptions={bcStatusOptions}
        deviceStatusOptions={deviceStatusOptions}
        handleSelectBox={handleSelectBox}
        exportToExcel={exportToExcel}
      />

      <DeviceManagementTable
        limit={limit}
        page={page}
        setPage={setPage}
        total={total}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        deviceStatusOptions={deviceStatusOptions}
        handleGetDeviceList={handleGetDeviceList}
        handleModifyDeviceStatus={handleModifyDeviceStatus}
        handleSort={handleSort}
        deviceList={deviceList}
        setDeviceList={setDeviceList}
      />
      <LoadingSpinner includeCodesLoading={true} />
    </ContentLayout>
  );
};

export default EquipmentManagementPage;
