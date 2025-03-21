import { format } from "date-fns"

export const toYYYYMMDD = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
}

export const toBusinessNumber = (value) => {
  // if (!value) return;
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