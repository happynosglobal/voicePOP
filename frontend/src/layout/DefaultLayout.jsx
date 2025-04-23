import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../stores/user";
import Cookies from "js-cookie";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      logout();
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
