import React, { useEffect, useState } from "react";
import ChartTitle from "./ChartTitle";
import Tooltip from "../../../components/tooltip/Tooltip";
import useUserStore from "../../../stores/user";
import { getBcMasterList } from "../../../api/broadcast/broadcast";
import { toDate } from "../../../utils/customFormat";
import useCodes from "../../../stores/codes";
import { URL_MAPPING } from "../../../utils/constant/urls";

const ReservationSummary = () => {
  const { user } = useUserStore();
  const { categoryOptions } = useCodes();

  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const getBroadcastList = async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      try {
        const response = await getBcMasterList({
          type: "normal",
          rows_per_page: 1000,
          brand_code: user?.brand_code,
          use_yn: "Y",
          start_date: toDate(tomorrow),
          page: 1,
        });

        const items = response?.data?.data?.items || [];

        // 카테고리별 방송 개수 카운팅
        const countByCategory = {};
        items.forEach((item) => {
          const categoryName = item.category_type_seq;
          if (!countByCategory[categoryName]) {
            countByCategory[categoryName] = 0;
          }
          countByCategory[categoryName]++;
        });

        setCategoryCounts(countByCategory);
      } catch (err) {
        console.error("예약 내역 로딩 실패", err);
      }
    };

    getBroadcastList();
  }, [user?.brand_code]);

  return (
    <div className="p-3.5 rounded-[20px] bg-gray-100 flex-1 overflow-hidden">
      <div className="h-full flex flex-col overflow-hidden">
        <ChartTitle label="예약 내역" iconSrc="/asset/ico_resv.svg" url={URL_MAPPING.broadcastManagement}/>
        <div className="flex-1 bg-white p-5 pr-3 rounded-[20px] overflow-hidden">
          <ul className="flex flex-1 flex-col h-full overflow-y-auto">
            {categoryOptions.map((cat, index) => {
              const count = categoryCounts[cat.code] || 0;
              // if (count === 0) return null; // 예약된 방송 없는 카테고리는 표시하지 않을경우 주석 해제

              return (
                <li
                  key={cat.code}
                  className="flex gap-2.5 py-3 border-b border-b-gray-100 last:border-b-0 items-center justify-between"
                >
                  <span className="text-gray-500 font-semibold truncate max-w-4/6">
                    <Tooltip id={index} content={cat.name} place="left" />
                  </span>
                  <span className="font-bold text-gray-900 shrink-0 pr-2">
                    {count} 건
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;
