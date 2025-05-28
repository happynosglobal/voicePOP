import { format } from "date-fns"

export const toDate = (date) => {
  if (date === null || date === undefined) return "";
  return format(new Date(date), "yyyy-MM-dd");
}

export const toDateTime = (date) => {
  if (date === null || date === undefined) return "";
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}

export const toPriceFormat = (value) => {
  if (value === null || value === undefined) return "";
  
  const number = typeof value === "number" ? value : parseInt(value.toString().replace(/[^0-9]/g, ""), 10);

  if (isNaN(number)) return "";

  return number.toLocaleString("ko-KR");
};

export const toBusinessNumber = (value) => {
  if (value === null || value === undefined) return "";
  let formattedValue = value;
  if (value.length > 5) {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5)}`;
  } else if (value.length > 3) {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
  }
  return formattedValue;
}

export const removeEmptyString = (params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== "")
  );
  return filteredParams;
}