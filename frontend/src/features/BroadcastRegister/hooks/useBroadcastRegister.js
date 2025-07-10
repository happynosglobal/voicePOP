import React, { useEffect, useMemo, useState } from "react";
import { toDate } from "../../../utils/customFormat";
import useUserStore from "../../../stores/user";
import useCodes from "../../../stores/codes";

const useBroadcastRegister = () => {
  const { user } = useUserStore();

  const START_TIME = import.meta.env.VITE_BROADCAST_TIME_DEFAULT_START;
  const END_TIME = import.meta.env.VITE_BROADCAST_TIME_DEFAULT_END;

  const myStore = {
    store_code: user.store_code,
    store_name: user.store_name,
  };

  const today = useMemo(() => new Date(), []);
  const initialFormData = useMemo(
    () => ({
      title: "",
      category_type_seq: "",
      start_date: toDate(today),
      end_date: toDate(today),
      gap: 3, // 초단위
      repeat_count: 1,
      repeat_interval: 1, // 초단위
    }),
    [today]
  );

  const { categoryOptions } = useCodes();

  const [formData, setFormData] = useState(initialFormData);
  const [startTime, setStartTime] = useState(START_TIME);
  const [endTime, setEndTime] = useState(END_TIME);

  const [selectedStore, setSelectedStore] = useState(() => {
    return user?.level === "STORE" ? [myStore] : [];
  });
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);

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
      formData.start_date &&
      formData.end_date &&
      startTime &&
      endTime &&
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
    today,
    myStore,
    initialFormData,
    formData,
    setFormData,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedStore,
    setSelectedStore,
    audioFile,
    setAudioFile,
    duration,
    setDuration,
    audioPreviewUrl,
    setAudioPreviewUrl,
    categoryOptions,
    handleInput,
    handleSelectBox,
    isFormValid,
    isWithinTimeRange,
  };
};

export default useBroadcastRegister;
