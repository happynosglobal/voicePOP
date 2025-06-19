import React, { useEffect, useState } from "react";
import ChartTitle from "./ChartTitle";
import { Link } from "react-router-dom";
import { getUsers } from "../../../api/user/user";
import { toPriceFormat } from "../../../utils/customFormat";
import { URL_MAPPING } from "../../../utils/constant/urls";

const UserRequestSummary = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getUserList = async () => {
      try {
        const response = await getUsers({
          status: "require",
          page: 1,
          page_size: 200,
        });
        const items = response?.data?.data?.users;
        setCount(toPriceFormat(items.length));
      } catch (err) {
        console.error("사용자 등록요청 내역 로딩 실패", err);
      }
    };
    getUserList();
  }, []);
  return (
    <div className="p-3.5 rounded-[20px] bg-gray-100 flex-1 overflow-hidden">
      <div className="h-full flex flex-col">
        <ChartTitle label="사용자 관리" iconSrc="/asset/ico_user.svg" />
        <div className="flex-1 bg-white rounded-[20px] flex items-center justify-center flex-col text-center gap-2.5">
          <span className="text-gray-400 text-sm font-semibold">
            사용자 등록요청 건수
          </span>
          <span className="text-gray-900 text-3xl font-bold">{count}</span>
        </div>
        <Link
          to={URL_MAPPING.userManagement}
          className="mt-2.5 h-14 p-4 bg-gray-600 rounded-[60px] text-white flex justify-center gap-6 items-center font-semibold"
        >
          지금 확인하기
          <img src="/asset/ico_arrow.svg" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default UserRequestSummary;
