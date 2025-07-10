import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_MAPPING } from "../../../utils/constant/urls";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/constant/messages";
import {
  deleteAudioMapping,
  deleteBcMaster,
  deleteBcTargetStore,
  deleteBcTimeTable,
  getBcMasterList,
  getBcMasterListByStore,
  getBcTargetStore,
} from "../../../api/broadcast/broadcast";
import { removeEmptyString, toDate } from "../../../utils/customFormat";
import useCodes from "../../../stores/codes";
import useUserStore from "../../../stores/user";

const useBroadcastManagement = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { storeByBrandCode } = useCodes();
  const today = useMemo(() => new Date(), []);

  const limit = 10;

  // 방송중 페이징
  const [liveTotal, setLiveTotal] = useState(0);
  const [livePage, setLivePage] = useState(1);
  // 예약완료 페이징
  const [scheduledTotal, setScheduledTotal] = useState(0);
  const [scheduledPage, setScheduledPage] = useState(1);

  const storeOptions =
    user?.level === "STORE"
      ? [{ value: user?.store_code, label: user?.store_name }]
      : [...storeByBrandCode];
  // : [{ value: "", label: "모든 점포" }, ...storeByBrandCode];

  const [checkedBc, setCheckedBc] = useState([]); // 체크된 방송

  const [searchParams, setSearchParams] = useState({
    str_code: user?.store_code || "",
    category_code: "",
    rows_per_page: 1000,
  });
  // 방송중 데이터
  const [liveBroadcasts, setLiveBroadcasts] = useState([]);
  // 예약완료 데이터
  const [scheduledBroadcasts, setScheduledBroadcasts] = useState([]);
  // 점포관리자일 경우 본인 점포 대상 점포목록 따로 관리
  const [editableBcIds, setEditableBcIds] = useState([]);

  const handleSelectBox = (option, meta) => {
    // const { label, value } = option;
    // const { name } = meta;
    const { name } = meta;

    const value = option ? option.value : "";
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  // 개별 체크박스 핸들러
  const handleCheckBox = (id, checked) => {
    setCheckedBc((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((bcId) => bcId !== id);
      }
    });
  };

  // 전체 선택 핸들러
  const handleAllCheckBox = (data, checked) => {
    const storeCode = user?.store_code;

    // 점포 관리자인 경우 본인 점포 대상만 필터링
    if (user?.level === "STORE") {
      const editableIds = data
        .filter(
          (item) =>
            item.stores?.length === 1 && item.stores[0].store_code === storeCode
        )
        .map((item) => item.id);

      if (checked) {
        setCheckedBc((prev) => [...new Set([...prev, ...editableIds])]);
      } else {
        setCheckedBc((prev) => prev.filter((id) => !editableIds.includes(id)));
      }

      return;
    }

    // 일반 관리자
    const allIds = data.map((item) => item.id);
    if (checked) {
      setCheckedBc((prev) => [...new Set([...prev, ...allIds])]);
    } else {
      setCheckedBc((prev) => prev.filter((id) => !allIds.includes(id)));
    }
  };

  // 방송 목록 조회
  const handleGetBcList = async (type, page) => {
    // 광고방송(commercial) 조회 보류
    const bcType =
      user?.level === "AD_ADMIN"
        ? "normal"
        : user?.level === "BROADCAST_ADMIN"
        ? "normal"
        : "normal";
    const newParams = {
      type: bcType,
      category_type_seq: searchParams.category_code,
      rows_per_page: 10,
      brand_code: user?.brand_code,
      use_yn: "Y",
    };

    if (type === "live") {
      newParams.search_date = toDate(today);
      newParams.page = page;
    } else if (type === "scheduled") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      newParams.start_date = toDate(tomorrow);
      newParams.page = page;
    }

    const params = removeEmptyString(newParams);

    try {
      let response;
      if (searchParams.str_code) {
        response = await getBcMasterListByStore(searchParams.str_code, params);
      } else {
        response = await getBcMasterList(params);
      }

      if (response?.status === 200) {
        const items = response.data.data.items;

        // 방송마다 점포리스트 병합
        const itemsWithStores = await Promise.all(
          items.map(async (item) => {
            try {
              const storeRes = await getBcTargetStore(item.id, {
                page_size: 1000,
              });
              return {
                ...item,
                stores: storeRes?.data?.data?.items || [], // stores 필드 추가
              };
            } catch (err) {
              console.error(
                `Failed to get stores for broadcast id ${item.id}`,
                err
              );
              return { ...item, stores: [] };
            }
          })
        );

        if (type === "live") {
          setLiveTotal(response.data.data.count);
          setLivePage(response.data.data.page);
          setLiveBroadcasts(itemsWithStores);
        } else if (type === "scheduled") {
          setScheduledTotal(response.data.data.count);
          setScheduledPage(response.data.data.page);
          setScheduledBroadcasts(itemsWithStores);
        }
        if (user?.level === "STORE") {
          const storeCode = user?.store_code;
          const editable = itemsWithStores
            .filter(
              (bc) =>
                bc.stores?.length === 1 && bc.stores[0].store_code === storeCode
            )
            .map((bc) => bc.id);

          setEditableBcIds((prev) =>
            Array.from(new Set([...prev, ...editable]))
          );
        }
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };

  const handleDeleteBc = async () => {
    if (checkedBc.length === 0) return;

    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await Promise.all(checkedBc.map((id) => deleteBcMaster(id)));
      await Promise.all(checkedBc.map((id) => deleteBcTargetStore(id)));
      await Promise.all(checkedBc.map((id) => deleteAudioMapping(id)));
      await Promise.all(checkedBc.map((id) => deleteBcTimeTable(id)));

      handleGetBcList("live", 1);
      handleGetBcList("scheduled", 1);

      setCheckedBc([]);

      toast.success("삭제가 완료되었습니다.");
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };

  const navigateToEdit = (data) => {
    if (!data) {
      toast.error("선택한 방송 정보를 찾을 수 없습니다.");
      return;
    }
    if (
      user?.level === "STORE" &&
      !(
        data.stores?.length === 1 &&
        data.stores[0].store_code === user.store_code
      )
    ) {
      toast.error("해당 방송은 수정 권한이 없습니다.");
      return;
    }
    if (data.type === "normal") {
      navigate(URL_MAPPING.broadcastEdit, {
        state: {
          bcId: data.id,
          broadcastData: data,
        },
      });
    } else if (data.type === "commercial") {
      navigate(URL_MAPPING.adEdit, {
        state: {
          bcId: data.id,
          broadcastData: data,
        },
      });
    }
  };

  const navigateToEditById = () => {
    if (checkedBc.length !== 1) return;
    const id = checkedBc[0];
    const allData = [...liveBroadcasts, ...scheduledBroadcasts];
    const data = allData.find((item) => item.id === id);

    if (!data) {
      toast.error("선택한 방송 정보를 찾을 수 없습니다.");
      return;
    }
    if (data.type === "normal") {
      navigate(URL_MAPPING.broadcastEdit, {
        state: {
          bcId: data.id,
          broadcastData: data,
        },
      });
    } else if (data.type === "commercial") {
      navigate(URL_MAPPING.adRegister, {
        state: {
          bcId: data.id,
          broadcastData: data,
        },
      });
    }
  };

  return {
    user,
    today,
    limit,
    liveTotal,
    setLiveTotal,
    livePage,
    setLivePage,
    scheduledTotal,
    setScheduledTotal,
    scheduledPage,
    setScheduledPage,
    storeOptions,
    checkedBc,
    setCheckedBc,
    searchParams,
    setSearchParams,
    liveBroadcasts,
    setLiveBroadcasts,
    scheduledBroadcasts,
    setScheduledBroadcasts,
    editableBcIds,
    handleSelectBox,
    handleCheckBox,
    handleAllCheckBox,
    handleGetBcList,
    handleDeleteBc,
    navigateToEdit,
    navigateToEditById,
  };
};

export default useBroadcastManagement;
