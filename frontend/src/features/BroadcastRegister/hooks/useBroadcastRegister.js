import React, { useEffect, useMemo, useState } from "react";
import { toDate } from "../../../utils/customFormat";
import useUserStore from "../../../stores/user";
import useCategoryCode from "../../../hooks/useCategoryCode";

const useBroadcastRegister = () => {
  const { user } = useUserStore();
  const today = useMemo(() => new Date(), []);

  const initialFormData = useMemo(
    () => ({
      title: "",
      category_type_seq: "",
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

  useEffect(() => {
    getCategoryCodes(user?.brand_code);
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = (isGapChecked) => {
    const isStoreManager = user?.level === "STORE";
    const hasCommonFields =
      formData.title &&
      formData.category_type_seq &&
       (isStoreManager || selectedStore.length !== 0) &&
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
  return {
    formData,
    setFormData,
    selectedStore,
    setSelectedStore,
    audioFile,
    setAudioFile,
    categoryOptions,
    handleInput,
    handleSelectBox,
    isFormValid,
  };
};

export default useBroadcastRegister;
