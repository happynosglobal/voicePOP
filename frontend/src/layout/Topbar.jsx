import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/user";


const Topbar = () => {
    const navigate = useNavigate();
    const { logout } = useUserStore();
    const handleLogout = () => {
        logout();
    }
    return (
        <nav
            className="fixed top-0 left-48 right-0 h-16 bg-white p-4 flex justify-end items-center border-b border-gray-200 z-10"
        >
            <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-base font-semibold">
                    <IoPersonSharp />
                    홍길동(EM 관리자)
                </span>
                <button className="btn btn-sm btn-neutral" onClick={() => { handleLogout(); navigate('/') }}>로그아웃</button>
            </div>
        </nav>
    )
}

export default Topbar;