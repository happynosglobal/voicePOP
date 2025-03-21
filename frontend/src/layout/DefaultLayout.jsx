import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../stores/user";
import { loginSuccessResponse } from "../features/Login/dummy/data";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setMounted(true);
    } else if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, user]);

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
