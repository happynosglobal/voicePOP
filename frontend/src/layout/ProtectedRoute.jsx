import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../stores/user";

const ProtectedRoute = ({ children }) => {
    const { user } = useUserStore();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" />;
    }

    // 유저가 접근 가능한 메뉴 URL 목록을 가져오기
    const allowedPaths = user.menu.map(menuItem => menuItem.url);

    // 현재 pathname이 허용되지 않았다면 "/"로 이동
    if (!allowedPaths.includes(location.pathname)) {
        return <Navigate to={user.dashboard_url} />;
    }

    return children;
};

export default ProtectedRoute;