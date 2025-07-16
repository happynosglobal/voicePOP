import { toDate } from "../../customFormat";

export const deviceStatsMapping = (data) => {
  return data.map((row) => ({
    일자: toDate(row.op_date) ?? "",
    MD: row.category_name ?? "",
    장비수: row.device_count ?? "",
    운영: row.running ?? "",
    "미운영(정지)": row.stop ?? "",
    "미운영(A/S)": row.as ?? "",
    "미운영(고장)": row.broken ?? "",
    "미운영(미확인)": row.unconfirmed ?? "",
    정상: row.normal ?? "",
    가동률: row.running_rate ?? "",
  }));
};