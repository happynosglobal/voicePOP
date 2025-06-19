import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../stores/user";
import useCodes from "../stores/codes";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { allStoreCode, isLoading, fetchStores, resetStores } = useCodes();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 로그인 후 점포코드가 없을 때 다시 점포코드 로드
    if (user && isLoading && allStoreCode.length === 0) {
      fetchStores(user?.brand_code);
    }
  }, [user, isLoading, allStoreCode]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      logout();
      resetStores();
      navigate("/login");
    } else {
      setMounted(true);
    }
  }, []);

  return (
    <>
      {mounted && (
        <div className="relative min-h-screen bg-[#5d6372]">
          <Topbar />
          <Sidebar />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default DefaultLayout;
