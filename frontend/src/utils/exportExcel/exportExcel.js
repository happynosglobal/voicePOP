import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
import { toDate, toDateTime, toPriceFormat } from "../customFormat";
import { deviceMgmntMapping } from "./excelMappings/DeviceManagement";
import { deviceStatsMapping } from "./excelMappings/DeviceStats";
import { toast } from "react-toastify";

export const exportDataToExcel = (
  data,
  mappingKey,
  fileNamePrefix = "excel"
) => {
  if (!data || !mappingKey) {
    toast.error("다운로드 실패");
    return;
  }

  let mappedData = [];

  if (mappingKey === "deviceManagement") {
    mappedData = deviceMgmntMapping(data);
  } else if (mappingKey === "deviceStats") {
    mappedData = deviceStatsMapping(data);
  }

  if (mappedData.length === 0) return;

  // 워크시트 생성
  const worksheet = XLSX.utils.json_to_sheet(mappedData);

  // 헤더 스타일 적용
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (worksheet[cellAddress]) {
      worksheet[cellAddress].s = {
        fill: {
          //바탕색
          type: "pattern",
          pattern: "solid",
          fgColor: { rgb: "1F4E78" },
        },
        font: {
          //글자색
          bold: true,
          color: { rgb: "FFFFFF" },
        },
        alignment: {
          //정렬
          horizontal: "center",
          vertical: "center",
        },
        border: {
          //테두리
          top: { style: "thin", color: { rgb: "CCCCCC" } },
          bottom: { style: "thin", color: { rgb: "CCCCCC" } },
          left: { style: "thin", color: { rgb: "CCCCCC" } },
          right: { style: "thin", color: { rgb: "CCCCCC" } },
        },
      };
    }
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const fileName = `${fileNamePrefix}_${new Date()
    .toISOString()
    .slice(0, 10)}.xlsx`;
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
