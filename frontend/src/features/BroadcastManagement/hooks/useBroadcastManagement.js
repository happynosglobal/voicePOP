import React, { useMemo, useState } from "react";
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

  const storeOptions = [{ value: "", label: "모든 점포" }, ...storeByBrandCode];

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

  const handleSelectBox = (option, meta) => {
    const { label, value } = option;
    const { name } = meta;

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
    if (checked) {
      const allIds = data.map((item) => item.id);
      setCheckedBc((prev) => [...new Set([...prev, ...allIds])]);
    } else {
      const allIds = data.map((item) => item.id);
      setCheckedBc((prev) => prev.filter((id) => !allIds.includes(id)));
    }
  };

  // 방송 목록 조회
  const handleGetBcList = async (type, page) => {
    const baseParams = {
      type: "normal",
      category_type_seq: searchParams.category_code,
      rows_per_page: 10,
      brand_code: user?.brand_code,
      use_yn: "Y",
    };

    if (type === "live") {
      baseParams.search_date = toDate(today);
      baseParams.page = page;
    } else if (type === "scheduled") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      baseParams.start_date = toDate(tomorrow);
      baseParams.page = page;
    }

    const params = removeEmptyString(baseParams);

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
    if (data.type === "normal") {
      navigate(URL_MAPPING.broadcastRegister, {
        state: {
          title: "방송수정",
          mode: "edit",
          bcId: data.id,
          broadcastData: data,
        },
      });
    } else if (data.type === "commercial") {
      navigate(URL_MAPPING.adRegister, {
        state: {
          title: "광고수정",
          mode: "edit",
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
      navigate(URL_MAPPING.broadcastRegister, {
        state: {
          title: "방송수정",
          mode: "edit",
          bcId: data.id,
          broadcastData: data,
        },
      });
    } else if (data.type === "commercial") {
      navigate(URL_MAPPING.adRegister, {
        state: {
          title: "광고수정",
          mode: "edit",
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
