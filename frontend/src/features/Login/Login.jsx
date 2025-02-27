// features/login.jsx
import { useEffect } from "react";
import useUserStore from "../../stores/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { logout, login, user } = useUserStore();
    const navigate = useNavigate();
    useEffect(() => {
        console.log("통신 완료:", user)
    }, [user])
    const userData = {
        "level": "ADMIN",
        "brand_code": "EM",
        "latest_login_at": "2025-02-05 14:22:21",
        "menu": [
            {
                "parent_code": 0,
                "code": 11,
                "icon": "/asset/link.png",
                "name": "타입캐스트",
                "type": "outlink",
                "url": "https://typecast.ai"
            },
            {
                "parent_code": 0,
                "code": 12,
                "icon": "/asset/link.png",
                "name": "대시보드",
                "type": "screen",
                "url": "/dashboard" 
            },
            {
                "parent_code": 0,
                "code": 13,
                "icon": "/asset/schedule.png",
                "name": "장비현황",
                "type": "screen",
                "url": "/equipment-status"
            },
            {
                "parent_code": 0,
                "code": 14,
                "icon": "/asset/schedule.png",
                "name": "방송등록",
                "type": "screen",
                "url": "/broadcast-register"
            },
            {
                "parent_code": 0,
                "code": 15,
                "icon": "/asset/schedule.png",
                "name": "예약관리",
                "type": "screen",
                "url": "/reservation-management"
            },
            {
                "parent_code": 0,
                "code": 16,
                "icon": "/asset/schedule.png",
                "name": "광고",
                "type": "folder",
                "url": "/advertisement"
            },
            {
                "parent_code": 16,
                "code": 17,
                "icon": null,
                "name": "광고등록",
                "type": "screen",
                "url": "/advertisement/resiter"
            },
            {
                "parent_code": 16,
                "code": 18,
                "icon": null,
                "name": "광고현황",
                "type": "screen",
                "url": "/advertisement/status"
            },
            {
                "parent_code": 16,
                "code": 19,
                "icon": null,
                "name": "광고스케줄",
                "type": "screen",
                "url": "/advertisement/schedule"
            },
            {
                "parent_code": 0,
                "code": 20,
                "icon": "/asset/schedule.png",
                "name": "관리자",
                "type": "folder",
                "url": "/manager"
            },
            {
                "parent_code": 20,
                "code": 21,
                "icon": null,
                "name": "사용자관리",
                "type": "screen",
                "url": "/manager/user-management"
            },
            {
                "parent_code": 20,
                "code": 22,
                "icon": null,
                "name": "장비관리",
                "type": "screen",
                "url": "/manager/equipment-management"
            },
            {
                "parent_code": 20,
                "code": 23,
                "icon": null,
                "name": "점포그룹",
                "type": "screen",
                "url": "/manager/store-group"
            },
            {
                "parent_code": 20,
                "code": 24,
                "icon": null,
                "name": "장비통계",
                "type": "screen",
                "url": "/manager/equipment-stats"
            },
            {
                "parent_code": 20,
                "code": 25,
                "icon": null,
                "name": "광고통계",
                "type": "screen",
                "url": "/manager/ad-stats"
            },
            {
                "parent_code": 20,
                "code": 26,
                "icon": null,
                "name": "광고업체등록",
                "type": "screen",
                "url": "/manager/ad-company-resiter"
            },
            {
                "parent_code": 20,
                "code": 27,
                "icon": null,
                "name": "광고승인",
                "type": "screen",
                "url": "/manager/ad-approval"
            },
        ],
        "dashboard_url": "/"
    }
    const handleLogin = () => {
        login(userData); // Zustand store에 userData 저장
        console.log("로그인 완료:", userData);
    };
    const handleLogout = () => {
        logout(); // Zustand store에 userData 저장
        console.log("로그아웃 완료:");
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-white shadow-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Vocie PoP</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">User ID</span>
                    </label>
                    <input
                        type="text"
                        placeholder="아이디를 입력해주세요."
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text font-semibold">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        className="input input-bordered w-full"
                    />
                    <p className="mt-2 text-error text-sm">비밀번호가 일치하지 않습니다.</p>
                </div>
                <div className="form-control mt-6">
                    <button
                        className="btn btn-primary w-full"
                        onClick={() => {
                            handleLogin();
                            navigate('/');
                        }}
                    >
                        로그인
                    </button>
                </div>
                <div className="flex align-center justify-between mt-4 text-sm">
                    <a href="/signup" className="text-gray-500">사용자 등록 신청</a>
                    <a href="#" className="text-gray-500">Password 분실</a>
                </div>
            </div>
        </div>
    )
}

export default Login