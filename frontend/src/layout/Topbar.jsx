import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/user";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import useCodes from "../stores/codes";
import { getStoreCodes } from "../api/storeGroup/storeGroup";
import { useEffect, useState } from "react";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, setStoreName, logout } = useUserStore();
  const { resetStores } = useCodes();

  const handleLogout = () => {
    logout();
    resetStores();
  };
  const getLevelName = (level) => {
    return level === 3
      ? "전체 관리자"
      : level === 2
        ? "브랜드 관리자"
        : level === 1
          ? "광고 관리자"
          : "점포 관리자"
  }
  const getStoreName = (store_code) => {
    const params = {
      store_type: user.brand_code,
      storeId: store_code
    }
    getStoreCodes(params)
      .then(res => {
        const { code, data } = res.data;
        if (code === "0000") {
          setStoreName(data[0].name);
        }
      })
      .catch(err => {
        console.error(err)
      });     
  };
  useEffect(()=>{
    getStoreName(user?.store_code);
  },[user?.store_code, user.brand_code])
  return (
    <header className="wide:fixed top-0 left-0 right-0 h-[60px] bg-white px-5 flex justify-between items-center border-b z-10 w-full">
      <h1 className="text-black text-2xl font-bold leading-none">
        <Link to="/dashboard">VoicePOP</Link>
      </h1>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 bg-accent rounded-[10px]">
            <IoPersonSharp className="text-xl" />
          </div>
          <p className="text-gray-800 font-medium leading-none">
            {user?.user_name}
            <span className="text-gray-800 text-sm leading-none">
              {`(${user?.brand_code} ${user?.store_name || ""} ${getLevelName(user?.level)})`}
            </span>
          </p>
        </div>

        <button
          className="flex items-center gap-1.5 h-[32.50px] px-[15px] py-2 bg-[#484c56] text-white text-sm rounded-[40px] font-semibold"
          onClick={() => {
            handleLogout();
            navigate("/");
          }}
        >
          <LuLogOut className="text-lg" />
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Topbar;
