import React, { useState } from "react";
import { getCategoryList } from "../api/category/category";
import { toast } from "react-toastify";
import useCodes from "../stores/codes";
import { getErrorMessage } from "../utils/constant/messages";

const useCategoryCode = () => {
  const { setCategory } = useCodes();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryOptions4Select, setCategoryOptions4Select] = useState([]);
  const getCategoryCodes = async (brand_code) => {
    try {
      const params = {
        use_yn: "Y",
        brand_code: brand_code,
      };
      const res = await getCategoryList(params);
      const { status_code, data } = res.data;
      if (status_code === 200 || status_code === 204) {
        setCategory(data.items);
        setCategoryOptions(data.items);
        parsingCategories4Select(data.items);
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };
  /* Category 항목을 react-select에 맞게 parsing */
  const parsingCategories4Select = (categoryOptions) => {
    const tempStores = [];
    categoryOptions.map((item) =>
      tempStores.push({ value: item.code, label: item.name })
    );
    setCategoryOptions4Select(tempStores);
  };
  return {
    categoryOptions,
    categoryOptions4Select,
    getCategoryCodes,
  };
};

export default useCategoryCode;
