import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/user";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import useCodes from "../stores/codes";
import { getStoreCodes } from "../api/storeGroup/storeGroup";
import { useEffect, useRef, useState } from "react";
import { getStoreNameByCode } from "../hooks/useStoreCode";
import Logo from "../components/logo/Logo";
import AddUserModal from "../features/UserManagement/components/AddUserModal";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { resetStores } = useCodes();
  const modalRef = useRef();

  const handleLogout = () => {
    logout();
    resetStores();
    navigate("/login");
  };
  const getLevelName = (level) => {
    return level === "ADMIN"
      ? "전체 관리자"
      : level === "AD_ADMIN"
      ? "광고 관리자"
      : level === "BROADCAST_ADMIN"
      ? "방송 관리자"
      : "점포 관리자";
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  console.log(user);

  return (
    <header className="wide:fixed top-0 left-0 right-0 h-[60px] bg-white px-5 flex justify-between items-center border-b z-10 w-full">
      <h1 className="text-black text-2xl font-bold leading-none">
        <Link to="/dashboard">
          <Logo />
        </Link>
      </h1>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 bg-accent rounded-[10px]">
            <IoPersonSharp className="text-xl" />
          </div>
          <p className="text-gray-800 font-medium leading-none">
            <button
              to="/my-info"
              className="hover:underline"
              onClick={() => {
                openModal();
              }}
            >
              {user?.user_name}
              <span className="text-gray-800 text-sm leading-none">
                {`(${user?.brand_code} ${
                  getStoreNameByCode(user?.store_code) || ""
                } ${getLevelName(user?.level)})`}
              </span>
            </button>
          </p>
        </div>

        <button
          className="flex items-center gap-1.5 h-[32.50px] px-[15px] py-2 bg-[#484c56] text-white text-sm rounded-[40px] font-semibold"
          onClick={() => {
            handleLogout();
          }}
        >
          <LuLogOut className="text-lg" />
          로그아웃
        </button>
      </div>
      <AddUserModal
        modalRef={modalRef}
        closeModal={closeModal}
        // setUserId={setUserId}
        // setUserId={setUserId}
        // handleGetUsers={handleGetUsers}
        mode="modify"
      />
    </header>
  );
};

export default Topbar;
