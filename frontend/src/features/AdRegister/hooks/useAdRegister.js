import React, { useEffect, useMemo, useState } from "react";
import { toDate } from "../../../utils/customFormat";
import useUserStore from "../../../stores/user";
import useCategoryCode from "../../../hooks/useCategoryCode";
import {
  getAdCompanayList,
  getAdContractList,
} from "../../../api/advertisement/advertisement";
import { toast } from "react-toastify";

const useAdRegister = () => {
  const { user } = useUserStore();
  const today = useMemo(() => new Date(), []);

  const initialFormData = useMemo(
    () => ({
      title: "",
      category_type_seq: "",
      company: "",
      contract: "",
      start_date: toDate(today),
      end_date: toDate(today),
      start_time: "0900",
      end_time: "2200",
      gap: 3, // 초단위
      repeat_count: 1,
      repeat_interval: 1, // 초단위
    }),
    [today]
  );

  const { categoryOptions, getCategoryCodes } = useCategoryCode();

  const [formData, setFormData] = useState(initialFormData);
  const [selectedStore, setSelectedStore] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState(null);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);

  useEffect(() => {
    getCategoryCodes(user?.brand_code);
  }, [user]);

  const getCompanyOption = (brand_code) => {
    const params = {
      brand_code: brand_code,
      use_yn: "Y",
      page_size: 100,
    };
    getAdCompanayList(params)
      .then((res) => {
        const { status_code, data } = res.data;
        if (status_code === 200) {
          const options = data.items.map((option) => ({
            value: option.id,
            label: option.business_name,
          }));
          setCompanyOptions(options);
        } else {
          setCompanyOptions([]);
        }
      })
      .catch((err) => {
        toast.error("업체 정보를 불러오는데 실패했습니다.");
        console.error(err);
      });
  };

  const getContractOption = (company_id) => {
    setFormData((prev) => ({ ...prev, contract: "" }));
    const params = {
      company_id: company_id,
      use_yn: "Y",
      page_size: 100,
    };
    getAdContractList(params)
      .then((res) => {
        const { status_code, data } = res.data;
        if (status_code === 200) {
          const options = data.items.map((option) => ({
            value: option.id,
            label: `${option.ad_type_name} / ${toDate(
              option.contract_from
            )} ~ ${toDate(option.contract_to)}`,
          }));
          setContractOptions(options);
        } else {
          setContractOptions([]);
        }
      })
      .catch((err) => {
        toast.error("업체 정보를 불러오는데 실패했습니다.");
        console.error(err);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectBox = (option, meta) => {
    const { label, value } = option;
    const { name } = meta;
    
    if (name === "repeat_count" && value === 1) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        repeat_interval: 1,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isFormValid = (isGapChecked) => {
    const isStoreManager = user?.level === "STORE";
    const hasCommonFields =
      formData.title &&
      formData.category_type_seq &&
      (isStoreManager || selectedStore.length !== 0) &&
      formData.contract &&
      formData.start_date &&
      formData.end_date &&
      formData.start_time &&
      formData.end_time &&
      audioFile;

    const hasGapField = isGapChecked && formData.gap;
    const hasRepeatFields =
      !isGapChecked && formData.repeat_count && formData.repeat_interval;

    const isValid = hasCommonFields && (hasGapField || hasRepeatFields);
    return isValid;
  };

  const isWithinTimeRange = ({
    startTimeStr,
    endTimeStr,
    duration,
    gap,
    repeatCount,
    repeatInterval,
    isGapChecked,
    isRepeatChecked,
  }) => {
    const toSeconds = (timeStr) => {
      const hour = parseInt(timeStr.slice(0, 2), 10);
      const min = parseInt(timeStr.slice(2), 10);
      return hour * 3600 + min * 60;
    };

    const start = toSeconds(startTimeStr);
    const end = toSeconds(endTimeStr);
    const availableSeconds = end - start;
    if (isGapChecked && !isRepeatChecked) {
      const totalTimeNeeded = duration + gap;
      return totalTimeNeeded <= availableSeconds;
    }

    if (!isGapChecked && isRepeatChecked) {
      const totalTimeNeeded = repeatCount * (duration + repeatInterval);
      return totalTimeNeeded <= availableSeconds;
    }

    return false;
  };

  return {
    formData,
    setFormData,
    selectedStore,
    setSelectedStore,
    audioFile,
    setAudioFile,
    duration,
    setDuration,
    categoryOptions,
    companyOptions,
    setCompanyOptions,
    getCompanyOption,
    contractOptions,
    setContractOptions,
    getContractOption,
    handleInput,
    handleSelectBox,
    isFormValid,
    isWithinTimeRange,
  };
};

export default useAdRegister;
