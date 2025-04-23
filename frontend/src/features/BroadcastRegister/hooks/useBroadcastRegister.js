import React, { useEffect, useMemo, useState } from 'react'
import { toYYYYMMDD } from '../../../utils/customFormat';
import useUserStore from '../../../stores/user';
import useCategoryCode from '../../../hooks/useCategoryCode';

const useBroadcastRegister = () => {
  const { user } = useUserStore();
  const today = useMemo(() => (new Date()), []);

  const initialFormData = useMemo(() => ({
    title: "",
    category_type_seq: "",
    start_date: toYYYYMMDD(today),
    end_date: toYYYYMMDD(today),
    start_time: "0900",
    end_time: "2200",
    gap: 1, // 초단위
    repeat_count: 5,
    repeat_interval: 1, // 분단위
  }), [today]);

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
  }

  const handleSelectBox = (option, option2) => {
    const { label, value } = option;
    const { name } = option2;
    setFormData({ ...formData, [name]: value });
  }

  const isFormValid = () => {
    let isValid = false;

    isValid =
      formData.title &&
      formData.category_type_seq &&
      selectedStore.length !== 0 &&
      formData.start_date &&
      formData.end_date &&
      formData.start_time &&
      formData.end_time &&
      formData.gap &&
      formData.repeat_count &&
      formData.repeat_interval &&
      audioFile;

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
    isFormValid
  }
}

export default useBroadcastRegister;