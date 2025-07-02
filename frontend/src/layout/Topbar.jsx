import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/user";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import useCodes from "../stores/codes";
import { useEffect, useRef, useState } from "react";
import { getStoreNameByCode } from "../hooks/useStoreCode";
import Logo from "../components/logo/Logo";
import MyInfo from "../features/MyInfo/MyInfo";
import { URL_MAPPING } from "../utils/constant/urls";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { resetStores } = useCodes();
  const modalRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    resetStores();
  };

  const getLevelName = (level) => {
    return level === "ADMIN"
      ? "전체관리자"
      : level === "AD_ADMIN"
      ? "광고관리자"
      : level === "BROADCAST_ADMIN"
      ? "방송관리자"
      : "점포관리자";
  };

  const getUserLevelInfo = () => {
    const level = user?.level || "";
    const brand = user?.brand_code || "";
    const store = getStoreNameByCode(user?.store_code) || "";
    const levelName = getLevelName(user?.level);

    if (level === "STORE" && !getStoreNameByCode(user?.store_code)) return;

    if (level === "STORE") {
      return `(${store})`;
    } else {
      return `(${brand} ${levelName})`;
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <header className="wide:fixed top-0 left-0 right-0 h-[60px] bg-white px-5 flex justify-between items-center border-b z-10 w-full">
      <h1 className="text-black text-2xl font-bold leading-none">
        <Link to={user?.level === "ADMIN" ? URL_MAPPING.dashboard : "/"}>
          <Logo />
        </Link>
      </h1>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 bg-accent rounded-[10px]">
            <IoPersonSharp className="text-xl" />
          </div>
          <p className="text-gray-800 font-medium leading-none">
            <button className="hover:underline" onClick={openModal}>
              {user?.user_name}
              <span className="text-gray-800 text-sm leading-none">
                {getUserLevelInfo()}
              </span>
            </button>
          </p>
        </div>

        <button
          className="flex items-center gap-1.5 h-[32.50px] px-[15px] py-2 bg-[#484c56] text-white text-sm rounded-[40px] font-semibold"
          onClick={handleLogout}
        >
          <LuLogOut className="text-lg" />
          로그아웃
        </button>
      </div>

      {/* 모달은 필요할 때만 렌더링 */}
      {isOpen && (
        <MyInfo
          modalRef={modalRef}
          closeModal={closeModal}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </header>
  );
};

export default Topbar;
