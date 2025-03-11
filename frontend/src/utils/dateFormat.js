import { format } from "date-fns"

export const toYYYYMMDD = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
}