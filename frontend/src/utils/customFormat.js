import { format } from "date-fns";

export const toDate = (date) => {
  if (date === null || date === undefined) return "";
  return format(new Date(date), "yyyy-MM-dd");
};

export const toDateTime = (date) => {
  if (date === null || date === undefined) return "";
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
};

export const toPriceFormat = (value) => {
  if (value === null || value === undefined) return "";

  const number =
    typeof value === "number"
      ? value
      : parseInt(value.toString().replace(/[^0-9]/g, ""), 10);

  if (isNaN(number)) return "";

  return number.toLocaleString("ko-KR");
};

export const toTimeFormat = (time) => {
  if (!time || time.length !== 4) return time;
  return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
};

export const toGapFormat = (gap) => {
  if (!gap || gap < 0) return '-';
  const minutes = Math.floor(gap / 60);
  const seconds = gap % 60;

  if (minutes > 0 && seconds > 0) {
    return `${minutes}분 ${seconds}초`;
  } else if (minutes > 0) {
    return `${minutes}분`;
  } else {
    return `${seconds}초`;
  }
};

export const toBusinessNumber = (value) => {
  if (value === null || value === undefined) return "";
  let formattedValue = value;
  if (value.length > 5) {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(
      5
    )}`;
  } else if (value.length > 3) {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
  }
  return formattedValue;
};

export const removeEmptyString = (params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== "")
  );
  return filteredParams;
};
