import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/user";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const Topbar = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="min:fixed top-0 left-0 right-0 h-[60px] bg-white px-5 flex justify-between items-center border-b z-10 w-full">
      <h1 className="text-black text-2xl font-bold leading-none">
        <Link to="/dashboard">VoicePOP</Link>
      </h1>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 bg-accent rounded-[10px]">
            <IoPersonSharp className="text-xl" />
          </div>
          <p className="text-gray-800 font-medium leading-none">
            홍길동
            <span className="text-gray-800 text-sm leading-none">
              (Emart 관리자)
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
