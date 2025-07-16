import { toDateTime } from "../../customFormat";

const statusProcess = {
  normal: "정상",
  as: "A/S",
  unconfirmed: "미확인",
  broken: "고장",
};
const statusLabel = {
  stop: "미송출",
  running: "송출",
};

export const deviceMgmntMapping = (data) => {
  return data.map((row) => ({
    점포명: row.str_name ?? "",
    MD: row.category_name ?? "",
    방송상태: statusLabel[row.status] ?? row.status ?? "",
    마지막방송시간: toDateTime(row.device_latest_run_datetime) ?? "",
    기기상태: statusProcess[row.status_process] ?? row.status_process ?? "",
    메모: row.comment ?? "",
  }));
};
